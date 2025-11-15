import z from "zod";
import {
	createExpertises,
	createInputExpertises,
} from "@/utils/create-expertises-ordem-sheet";


const PatentEnum = z.enum([
	"Recruta",
	"Agente especial",
	"Oficial de operacoes",
	"Agente de elite",
]);

const TrailEnum = z.enum(["Combatente", "Especialista", "Ocultista"]);

const elementEnum = z.enum(["Conhecimento", "Energia", "Morte", "Sangue", "Medo"]);

const ExpertiseRanksEnum = z.enum(["Untrained", "Trained", "Veteran", "Expert"]);


const IdentitySchema = z.object({
	origem: z.string(),
	trail: TrailEnum,
	defense: z.string(),
	dash: z.string(),
	patent: PatentEnum,
	protections: z.array(z.string()),
	resistances: z.array(z.string()),
});

const ConditionsSchema = z.object({
	vitality: z.object({
		total: z.number(),
		current: z.number(),
	}),
	sanity: z.object({
		total: z.number(),
		current: z.number(),
	}),
	endeavorPoints: z.object({
		total: z.number(),
		current: z.number(),
	}),
});


const AttributesSchema = z.object({
	strength: z.number().int().min(0),
	intellect: z.number().int().min(0),
	presence: z.number().int().min(0),
	vigor: z.number().int().min(0),
	agility: z.number().int().min(0),
});


const RitualSchemas = z.array(
	z.object({
		name: z.string(),
		element: elementEnum,
		circle: z.enum(["1", "2", "3", "4"]),
		execution: z.string(),
		target: z.string(),
		duration: z.string(),
		resistance: z.string(),
	})
)

export const EXPERTISE_ATTRIBUTES = {
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


const OrdemParanormalSheet = z.object({
	id: z.string(),
	characterId: z.string(),
	updatedAt: z.date(),
	identity: IdentitySchema,
	conditions: ConditionsSchema,
	expertise: z.object(createExpertises(EXPERTISE_ATTRIBUTES)),
	attributes: AttributesSchema,
	ritual: RitualSchemas,
});

const OrdemParanormalInventory = z.object({
	itemLimit: z.object({
		one: z.number().int().default(0),
		two: z.number().int().default(0),
		three: z.number().int().default(0),
		four: z.number().int().default(0),
	}),
	creditLimit: z.string(),
	maximumLoad: z.string(),
	items: z.array(
		z.object({
			name: z.string(),
			category: z.string().optional(),
			space: z.string(),
		})
	),
});

const OrdemParanormalCreateInput = z.object({
	characterId: z.string(),
	identity: IdentitySchema,
	conditions: ConditionsSchema,
	expertise: z.object(createInputExpertises(EXPERTISE_ATTRIBUTES)),
	attributes: AttributesSchema,
	ritual: RitualSchemas,
});


export type OrdemParanormalSheet = z.infer<typeof OrdemParanormalSheet>;
export type OrdemParanormalInventory = z.infer<typeof OrdemParanormalInventory>;
export type OrdemParanormalCreateInput = z.infer<typeof OrdemParanormalCreateInput>;

export {
	PatentEnum,
	TrailEnum,
	elementEnum,
	ExpertiseRanksEnum
}