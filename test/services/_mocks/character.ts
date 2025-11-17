import { faker } from "@faker-js/faker";
import type { CharacterCreateInput } from "@/@types/character";
import { RpgSystemEnum } from "@/@types/rpg-system";

export function createCharacterMock({ userId }: { userId: string }) {
	const characterDataMocks: CharacterCreateInput = {
		userId,
		sheetId: null,
		name: faker.person.firstName(),
		rpgSystem: faker.helpers.arrayElement(RpgSystemEnum.options),
		age: faker.number.int({ max: 60, min: 10 }),
		description: faker.person.bio(),
		avatar: faker.image.avatar(),
	};

	return {
		characterDataMocks,
	};
}
