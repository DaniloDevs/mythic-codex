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

const ExpertiseEnum = z.enum(
	Object.keys(expertisesAttributes) as [keyof typeof expertisesAttributes],
);

const levelExpertiseBonus = {
	Untrained: 0,
	Trained: 5,
	Veteran: 10,
	Expert: 15,
} as const;

type ExpertiseKey = keyof typeof expertisesAttributes;

const ExpertiseRanksEnum = z.enum(["Untrained", "Trained", "Veteran", "Expert"]);

const createInputExpertiseSchema = z.object({
	rank: ExpertiseRanksEnum,
	trained: z.boolean(),
	secondBonus: z.number().min(0),
});

const expertiseSchema = z.object({
	rank: ExpertiseRanksEnum,
	attributes: AttributesEnum,
	rankBonus: z.number().min(0),
	trained: z.boolean(),
	secondBonus: z.number().min(0),
});

const expertiseMapSchema = z.record(ExpertiseEnum, expertiseSchema);
const createInputExpertiseMapSchema = z.record(ExpertiseEnum, createInputExpertiseSchema);

type CreateInputExpertise = z.infer<typeof createInputExpertiseSchema>;
type CreateInputMapExpertise = z.infer<typeof createInputExpertiseMapSchema>;
type ExpertiseValue = z.infer<typeof expertiseSchema>;
type Expertise = z.infer<typeof expertiseMapSchema>;

export {
	ExpertiseEnum,
	expertiseMapSchema,
	type CreateInputMapExpertise,
	createInputExpertiseMapSchema,
	levelExpertiseBonus,
	type ExpertiseKey,
	type CreateInputExpertise,
	type ExpertiseValue,
	type Expertise,
};
