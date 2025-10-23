import z from "zod";

const OrdemParanormalSheetSchema = z.object({
	attributes: z.object({
		strength: z.number().min(1),
		agility: z.number().min(1),
		presence: z.number().min(1),
		vigor: z.number().min(1),
		intelligence: z.number().min(1),
	}),
	conditions: z.object({
		lifePoints: z.object({
			total: z.number().min(0),
			current: z.number().min(0),
		}),
		endeavorPoints: z.object({
			total: z.number().min(0),
			current: z.number().min(0),
		}),
		sanity: z.object({
			total: z.number().min(0),
			current: z.number().min(0),
		}),
		defense: z.number(),
		next: z.number().min(0).max(100),
		move: z.string(),
	}),
	identity: z.object({
		class: z.string(),
		origin: z.string(),
		patent: z.enum(["Recruta", "Agente especial", "Oficial de operações", "Agente de elite"]),
	}),
	caracteristicas: z.object({
		protections: z.string(),
		resistances: z.string(),
		proefficiencies: z.array(z.string()),
	}),
	expertises: z.object({
		acrobacia: z.object({
			attribute: z.enum(["agility", "strength", "presence", "vigor", "intelligence"]),
			bonus: z.number().min(0),
			level: z.enum(["Destreinado", "trained", "Veterano", "Expert"]),
		}),
	}),
	skills: z.array(
		z.object({
			name: z.string(),
			cost: z.number().min(0),
			description: z.string(),
			page: z.number().min(1),
		}),
	),
});

const OrdemParanormalInventorySchema = z.object({
	limitItems: {
		one: z.number().min(0),
		two: z.number().min(0),
		three: z.number().min(0),
		four: z.number().min(0),
	},
	creditLimit: z.number().min(0),
	limitCharge: z.number().min(0),
	item: z.array(
		z.object({
			name: z.string(),
			category: z.number().min(0),
			space: z.string(),
		}),
	),
});

export type OrdemParanormalSheet = z.infer<typeof OrdemParanormalSheetSchema>;
export type OrdemParanormalInventory = z.infer<typeof OrdemParanormalInventorySchema>;
