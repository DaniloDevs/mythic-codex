import { beforeEach, describe, expect, it } from "vitest";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateOrdemParanormalSheet } from "@/services/create-orderm-paranormal-sheet";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
	OrdemParanormalSheetCreateInput,
} from "@/services/types/ordem-paranormal";
import {
	characterDataMocks,
	inventoryMocks,
	sheetMocks,
} from "./mocks/create-ordem-paranormal-sheet";

describe("Create Ordem Paranormal Sheet Service", () => {
	let characterRepository: CharacterImMemoryRepository<
		OrdemParanormalSheet,
		OrdemParanormalInventory
	>;
	let userRepository: UserImMemoryRepository;
	let service: CreateOrdemParanormalSheet;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			OrdemParanormalSheet,
			OrdemParanormalInventory
		>();

		userRepository = new UserImMemoryRepository();
		service = new CreateOrdemParanormalSheet(characterRepository, userRepository);
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

	it("deve ser possivel o calculo automatico do total de PV, PE e sanidade", async () => {
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

		expect(character.sheet.conditions.lifePoints.total).toBe(40);
		expect(character.sheet.conditions.sanity.total).toBe(21);
		expect(character.sheet.conditions.endeavorPoints.total).toBe(16);
	});
});
