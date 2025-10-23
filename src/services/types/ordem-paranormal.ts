import z from "zod";

const OrdemParanormalSheetSchema = z.object({
	attributes: z.object({
		strength: z.number().min(1),
		agility: z.number().min(1),
		presence: z.number().min(1),
		vigor: z.number().min(1),
		intelligence: z.number().min(1),
	}),
	fisicState: z.object({
		vida: z.object({
			total: z.number().min(0),
			current: z.number().min(0),
		}),
		esforço: z.object({
			total: z.number().min(0),
			current: z.number().min(0),
		}),
		sanidade: z.object({
			total: z.number().min(0),
			current: z.number().min(0),
		}),
		defesa: z.number(),
		next: z.number().min(0).max(100),
		deslocamento: z.string(),
	}),
	identidade: z.object({
		classe: z.string(),
		origem: z.string(),
		patente: z.string(),
	}),
	caracteristicas: z.object({
		proteções: z.string(),
		resistências: z.string(),
		proeficiências: z.array(z.string()),
	}),
	expertises: z.object({
		acrobacia: z.object({
			atributo: z.enum(["agility", "strength", "presence", "vigor", "intelligence"]),
			bonus: z.number().min(0),
			nivel: z.enum(["Destreinado", "trained", "Veterano", "Expert"]),
		}),
	}),
	skills: z.array(
		z.object({
			name: z.string(),
			custo: z.number().min(0),
			description: z.string(),
			page: z.number().min(1),
		}),
	),
});

const OrdemParanormalInventorySchema = z.object({
	items: z.array(z.string()),
	money: z.number().min(0),
});

export type OrdemParanormalSheet = z.infer<typeof OrdemParanormalSheetSchema>;
export type OrdemParanormalInventory = z.infer<typeof OrdemParanormalInventorySchema>;
