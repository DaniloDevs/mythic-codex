import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { GetCharacterService } from "@/services/get-character-by-id";

describe("Get Character by Id Service", () => {
	type GenericSheet = { força: number; vida: number };
	type GenericInventory = { item: string[] };

	let characterRepository: CharacterImMemoryRepository<GenericSheet, GenericInventory>;
	let userRepository: UserImMemoryRepository;
	let service: GetCharacterService<GenericSheet, GenericInventory>;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			GenericSheet,
			GenericInventory
		>();
		userRepository = new UserImMemoryRepository();
		service = new GetCharacterService<GenericSheet, GenericInventory>(
			characterRepository,
		);
	});

	it("should be possible to search for a character by its ID.", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});

		const findCharacter = await characterRepository.create(
			{
				userId: "user-01",
				name: "Elara Stormwind",
				age: 27,
				rpgSystem: "Dungeon And Dragons",
				description: "A half-elf ranger who roams the forests of the North.",
				avatar: null,
			},
			{
				força: 15,
				vida: 100,
			},
			{
				item: ["Espada Longa", "Arco e Flecha"],
			},
		);

		const { character } = await service.execute({ id: findCharacter.id });

		expect(character.id).toEqual(expect.any(String));
		expect(character.name).toBe(findCharacter.name);
	});

	it("should not be possible to search for a character using an ID that does not exist.", async () => {
		await expect(service.execute({ id: "character-1" })).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
