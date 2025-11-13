import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "@/@types/ordem-paranormal-sheet";
import type { User } from "@/@types/user";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateSheetOrdemParanormalService } from "@/services/ordem-paranormal/create-sheet-ordem-paranormal";
import { FetchSheetsOrdemParanormalByUserIdService } from "@/services/ordem-paranormal/fetch-sheets-ordem-paranormal-by-user-id.ts";
import { createSheetOrdemParanormalMock } from "../_mocks/ordem-paranormal";

describe("Fetch Sheets Ordem Paranormal by User - Service", () => {
	let characterRepository: CharacterImMemoryRepository<
		OrdemParanormalSheet,
		OrdemParanormalInventory
	>;
	let userRepository: UserImMemoryRepository;
	let sut: FetchSheetsOrdemParanormalByUserIdService;
	let createSheetOrdemParanormalService: CreateSheetOrdemParanormalService;

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
		characterRepository = new CharacterImMemoryRepository<
			OrdemParanormalSheet,
			OrdemParanormalInventory
		>();
		createSheetOrdemParanormalService = new CreateSheetOrdemParanormalService(
			characterRepository,
			userRepository,
		);
		sut = new FetchSheetsOrdemParanormalByUserIdService(
			characterRepository,
			userRepository,
		);
	});

	it("should be possible to list all of the user's characters.", async () => {
		for (let i = 0; i < 4; i++) {
			const { characterDataMocks, sheetMocks, inventoryMocks } =
				createSheetOrdemParanormalMock({ characterClass: "Combatente", userId: user.id });

			await createSheetOrdemParanormalService.execute({
				characterData: characterDataMocks,
				sheet: sheetMocks,
				inventory: inventoryMocks,
			});
		}

		const { characters } = await sut.execute({ userId: user.id });

		expect(characters).toHaveLength(4);
	});

	it("It should not be possible to list all user characters that do not exist.", async () => {
		await expect(() => sut.execute({ userId: "non-exist-user" })).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
