import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "@/services/@types/ordem-paranormal-sheet";
import { CreateSheetOrdemParanormalService } from "@/services/ordem-paranormal/create-sheet-orderm-paranormal";
import { GetSheetOrdemParanormalByIdService } from "@/services/ordem-paranormal/get-sheet-ordem-paranormal-by-id";
import { createSheetOrdemParanormalMock } from "../_mocks/create-ordem-paranormal-sheet";

describe("Create Ordem Paranormal Sheet Service", () => {
	let characterRepository: CharacterImMemoryRepository<
		OrdemParanormalSheet,
		OrdemParanormalInventory
	>;
	let userRepository: UserImMemoryRepository;
	let service: CreateSheetOrdemParanormalService;
	let sut: GetSheetOrdemParanormalByIdService;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			OrdemParanormalSheet,
			OrdemParanormalInventory
		>();

		userRepository = new UserImMemoryRepository();
		service = new CreateSheetOrdemParanormalService(characterRepository, userRepository);
		sut = new GetSheetOrdemParanormalByIdService(characterRepository);
	});

	it("should be possible to search for a paranormal order file.", async () => {
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

	it("should not be possible to search for a paranormal order record.", async () => {
		await expect(sut.execute({ id: "not-exist-character" })).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
