import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { UpdateCharacterByIdService } from "@/services/character/update-character-by-id";

describe("Update Character by Id Service", () => {
	type GenericSheet = { força: number; vida: number };
	type GenericInventory = { item: string[] };

	let characterRepository: CharacterImMemoryRepository<GenericSheet, GenericInventory>;
	let userRepository: UserImMemoryRepository;
	let service: UpdateCharacterByIdService<GenericSheet, GenericInventory>;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			GenericSheet,
			GenericInventory
		>();
		userRepository = new UserImMemoryRepository();
		service = new UpdateCharacterByIdService<GenericSheet, GenericInventory>(
			characterRepository,
		);
	});

	it("should be possible to update a character's sheet.", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});

		const createdCharacter = await characterRepository.create(
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

		const newSheet: GenericSheet = { força: 20, vida: 150 };
		await service.execute({
			characterId: createdCharacter.id,
			updateData: { sheet: newSheet },
		});

		const updatedCharacter = await characterRepository.getById(createdCharacter.id);

		expect(updatedCharacter).not.toBeNull();
		expect(updatedCharacter?.sheet.força).toBe(20);
	});

	it("It should not be possible to modify a character without providing data.", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});

		const createdCharacter = await characterRepository.create(
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

		await expect(
			service.execute({ characterId: createdCharacter.id, updateData: {} }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be possible to update a character using an ID that does not exist.", async () => {
		await expect(
			service.execute({ characterId: "character-1", updateData: { age: 1 } }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
