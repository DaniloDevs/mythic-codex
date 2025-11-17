import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateCharacterService } from "@/services/character/create-character";
import { createCharacterMock } from "../_mocks/character";
import { GetCharacterByIdService } from "@/services/character/get-character-by-id";

describe("Get Character by Id - Service", () => {
	let characterRepository: CharacterImMemoryRepository;
	let userRepository: UserImMemoryRepository;
	let sut: GetCharacterByIdService;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository();
		userRepository = new UserImMemoryRepository();
		sut = new GetCharacterByIdService(characterRepository);
	});

	it("should be possible to create a character with valid data.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks } = createCharacterMock({
			userId: user.id,
		});

      const newCharacter = await characterRepository.create(characterDataMocks)

		const { character } = await sut.execute({
			id: newCharacter.id,
		});

		expect(character.id).toEqual(expect.any(String));
	});

	it("should not be possible to create a character for a user that does not exist.", async () => {
		const { characterDataMocks } = createCharacterMock({
			userId: "not-exist-user",
		});

		await expect(() =>
			sut.execute({
				id: characterDataMocks.userId,
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
