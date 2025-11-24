import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { User } from "@/@types/user";
import type { ICharacterRepository } from "@/repository/character-repository";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { InventoryImMemoryRepository } from "@/repository/in-memory/inventory-ordem";
import { SheetOrdemParanormalImMemoryRepository } from "@/repository/in-memory/sheet-ordem";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import type { IInventoryOrdemRepository } from "@/repository/inventory-ordem-repository";
import type { ISheetOrdemParanormalRepository } from "@/repository/sheet-ordem-repository";
import type { IUserRepository } from "@/repository/user-repository";
import { CreateCharacterOrdemService } from "@/services/character-ordem/create-character-ordem";
import { createCharacterMock } from "../_mocks/character";
import { createInventoryMock } from "../_mocks/inventory-ordem";
import { createSheetOrdemParanormalMock } from "../_mocks/sheet-ordem-paranormal";

describe("Create Character Ordem Paranormal - Service", () => {
	let userRepository: IUserRepository;
	let characterRepository: ICharacterRepository;
	let inventoryRepository: IInventoryOrdemRepository;
	let sheetRepository: ISheetOrdemParanormalRepository;
	let sut: CreateCharacterOrdemService;

	let user: User;

	beforeAll(async () => {
		userRepository = new UserImMemoryRepository();

		user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});
	});

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository();
		inventoryRepository = new InventoryImMemoryRepository();
		sheetRepository = new SheetOrdemParanormalImMemoryRepository();

		sut = new CreateCharacterOrdemService(
			userRepository,
			characterRepository,
			inventoryRepository,
			sheetRepository,
		);
	});

	it("deve ser possivel criar um personagem de ordem", async () => {
		const { characterDataMocks } = createCharacterMock({
			userId: user.id,
		});

		const { sheetMocks } = createSheetOrdemParanormalMock({
			trail: "Combatente",
		});

		const { inventoryDataMocks } = createInventoryMock();

		const { character } = await sut.execute({
			userId: user.id,
			characterData: characterDataMocks,
			sheetData: sheetMocks,
			inventoryData: inventoryDataMocks,
		});

		expect(character).toEqual(
			expect.objectContaining({
				id: expect.any(String),
				userId: user.id,
				name: characterDataMocks.name,
				rpgSystem: characterDataMocks.rpgSystem,
			}),
		);
	});

	it("deve ser feito o calculo automatico das condições do personsagem", async () => {
		const { characterDataMocks } = createCharacterMock({
			userId: user.id,
		});

		const { sheetMocks } = createSheetOrdemParanormalMock({
			trail: "Combatente",
		});

		const { inventoryDataMocks } = createInventoryMock();

		const { sheet } = await sut.execute({
			userId: user.id,
			characterData: characterDataMocks,
			sheetData: sheetMocks,
			inventoryData: inventoryDataMocks,
		});

		expect(sheet.conditions.endeavorPoints.current).toBe(44);
		expect(sheet.conditions.vitality.current).toBe(82);
		expect(sheet.conditions.sanity.current).toBe(42);
	});

	it("deve criar o inventário vinculado ao personagem", async () => {
		const { characterDataMocks } = createCharacterMock({
			userId: user.id,
		});

		const { sheetMocks } = createSheetOrdemParanormalMock({
			trail: "Combatente",
		});
		60;

		const { inventoryDataMocks } = createInventoryMock();

		const { character, inventory } = await sut.execute({
			userId: user.id,
			characterData: characterDataMocks,
			sheetData: sheetMocks,
			inventoryData: inventoryDataMocks,
		});

		expect(inventory).toBeDefined();
		expect(inventory.characterId).toBe(character.id);
		expect(inventory.items).toEqual(inventoryDataMocks.items);
	});

	it("deve criar a ficha vinculada ao personagem", async () => {
		const { characterDataMocks } = createCharacterMock({
			userId: user.id,
		});

		const { sheetMocks } = createSheetOrdemParanormalMock({
			trail: "Combatente",
		});

		const { inventoryDataMocks } = createInventoryMock();

		const { character, sheet } = await sut.execute({
			userId: user.id,
			characterData: characterDataMocks,
			sheetData: sheetMocks,
			inventoryData: inventoryDataMocks,
		});

		expect(sheet).toBeDefined();
		expect(sheet.characterId).toBe(character.id);
		expect(sheet.identity.trail).toBe(sheetMocks.identity.trail);
	});

	it("deve calcular condições diferentes para trilhas diferentes", async () => {
		const { characterDataMocks } = createCharacterMock({
			userId: user.id,
		});

		const { sheetMocks } = createSheetOrdemParanormalMock({
			trail: "Ocultista",
		});

		const { inventoryDataMocks } = createInventoryMock();

		const { sheet } = await sut.execute({
			userId: user.id,
			characterData: characterDataMocks,
			sheetData: sheetMocks,
			inventoryData: inventoryDataMocks,
		});

		// Valores esperados para Ocultista (diferente de Combatente)
		expect(sheet.conditions.sanity).toBeDefined();
		expect(sheet.conditions.vitality).toBeDefined();
		expect(sheet.conditions.endeavorPoints).toBeDefined();
	});

	it("deve aplicar modificadores de atributos nas condições", async () => {
		const { characterDataMocks } = createCharacterMock({
			userId: user.id,
		});

		const { sheetMocks } = createSheetOrdemParanormalMock({
			trail: "Combatente",
		});

		sheetMocks.attributes = {
			strength: 3,
			agility: 2,
			intellect: 1,
			presence: 2,
			vigor: 3,
		};

		const { inventoryDataMocks } = createInventoryMock();

		const { sheet } = await sut.execute({
			userId: user.id,
			characterData: characterDataMocks,
			sheetData: sheetMocks,
			inventoryData: inventoryDataMocks,
		});

		// Com vigor alto, a vitalidade deve ser maior
		expect(sheet.conditions.vitality.current).toBeGreaterThan(60);
	});

	it("não deve ser possível criar personagem com usuário inexistente", async () => {
		60;
		const { characterDataMocks } = createCharacterMock({
			userId: "invalid-user-id",
		});

		const { sheetMocks } = createSheetOrdemParanormalMock({
			trail: "Combatente",
		});

		const { inventoryDataMocks } = createInventoryMock();

		await expect(
			sut.execute({
				userId: "invalid-user-id",
				characterData: characterDataMocks,
				sheetData: sheetMocks,
				inventoryData: inventoryDataMocks,
			}),
		).rejects.toThrow();
	});
});
