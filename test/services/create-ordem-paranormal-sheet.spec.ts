import { beforeEach, describe, expect, it } from "vitest";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateCharacterService } from "@/services/create-character";
import type { OrdemParanormalInventory, OrdemParanormalSheet } from "@/services/types/ordem-paranormal";
import { characterDataMocks, inventoryMocks, sheetMocks } from "./mocks/create-ordem-paranormal";

describe("Create Ordem Paranormal Sheet Service", () => {
	let characterRepository: CharacterImMemoryRepository<OrdemParanormalSheet, OrdemParanormalInventory>;
	let userRepository: UserImMemoryRepository;
	let service: CreateCharacterService<OrdemParanormalSheet, OrdemParanormalInventory>;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<OrdemParanormalSheet, OrdemParanormalInventory>();
		userRepository = new UserImMemoryRepository();
		service = new CreateCharacterService<OrdemParanormalSheet, OrdemParanormalInventory>(
			characterRepository,
			userRepository,
		);
	});

	it("deve ser possivel criar uma ficha de ordem paranormal", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { character } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		expect(character.id).toEqual(expect.any(String));
	});
});
