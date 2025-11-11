import { beforeEach, describe, expect, it } from "vitest";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "@/@types/ordem-paranormal-sheet";
import { InvalidOperationsError } from "@/_errors/invalid-operations";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateSheetOrdemParanormalService } from "@/services/ordem-paranormal/create-sheet-orderm-paranormal";
import { UpdateSheetOrdemParanormalByIdService } from "@/services/ordem-paranormal/update-sheet-ordem-paranormal-by-id";
import { createSheetOrdemParanormalMock } from "../_mocks/ordem-paranormal";

describe("Update Sheet Ordem Paranormal By Id Service", () => {
	let characterRepository: CharacterImMemoryRepository<
		OrdemParanormalSheet,
		OrdemParanormalInventory
	>;
	let userRepository: UserImMemoryRepository;
	let service: CreateSheetOrdemParanormalService;
	let sut: UpdateSheetOrdemParanormalByIdService;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			OrdemParanormalSheet,
			OrdemParanormalInventory
		>();

		userRepository = new UserImMemoryRepository();
		service = new CreateSheetOrdemParanormalService(characterRepository, userRepository);
		sut = new UpdateSheetOrdemParanormalByIdService(characterRepository);
	});

	it("should be possible to update a paranormal order profile.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Combatente", userId: user.id });

		const { character: oldCharacter } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		const { character } = await sut.execute({
			characterId: oldCharacter.id,
			updateData: { age: 30 },
		});

		expect(character.age).toBe(30);
	});

	it("It shouldn't be possible to change the character's origin or class.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Combatente", userId: user.id });

		const { character: oldCharacter } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		await expect(
			sut.execute({
				characterId: oldCharacter.id,
				updateData: {
					sheet: {
						identity: {
							class: "Ocultista",
							origin: "Bandido",
						},
					},
				},
			}),
		).rejects.toBeInstanceOf(InvalidOperationsError);
	});
	it("It shouldn't be possible to update a paranormal request form without any data to update it.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Combatente", userId: user.id });

		const { character: oldCharacter } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		await expect(
			sut.execute({
				characterId: oldCharacter.id,
				updateData: {},
			}),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it("should not be possible to update a paranormal order sheet for a character that does not exist.", async () => {
		await expect(
			sut.execute({ characterId: "not-exist-character", updateData: { age: 30 } }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
