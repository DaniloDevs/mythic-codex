import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import type { InventoryOrdemParanormal } from "@/@types/sheet-ordem-paranormal";
import type { User } from "@/@types/user";
import type { ICharacterRepository } from "@/repository/character-repository";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { InventoryImMemoryRepository } from "@/repository/in-memory/inventory-in-memory";
import { SheetOrdemParanormalImMemoryRepository } from "@/repository/in-memory/sheet-ordem-paranormal-im-memory-repository";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import type { IInventoryRepository } from "@/repository/inventory-repository";
import type { ISheetOrdemParanormalRepository } from "@/repository/sheet-ordem-paranormal-repository";
import type { IUserRepository } from "@/repository/user-repository";
import { CreateSheetOrdemParanormalService } from "@/services/sheet-ordem-paranormal/create-sheet-ordem-paranormal";
import { createSheetOrdemParanormalMock } from "../_mocks/ordem-paranormal";

describe("Create Sheet Ordem Paranormal - Service", () => {
	let userRepository: IUserRepository;
	let characterRepository: ICharacterRepository;
	let ordemRespository: ISheetOrdemParanormalRepository;
	let inventoryRespository: IInventoryRepository<InventoryOrdemParanormal>;

	let sut: CreateSheetOrdemParanormalService;
	let user: User;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository();
		ordemRespository = new SheetOrdemParanormalImMemoryRepository();
		inventoryRespository = new InventoryImMemoryRepository();
		sut = new CreateSheetOrdemParanormalService(
			characterRepository,
			ordemRespository,
			inventoryRespository,
		);
	});

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

	it("Deve ser possivel criar um ficha de ordem paranormal", async () => {
		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({
				trail: "Combatente",
				sheetId: "",
				userId: user.id,
			});

		const { character, inventory, sheet } = await sut.execute({
			characterData: characterDataMocks,
			inventory: inventoryMocks,
			sheet: sheetMocks,
		});

		expect(character.id).toEqual(expect.any(String));
		expect(inventory.id).toEqual(expect.any(String));
		expect(sheet.id).toEqual(expect.any(String));
	});
});
