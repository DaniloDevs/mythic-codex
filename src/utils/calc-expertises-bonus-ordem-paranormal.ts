import type { OrdemParanormalSheetCreateInput } from "@/@types/ordem-paranormal-sheet";

const LEVEL_BONUS = {
	Untrained: 0,
	Trained: 5,
	Veteran: 10,
	Expert: 15,
} as const;

export function CalculateExpertisesBonusOap({
	expertises,
}: OrdemParanormalSheetCreateInput) {
	const skills = {
		acrobatics: {
			attribute: "agility" as const,
			extraBonus: expertises.acrobatics.extraBonus,
			bonus: LEVEL_BONUS[expertises.acrobatics.level],
			level: expertises.acrobatics.level,
		},
		animalHandling: {
			attribute: "presence" as const,
			extraBonus: expertises.animalHandling.extraBonus,
			bonus: LEVEL_BONUS[expertises.animalHandling.level],
			level: expertises.animalHandling.level,
		},
		arts: {
			attribute: "presence" as const,
			extraBonus: expertises.arts.extraBonus,
			bonus: LEVEL_BONUS[expertises.arts.level],
			level: expertises.arts.level,
		},
		athletics: {
			attribute: "strength" as const,
			extraBonus: expertises.athletics.extraBonus,
			bonus: LEVEL_BONUS[expertises.athletics.level],
			level: expertises.athletics.level,
		},
		currentAffairs: {
			attribute: "intellect" as const,
			extraBonus: expertises.currentAffairs.extraBonus,
			bonus: LEVEL_BONUS[expertises.currentAffairs.level],
			level: expertises.currentAffairs.level,
		},
		science: {
			attribute: "intellect" as const,
			extraBonus: expertises.science.extraBonus,
			bonus: LEVEL_BONUS[expertises.science.level],
			level: expertises.science.level,
		},
		crime: {
			attribute: "agility" as const,
			extraBonus: expertises.crime.extraBonus,
			bonus: LEVEL_BONUS[expertises.crime.level],
			level: expertises.crime.level,
		},
		diplomacy: {
			attribute: "presence" as const,
			extraBonus: expertises.diplomacy.extraBonus,
			bonus: LEVEL_BONUS[expertises.diplomacy.level],
			level: expertises.diplomacy.level,
		},
		deception: {
			attribute: "presence" as const,
			extraBonus: expertises.deception.extraBonus,
			bonus: LEVEL_BONUS[expertises.deception.level],
			level: expertises.deception.level,
		},
		fortitude: {
			attribute: "vigor" as const,
			extraBonus: expertises.fortitude.extraBonus,
			bonus: LEVEL_BONUS[expertises.fortitude.level],
			level: expertises.fortitude.level,
		},
		stealth: {
			attribute: "agility" as const,
			extraBonus: expertises.stealth.extraBonus,
			bonus: LEVEL_BONUS[expertises.stealth.level],
			level: expertises.stealth.level,
		},
		initiative: {
			attribute: "agility" as const,
			extraBonus: expertises.initiative.extraBonus,
			bonus: LEVEL_BONUS[expertises.initiative.level],
			level: expertises.initiative.level,
		},
		intimidation: {
			attribute: "presence" as const,
			extraBonus: expertises.intimidation.extraBonus,
			bonus: LEVEL_BONUS[expertises.intimidation.level],
			level: expertises.intimidation.level,
		},
		intuition: {
			attribute: "presence" as const,
			extraBonus: expertises.intuition.extraBonus,
			bonus: LEVEL_BONUS[expertises.intuition.level],
			level: expertises.intuition.level,
		},
		investigation: {
			attribute: "intellect" as const,
			extraBonus: expertises.investigation.extraBonus,
			bonus: LEVEL_BONUS[expertises.investigation.level],
			level: expertises.investigation.level,
		},
		fighting: {
			attribute: "strength" as const,
			extraBonus: expertises.fighting.extraBonus,
			bonus: LEVEL_BONUS[expertises.fighting.level],
			level: expertises.fighting.level,
		},
		medicine: {
			attribute: "intellect" as const,
			extraBonus: expertises.medicine.extraBonus,
			bonus: LEVEL_BONUS[expertises.medicine.level],
			level: expertises.medicine.level,
		},
		occultism: {
			attribute: "intellect" as const,
			extraBonus: expertises.occultism.extraBonus,
			bonus: LEVEL_BONUS[expertises.occultism.level],
			level: expertises.occultism.level,
		},
		perception: {
			attribute: "presence" as const,
			extraBonus: expertises.perception.extraBonus,
			bonus: LEVEL_BONUS[expertises.perception.level],
			level: expertises.perception.level,
		},
		piloting: {
			attribute: "agility" as const,
			extraBonus: expertises.piloting.extraBonus,
			bonus: LEVEL_BONUS[expertises.piloting.level],
			level: expertises.piloting.level,
		},
		marksmanship: {
			attribute: "agility" as const,
			extraBonus: expertises.marksmanship.extraBonus,
			bonus: LEVEL_BONUS[expertises.marksmanship.level],
			level: expertises.marksmanship.level,
		},
		profession: {
			attribute: "intellect" as const,
			extraBonus: expertises.profession.extraBonus,
			bonus: LEVEL_BONUS[expertises.profession.level],
			level: expertises.profession.level,
		},
		reflexes: {
			attribute: "agility" as const,
			extraBonus: expertises.reflexes.extraBonus,
			bonus: LEVEL_BONUS[expertises.reflexes.level],
			level: expertises.reflexes.level,
		},
		religion: {
			attribute: "presence" as const,
			extraBonus: expertises.religion.extraBonus,
			bonus: LEVEL_BONUS[expertises.religion.level],
			level: expertises.religion.level,
		},
		survival: {
			attribute: "intellect" as const,
			extraBonus: expertises.survival.extraBonus,
			bonus: LEVEL_BONUS[expertises.survival.level],
			level: expertises.survival.level,
		},
		tactics: {
			attribute: "intellect" as const,
			extraBonus: expertises.tactics.extraBonus,
			bonus: LEVEL_BONUS[expertises.tactics.level],
			level: expertises.tactics.level,
		},
		technology: {
			attribute: "intellect" as const,
			extraBonus: expertises.technology.extraBonus,
			bonus: LEVEL_BONUS[expertises.technology.level],
			level: expertises.technology.level,
		},
		will: {
			attribute: "presence" as const,
			extraBonus: expertises.will.extraBonus,
			bonus: LEVEL_BONUS[expertises.will.level],
			level: expertises.will.level,
		},
	};

	return { skills };
}
