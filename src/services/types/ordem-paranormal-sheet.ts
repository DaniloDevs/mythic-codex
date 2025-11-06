import z from "zod";

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

const OrdemParanormalSheetSchema = z.object({
	attributes: z.object({
		strength: z.number().min(1),
		agility: z.number().min(1),
		presence: z.number().min(1),
		vigor: z.number().min(1),
		intelligence: z.number().min(1),
	}),
	status: z.object({
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
		class: z.enum(["Combatente", "Especialista", "Ocultista"]),
		origin: z.string(),
		patent: z.enum([
			"Recruta",
			"Agente especial",
			"Oficial de operações",
			"Agente de elite",
		]),
	}),
	caracteristicas: z.object({
		protections: z.string(),
		resistances: z.string(),
		proefficiencies: z.array(z.string()),
	}),
	expertises: z.object({
		acrobatics: z.object({
			attribute: z.literal("agility"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		animalHandling: z.object({
			attribute: z.literal("presence"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		arts: z.object({
			attribute: z.literal("presence"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		athletics: z.object({
			attribute: z.literal("strength"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		currentAffairs: z.object({
			attribute: z.literal("intellect"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		science: z.object({
			attribute: z.literal("intellect"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		crime: z.object({
			attribute: z.literal("agility"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		diplomacy: z.object({
			attribute: z.literal("presence"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		deception: z.object({
			attribute: z.literal("presence"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		fortitude: z.object({
			attribute: z.literal("vigor"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		stealth: z.object({
			attribute: z.literal("agility"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		initiative: z.object({
			attribute: z.literal("agility"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		intimidation: z.object({
			attribute: z.literal("presence"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		intuition: z.object({
			attribute: z.literal("presence"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		investigation: z.object({
			attribute: z.literal("intellect"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		fighting: z.object({
			attribute: z.literal("strength"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		medicine: z.object({
			attribute: z.literal("intellect"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		occultism: z.object({
			attribute: z.literal("intellect"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		perception: z.object({
			attribute: z.literal("presence"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		piloting: z.object({
			attribute: z.literal("agility"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		marksmanship: z.object({
			attribute: z.literal("agility"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		profession: z.object({
			attribute: z.literal("intellect"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		reflexes: z.object({
			attribute: z.literal("agility"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		religion: z.object({
			attribute: z.literal("presence"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		survival: z.object({
			attribute: z.literal("intellect"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		tactics: z.object({
			attribute: z.literal("intellect"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		technology: z.object({
			attribute: z.literal("intellect"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		will: z.object({
			attribute: z.literal("presence"),
			extraBonus: z.number().min(0),
			bonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
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

export type OrdemParanormalSheet = z.infer<typeof OrdemParanormalSheetSchema>;

export type OrdemParanormalInventory = z.infer<typeof OrdemParanormalInventorySchema>;
