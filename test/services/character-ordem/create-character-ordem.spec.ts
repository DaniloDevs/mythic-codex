import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { InventoryOrdemParanormal } from "@/@types/inventory-ordem-paranormal";
import type { User } from "@/@types/user";
import type { ICharacterRepository } from "@/repository/character-repository";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { InventoryImMemoryRepository } from "@/repository/in-memory/inventory-ordem";
import { SheetOrdemParanormalImMemoryRepository } from "@/repository/in-memory/sheet-ordem";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import type { IInventoryRepository } from "@/repository/inventory-ordem-repository";
import type { ISheetOrdemParanormalRepository } from "@/repository/sheet-ordem-repository";
import type { IUserRepository } from "@/repository/user-repository";
import { CreateCharacterOrdemService } from "@/services/character-ordem/create-character-ordem";
import { createCharacterMock } from "../_mocks/character";
import { createInventoryMock } from "../_mocks/inventory-ordem";
import { createSheetOrdemParanormalMock } from "../_mocks/sheet-ordem-paranormal";

describe("Create Character Ordem Paranormal - Service", () => {
	let userRepository: IUserRepository;
	let characterRepository: ICharacterRepository;
	let inventoryRepository: IInventoryRepository<InventoryOrdemParanormal>;
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
		inventoryRepository = new InventoryImMemoryRepository<InventoryOrdemParanormal>();
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

		const { character, inventory, sheet } = await sut.execute({
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
});
