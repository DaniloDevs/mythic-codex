import { beforeEach, describe, expect, it } from "vitest";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateOrdemParanormalSheetService } from "@/services/create-sheet-orderm-paranormal";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "@/services/types/ordem-paranormal-sheet";
import { createSheetOrdemParanormalMock } from "./mocks/create-ordem-paranormal-sheet";

describe("Create Sheet Ordem Paranormal Service", () => {
	let characterRepository: CharacterImMemoryRepository<
		OrdemParanormalSheet,
		OrdemParanormalInventory
	>;
	let userRepository: UserImMemoryRepository;
	let service: CreateOrdemParanormalSheetService;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			OrdemParanormalSheet,
			OrdemParanormalInventory
		>();

		userRepository = new UserImMemoryRepository();
		service = new CreateOrdemParanormalSheetService(characterRepository, userRepository);
	});

	it("should be possible to create a paranormal order character sheet.", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Combatente" });

		const { character } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		expect(character.id).toEqual(expect.any(String));
	});

	it("should be possible to automatically calculate HP, PE, and sanity based on the Combatant class.", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Combatente" });

		const { character } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		expect(character.sheet.conditions.lifePoints.total).toBe(40);
		expect(character.sheet.conditions.endeavorPoints.total).toBe(16);
		expect(character.sheet.conditions.sanity.total).toBe(21);
	});
	it("should be possible to automatically calculate PV, PE, and health based on the specialist class.", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Especialista" });

		const { character } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		expect(character.sheet.conditions.lifePoints.total).toBe(33);
		expect(character.sheet.conditions.endeavorPoints.total).toBe(20);
		expect(character.sheet.conditions.sanity.total).toBe(28);
	});
	it("should be possible to automatically calculate HP, PE, and sanity based on the occultist class.", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Ocultista" });

		const { character } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		expect(character.sheet.conditions.lifePoints.total).toBe(26);
		expect(character.sheet.conditions.endeavorPoints.total).toBe(24);
		expect(character.sheet.conditions.sanity.total).toBe(35);
	});

	it("should be possible to automatically calculate the bonus for each skill based on its level.", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Ocultista" });

		const { character } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		expect(character.sheet.expertises.acrobatics.bonus).toBe(0);
		expect(character.sheet.expertises.animalHandling.bonus).toBe(5);
		expect(character.sheet.expertises.arts.bonus).toBe(10);
		expect(character.sheet.expertises.athletics.bonus).toBe(15);
	});
});
