import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateCharacterService } from "@/services/create-character";

describe("Create Character Service", () => {
	type GenericSheet = { força: number; vida: number };
	type GenericInventory = { item: string[] };

	let characterRepository: CharacterImMemoryRepository<GenericSheet, GenericInventory>;
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

		const { character } = await service.execute({
			characterData: {
				userId: "user-01",
				name: "Elara Stormwind",
				age: 27,
				rpgSystem: "Dungeon And Dragons",
				description: "A half-elf ranger who roams the forests of the North.",
				avatar: null,
			},
			sheet: {
				força: 15,
				vida: 100,
			},
			inventory: {
				item: ["Espada Longa", "Arco e Flecha"],
			},
		});

		expect(character.id).toEqual(expect.any(String));
	});

	it("Não deve ser possivel criar uma personagem para um usuario que não existe ", async () => {
		await expect(
			service.execute({
				characterData: {
					userId: "not-exist-user",
					name: "Elara Stormwind",
					age: 27,
					rpgSystem: "Tormenta",
					description: "A half-elf ranger who roams the forests of the North.",
					avatar: null,
				},
				sheet: {
					força: 15,
					vida: 100,
				},
				inventory: {
					item: ["Espada Longa", "Arco e Flecha"],
				},
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
