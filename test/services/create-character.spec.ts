import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { z } from "zod";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateCharacterService } from "@/services/create-character";

const GenericSheetSchema = z.object({
	força: z.number().min(0),
	vida: z.number().min(0),
});

const GenericInventorySchema = z.object({
	item: z.array(z.string()),
});

type GenericSheet = z.infer<typeof GenericSheetSchema>;
type GenericInventory = z.infer<typeof GenericInventorySchema>;

describe("Create Character Service", () => {
	let characterRepository: CharacterImMemoryRepository<
		GenericSheet,
		GenericInventory
	>;
	let userRepository: UserImMemoryRepository;
	let service: CreateCharacterService<GenericSheet, GenericInventory>;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			GenericSheet,
			GenericInventory
		>();
		userRepository = new UserImMemoryRepository();
		service = new CreateCharacterService<GenericSheet, GenericInventory>(
			characterRepository,
			userRepository,
		);
	});

	it("Deve ser possivel criar uma personagem com dados validos", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: await hash("123456", 6),
		});

		const sheet: GenericSheet = {
			força: 15,
			vida: 100,
		};

		const inventory: GenericInventory = {
			item: ["Espada Longa", "Poção de Cura"],
		};

		const { character } = await service.execute(
			{
				userId: "user-01",
				name: "Elara Stormwind",
				age: 27,
				rpgSystem: "Dungeon And Dragons",
				description: "A half-elf ranger who roams the forests of the North.",
				avatar: null,
			},
			sheet,
			inventory,
		);

		expect(character.id).toEqual(expect.any(String));
	});

	it("Não deve ser possivel criar uma personagem para um usuario que não existe ", async () => {
		const sheet: GenericSheet = {
			força: 15,
			vida: 100,
		};

		const inventory: GenericInventory = {
			item: ["Espada Longa", "Poção de Cura"],
		};

		await expect(
			service.execute(
				{
					userId: "u12345",
					name: "Elara Stormwind",
					age: 27,
					rpgSystem: "Dungeon And Dragons",
					description: "A half-elf ranger who roams the forests of the North.",
					avatar: null,
				},
				sheet,
				inventory,
			),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
