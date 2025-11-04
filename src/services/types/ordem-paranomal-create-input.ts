import z from "zod";

const OrdemParanormalSheetCreateInputSchema = z.object({
	attributes: z.object({
		strength: z.number().min(1),
		agility: z.number().min(1),
		presence: z.number().min(1),
		vigor: z.number().min(1),
		intelligence: z.number().min(1),
	}),
	conditions: z.object({
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
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		animalHandling: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		arts: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		athletics: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		currentAffairs: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		science: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		crime: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		diplomacy: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		deception: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		fortitude: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		stealth: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		initiative: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		intimidation: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		intuition: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		investigation: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		fighting: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		medicine: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		occultism: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		perception: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		piloting: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		marksmanship: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		profession: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		reflexes: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		religion: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		survival: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		tactics: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		technology: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
		will: z.object({
			extraBonus: z.number().min(0),
			level: z.enum(["Untrained", "Trained", "Veteran", "Expert"]),
		}),
	}),
	skills: z.array(
		z.object({
			name: z.string(),
			cost: z.number().min(0).default(0),
			description: z.string(),
			page: z.number().min(1),
		}),
	),
});

export type OrdemParanormalSheetCreateInput = z.infer<
	typeof OrdemParanormalSheetCreateInputSchema
>;
