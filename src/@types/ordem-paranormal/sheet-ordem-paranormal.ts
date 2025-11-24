import z from "zod";
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

const SheetOrdemParanormal = z.object({
	id: z.string(),
	characterId: z.string(),
	updatedAt: z.date(),
	identity: IdentitySchema,
	conditions: ConditionsSchema,
	attributes: AttributesSchema,
	ritual: RitualSchemas,
	skill: z.array(skill),
});

const SheetOrdemParanormalCreateInput = z.object({
	identity: IdentitySchema,
	characterId: z.string(),
	attributes: AttributesSchema,
	ritual: RitualSchemas,
	skill: z.array(skill),
});

export type SheetOrdemParanormal = z.infer<typeof SheetOrdemParanormal>;
export type SheetOrdemParanormalCreateInput = z.infer<
	typeof SheetOrdemParanormalCreateInput
>;

export { PatentEnum, TrailEnum, elementEnum, ExpertiseRanksEnum, AttributesEnum };
