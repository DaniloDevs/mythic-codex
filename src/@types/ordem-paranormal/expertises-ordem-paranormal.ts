import z from "zod";
import { AttributesEnum } from "./sheet-ordem-paranormal";

export const expertisesAttributes = {
	acrobatics: "agility",
	animalHandling: "presence",
	arts: "presence",
	athletics: "strength",
	currentAffairs: "intellect",
	science: "intellect",
	crime: "agility",
	diplomacy: "presence",
	deception: "presence",
	fortitude: "vigor",
	stealth: "agility",
	initiative: "agility",
	intimidation: "presence",
	intuition: "presence",
	investigation: "intellect",
	fighting: "strength",
	medicine: "intellect",
	occultism: "intellect",
	perception: "presence",
	piloting: "agility",
	marksmanship: "agility",
	profession: "intellect",
	reflexes: "agility",
	religion: "presence",
	survival: "intellect",
	tactics: "intellect",
	technology: "intellect",
	will: "presence",
} as const;

export const expertiseRanks = {
	Untrained: 0,
	Trained: 5,
	Veteran: 10,
	Expert: 15,
} as const;

export const ExpertiseRankEnum = z.enum(
	Object.keys(expertiseRanks) as Array<keyof typeof expertiseRanks>,
);

export const expertiseKeys = [...Object.keys(expertisesAttributes)] as unknown as [
	keyof typeof expertisesAttributes,
	...(typeof expertisesAttributes)[],
];

const CreateInputExpertiseSchema = z.object({
	rank: ExpertiseRankEnum,
	trained: z.boolean(),
	secondBonus: z.number().min(0),
});

const ExpertiseSchema = z.object({
	rank: ExpertiseRankEnum,
	trained: z.boolean(),
	secondBonus: z.number().min(0),
	attribute: AttributesEnum,
	rankBonus: z.number().min(0),
});

export type ExpertiseInput = z.infer<typeof CreateInputExpertiseSchema>;
export type ExpertiseValue = z.infer<typeof ExpertiseSchema>;
export type ExpertiseKeys = z.infer<typeof expertiseKeys>;

export const ExpertiseMapSchema = z.object(
	Object.fromEntries(
		Object.keys(expertisesAttributes).map((k) => [k, ExpertiseSchema]),
	) as Record<keyof typeof expertisesAttributes, typeof ExpertiseSchema>,
);
