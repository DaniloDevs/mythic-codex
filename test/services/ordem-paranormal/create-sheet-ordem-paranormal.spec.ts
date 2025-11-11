import { beforeEach, describe, expect, it } from "vitest";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "@/@types/ordem-paranormal-sheet";
import { CharacterImMemoryRepository } from "@/repository/in-memory/character-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { CreateSheetOrdemParanormalService } from "@/services/ordem-paranormal/create-sheet-orderm-paranormal";
import { createSheetOrdemParanormalMock } from "../_mocks/ordem-paranormal";
import { CalculateConditionsClass } from "@/utils/calc-conditions-class-ordem-paranormal";

describe("Create Sheet Ordem Paranormal Service", () => {
	let characterRepository: CharacterImMemoryRepository<
		OrdemParanormalSheet,
		OrdemParanormalInventory
	>;
	let userRepository: UserImMemoryRepository;
	let service: CreateSheetOrdemParanormalService;

	beforeEach(() => {
		characterRepository = new CharacterImMemoryRepository<
			OrdemParanormalSheet,
			OrdemParanormalInventory
		>();

		userRepository = new UserImMemoryRepository();
		service = new CreateSheetOrdemParanormalService(characterRepository, userRepository);
	});

	it("should be possible to create a paranormal order character sheet.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Combatente", userId: user.id });

		const { character } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		expect(character.id).toEqual(expect.any(String));
	});

	it("should be possible to automatically calculate HP, PE, and sanity based on the Combatant class.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Combatente", userId: user.id });

		const { character } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});

		const { endeavorPoints, lifePoints, sanity } = CalculateConditionsClass({
			characterClass: "Combatente", next: character.sheet.status.next,
			presence: character.sheet.attributes.presence,
			vigor: character.sheet.attributes.vigor,
		})

		expect(character.sheet.status.lifePoints.total).toBe(lifePoints);
		expect(character.sheet.status.endeavorPoints.total).toBe(endeavorPoints);
		expect(character.sheet.status.sanity.total).toBe(sanity);
	});
	it("should be possible to automatically calculate PV, PE, and health based on the specialist class.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Especialista", userId: user.id });

		const { character } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});
		const { endeavorPoints, lifePoints, sanity } = CalculateConditionsClass({
			characterClass: "Especialista", next: character.sheet.status.next,
			presence: character.sheet.attributes.presence,
			vigor: character.sheet.attributes.vigor,
		})

		expect(character.sheet.status.lifePoints.total).toBe(lifePoints);
		expect(character.sheet.status.endeavorPoints.total).toBe(endeavorPoints);
		expect(character.sheet.status.sanity.total).toBe(sanity);
	});
	it("should be possible to automatically calculate HP, PE, and sanity based on the occultist class.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Ocultista", userId: user.id });

		const { character } = await service.execute({
			characterData: characterDataMocks,
			sheet: sheetMocks,
			inventory: inventoryMocks,
		});
		const { endeavorPoints, lifePoints, sanity } = CalculateConditionsClass({
			characterClass: "Ocultista", next: character.sheet.status.next,
			presence: character.sheet.attributes.presence,
			vigor: character.sheet.attributes.vigor,
		})

		expect(character.sheet.status.lifePoints.total).toBe(lifePoints);
		expect(character.sheet.status.endeavorPoints.total).toBe(endeavorPoints);
		expect(character.sheet.status.sanity.total).toBe(sanity);
	});

	it("should be possible to automatically calculate the bonus for each skill based on its level.", async () => {
		const user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		const { characterDataMocks, inventoryMocks, sheetMocks } =
			createSheetOrdemParanormalMock({ characterClass: "Ocultista", userId: user.id });

		// Configura os níveis específicos das expertises para testar o cálculo do bônus
		sheetMocks.expertises.acrobatics.level = "Untrained";
		sheetMocks.expertises.animalHandling.level = "Trained";
		sheetMocks.expertises.arts.level = "Veteran";
		sheetMocks.expertises.athletics.level = "Expert";

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
