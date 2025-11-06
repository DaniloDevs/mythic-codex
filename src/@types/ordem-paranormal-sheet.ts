import z from "zod";

const SkillLevelEnum = z.enum(["Untrained", "Trained", "Veteran", "Expert"]);

const PatentEnum = z.enum([
	"Recruta",
	"Agente especial",
	"Oficial de operações",
	"Agente de elite",
]);

const ClassEnum = z.enum(["Combatente", "Especialista", "Ocultista"]);

const PointsSchema = z.object({
	total: z.number().min(0),
	current: z.number().min(0),
});

const ItemSchema = z.object({
	name: z.string(),
	category: z.number().min(0),
	space: z.string(),
});

const SkillSchema = z.object({
	name: z.string(),
	cost: z.number().min(0),
	description: z.string(),
	page: z.number().min(1),
});

const AttributesSchema = z.object({
	strength: z.number().min(1),
	agility: z.number().min(1),
	presence: z.number().min(1),
	vigor: z.number().min(1),
	intelligence: z.number().min(1),
});

const StatusBaseSchema = z.object({
	defense: z.number(),
	next: z.number().min(0).max(100),
	move: z.string(),
});

const IdentitySchema = z.object({
	class: ClassEnum,
	origin: z.string(),
	patent: PatentEnum,
});

const CharacteristicsSchema = z.object({
	protections: z.string(),
	resistances: z.string(),
	proficiencies: z.array(z.string()),
});

// Para expertise completa (com attribute e bonus)
const createExpertise = <T extends string>(attribute: T) =>
	z.object({
		attribute: z.literal(attribute),
		extraBonus: z.number().min(0),
		bonus: z.number().min(0),
		level: SkillLevelEnum,
	});

// Para expertise de criação (sem attribute e bonus)
const createExpertiseInput = () =>
	z.object({
		extraBonus: z.number().min(0),
		level: SkillLevelEnum,
	});

// Mapeamento de expertises para seus atributos
const EXPERTISE_ATTRIBUTES = {
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

// Gera objeto de expertises completas
const createExpertisesSchema = () => {
	const expertises = {} as Record<
		keyof typeof EXPERTISE_ATTRIBUTES,
		ReturnType<typeof createExpertise>
	>;

	for (const [key, attr] of Object.entries(EXPERTISE_ATTRIBUTES)) {
		expertises[key as keyof typeof EXPERTISE_ATTRIBUTES] = createExpertise(attr);
	}

	return z.object(expertises);
};

// Gera objeto de expertises de input
const createExpertisesInputSchema = () => {
	const expertises = {} as Record<
		keyof typeof EXPERTISE_ATTRIBUTES,
		ReturnType<typeof createExpertiseInput>
	>;

	for (const key of Object.keys(EXPERTISE_ATTRIBUTES)) {
		expertises[key as keyof typeof EXPERTISE_ATTRIBUTES] = createExpertiseInput();
	}

	return z.object(expertises);
};

const OrdemParanormalInventorySchema = z.object({
	limitItems: z.object({
		one: z.number().min(0),
		two: z.number().min(0),
		three: z.number().min(0),
		four: z.number().min(0),
	}),
	creditLimit: z.number().min(0),
	limitCharge: z.number().min(0),
	item: z.array(ItemSchema),
});

const OrdemParanormalSheetSchema = z.object({
	attributes: AttributesSchema,
	status: StatusBaseSchema.extend({
		lifePoints: PointsSchema,
		endeavorPoints: PointsSchema,
		sanity: PointsSchema,
	}),
	identity: IdentitySchema,
	characteristics: CharacteristicsSchema,
	expertises: createExpertisesSchema(),
	skills: z.array(SkillSchema),
});

const OrdemParanormalSheetCreateInputSchema = z.object({
	attributes: AttributesSchema,
	status: StatusBaseSchema,
	identity: IdentitySchema,
	characteristics: CharacteristicsSchema,
	expertises: createExpertisesInputSchema(),
	skills: z.array(
		SkillSchema.extend({
			cost: z.number().min(0).default(0),
		}),
	),
});

export type OrdemParanormalSheet = z.infer<typeof OrdemParanormalSheetSchema>;
export type OrdemParanormalInventory = z.infer<typeof OrdemParanormalInventorySchema>;
export type OrdemParanormalSheetCreateInput = z.infer<
	typeof OrdemParanormalSheetCreateInputSchema
>;

// Tipos auxiliares úteis
export type SkillLevel = z.infer<typeof SkillLevelEnum>;
export type Patent = z.infer<typeof PatentEnum>;
export type Class = z.infer<typeof ClassEnum>;
export type Points = z.infer<typeof PointsSchema>;
export type Item = z.infer<typeof ItemSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Attributes = z.infer<typeof AttributesSchema>;

export {
	OrdemParanormalSheetSchema,
	OrdemParanormalInventorySchema,
	OrdemParanormalSheetCreateInputSchema,
	SkillLevelEnum,
	PatentEnum,
	ClassEnum,
	EXPERTISE_ATTRIBUTES,
};
