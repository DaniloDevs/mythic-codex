import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { UpdateCharacterByIdService } from "@/services/character/update-character-by-id";
import { createSlug } from "@/utils/create-slug";

describe("Update character by Id Service", () => {
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

	it("It should be possible to modify parts of a character.", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});

		const oldCharacter = await characterRepository.create(
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

		const { character } = await service.execute({
			characterId: oldCharacter.id,
			updateData: {
				sheet: {
					força: 18,
					vida: 120,
				},
			},
		});

		expect(character.sheet.força).toBe(18);
	});
	it("It should be possible to create a new slug by modifying the name.", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});

		const oldCharacter = await characterRepository.create(
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

		const { character } = await service.execute({
			characterId: oldCharacter.id,
			updateData: {
				name: "Dantes Codex",
			},
		});

		expect(character.slug).toBe(createSlug("Dantes Codex"));
	});

	it("It shouldn't be possible to update a character that doesn't exist.", async () => {
		await expect(
			service.execute({ characterId: "character-1", updateData: { age: 26 } }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
