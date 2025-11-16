import { RpgSystemEnum } from "@/@types/rpg-system";
import { faker } from "@faker-js/faker";

export type GenericSheet = { força: number; vida: number };
export type GenericInventory = { item: string[] };

export function createCharacterMock({ userId }: { userId: string }) {
	const characterDataMocks = {
		userId,
		name: faker.person.firstName(),
		rpgSystem: faker.helpers.arrayElement(RpgSystemEnum.options),
		age: faker.number.int({ max: 60, min: 10 }),
		description: faker.person.bio(),
		avatar: faker.image.avatar(),
	};
	const sheetMocks = {
		força: 15,
		vida: 100,
	};
	const inventoryMocks = {
		item: ["Espada Longa", "Arco e Flecha"],
	};

	return {
		characterDataMocks,
		inventoryMocks,
		sheetMocks,
	};
}
