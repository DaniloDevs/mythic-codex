import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateOrdemParanormalSheet } from "@/services/create-sheet-orderm-paranormal";
import { GetSheetOrdemParanormalById } from "@/services/get-sheet-ordem-paranormal-by-id";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "@/services/types/ordem-paranormal-sheet";
import { createSheetOrdemParanormalMock } from "./mocks/create-ordem-paranormal-sheet";

describe("Create Ordem Paranormal Sheet Service", () => {
	let characterRepository: CharacterImMemoryRepository<
		OrdemParanormalSheet,
		OrdemParanormalInventory
	>;
	let userRepository: UserImMemoryRepository;
	let service: CreateOrdemParanormalSheet;
	let sut: GetSheetOrdemParanormalById;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			OrdemParanormalSheet,
			OrdemParanormalInventory
		>();

		userRepository = new UserImMemoryRepository();
		service = new CreateOrdemParanormalSheet(characterRepository, userRepository);
		sut = new GetSheetOrdemParanormalById(characterRepository);
	});

	it("deve ser possivel buscar uma ficha de ordem paranormal", async () => {
		await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Combatente" });

		const { character: newCharacter } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		const { character } = await sut.execute({ id: newCharacter.id });

		expect(character.id).toEqual(newCharacter.id);
	});

	it("não deve ser possivel buscar uma ficha de ordem paranormal", async () => {
		await expect(sut.execute({ id: "not-exist-character" })).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
