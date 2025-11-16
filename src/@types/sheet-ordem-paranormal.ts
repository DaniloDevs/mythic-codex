import z from "zod";
import {
	createInputExpertiseMapSchema,
	expertiseMapSchema,
} from "@/@types/expertises-ordem-paranormal";
import type { Character } from "./character";

// enuns
const PatentEnum = z.enum([
	"Recruta",
	"Agente especial",
	"Oficial de operacoes",
	"Agente de elite",
]);
const TrailEnum = z.enum(["Combatente", "Especialista", "Ocultista"]);
const elementEnum = z.enum(["Conhecimento", "Energia", "Morte", "Sangue", "Medo"]);
const ExpertiseRanksEnum = z.enum(["Untrained", "Trained", "Veteran", "Expert"]);
const AttributesEnum = z.enum(["strength", "intellect", "presence", "vigor", "agility"]);

// schemas
const IdentitySchema = z.object({
	next: z.number().min(0).max(100),
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
	}),
);

const skill = z.object({
	name: z.string(),
	sale: z.string(),
	cost: z.string(),
	description: z.string(),
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
		}),
	),
});

const OrdemParanormalSheet = z.object({
	id: z.string(),
	characterId: z.string(),
	updatedAt: z.date(),
	identity: IdentitySchema,
	conditions: ConditionsSchema,
	expertise: expertiseMapSchema,
	attributes: AttributesSchema,
	ritual: RitualSchemas,
	skill: z.array(skill),
});

const OrdemParanormalCreateInput = z.object({
	characterId: z.string(),
	identity: IdentitySchema,
	conditions: ConditionsSchema,
	expertise: createInputExpertiseMapSchema,
	attributes: AttributesSchema,
	ritual: RitualSchemas,
	skill: z.array(skill),
});

export type OrdemParanormalSheet = z.infer<typeof OrdemParanormalSheet>;
export type OrdemParanormalInventory = z.infer<typeof OrdemParanormalInventory>;
export type OrdemParanormalCreateInput = z.infer<typeof OrdemParanormalCreateInput>;

export type OrdemCharacter = Character & OrdemParanormalSheet;

export { PatentEnum, TrailEnum, elementEnum, ExpertiseRanksEnum, AttributesEnum };
