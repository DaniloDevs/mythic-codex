import { faker } from "@faker-js/faker";
import { type CharacterCreateInput, RpgSystemEnum } from "@/@types/character";
import {
	type Class,
	type OrdemParanormalInventory,
	type OrdemParanormalSheetCreateInput,
	PatentEnum,
} from "@/@types/ordem-paranormal-sheet";
import {
	EXPERTISE_ATTRIBUTES,
	RitualCircleEnum,
	RitualTypeEnum,
	SkillLevelEnum,
} from "./../../../src/@types/ordem-paranormal-sheet";

export function createSheetOrdemParanormalMock({
	userId,
	characterClass,
}: {
	userId: string;
	characterClass: Class;
}) {
	const characterDataMocks: CharacterCreateInput = {
		userId,
		name: faker.person.firstName(),
		rpgSystem: "Ordem Paranormal",
		age: faker.number.int({ max: 60, min: 10 }),
		description: faker.person.bio(),
		avatar: faker.image.avatar(),
	};

	const sheetMocks: OrdemParanormalSheetCreateInput = {
		attributes: {
			strength: faker.number.int(5),
			agility: faker.number.int(5),
			presence: faker.number.int(5),
			vigor: faker.number.int(5),
			intelligence: faker.number.int(5),
		},
		status: {
			defense: faker.number.int(5),
			next: faker.number.int(5),
			move: faker.date.weekday(),
		},
		identity: {
			class: characterClass,
			origin: faker.location.city(),
			patent: faker.helpers.arrayElement(PatentEnum.options),
		},
		characteristics: {
			protections: faker.book.publisher(),
			resistances: faker.book.publisher(),
			proficiencies: [faker.book.publisher()],
		},
		expertises: generateMockExpertises(),
		skills: [
			{
				name: faker.commerce.productName(),
				description: faker.commerce.productDescription(),
				page: faker.number.int(5),
				cost: faker.number.int(5),
			},
		],
		rituals: [
			{
				name: faker.commerce.productName(),
				description: faker.commerce.productDescription(),
				type: faker.helpers.arrayElement(RitualTypeEnum.options),
				circle: faker.helpers.arrayElement(RitualCircleEnum.options),
				execution: faker.book.publisher(),
				range: faker.book.publisher(),
				target: faker.book.publisher(),
				duration: faker.book.publisher(),
				resistance: faker.book.publisher(),
			},
		],
	};

	const inventoryMocks: OrdemParanormalInventory = {
		limitItems: {
			one: faker.number.int(5),
			two: faker.number.int(5),
			three: faker.number.int(5),
			four: faker.number.int(5),
		},
		creditLimit: faker.number.int(7),
		limitCharge: faker.number.int(10),
		item: [
			{
				name: faker.commerce.productName(),
				category: faker.number.int(3),
				space: faker.person.lastName(),
			},
		],
	};

	return {
		characterDataMocks,
		inventoryMocks,
		sheetMocks,
	};
}

function generateMockExpertises() {
	return Object.keys(EXPERTISE_ATTRIBUTES).reduce((acc, key) => {
		acc[key as keyof typeof EXPERTISE_ATTRIBUTES] = {
			extraBonus: faker.number.int({ min: 0, max: 5 }),
			level: faker.helpers.arrayElement(SkillLevelEnum.options),
		};
		return acc;
	}, {} as any);
}
