import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateCharacterService } from "@/services/character/create-character";
import { createCharacterMock } from "../_mocks/character";

describe("Create Character - Service", () => {
	let characterRepository: CharacterImMemoryRepository;
	let userRepository: UserImMemoryRepository;
	let sut: CreateCharacterService;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository();
		userRepository = new UserImMemoryRepository();
		sut = new CreateCharacterService(characterRepository, userRepository);
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

		const { character } = await sut.execute({
			characterData: characterDataMocks,
		});

		expect(character.id).toEqual(expect.any(String));
	});

	it("should not be possible to create a character for a user that does not exist.", async () => {
		const { characterDataMocks } = createCharacterMock({
			userId: "not-exist-user",
		});

		await expect(() =>
			sut.execute({
				characterData: characterDataMocks,
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
