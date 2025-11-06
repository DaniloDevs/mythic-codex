import { calculateConditionsPoints } from "./calc-conditions-points-ordem-paranormal";

export function CalculateConditionsClass({
	characterClass,
	next,
	vigor,
	presence,
}: {
	characterClass: "Combatente" | "Especialista" | "Ocultista";
	next: number;
	vigor: number;
	presence: number;
}) {
	const level = next / 5;

	let endeavorPoints: number, lifePoints: number, sanity: number;

	switch (characterClass) {
		case "Combatente":
			lifePoints = calculateConditionsPoints({
				base: 20,
				level,
				multiplier: 4,
				attribute: vigor,
			});
			endeavorPoints = calculateConditionsPoints({
				base: 2,
				level,
				multiplier: 2,
				attribute: presence,
			});
			sanity = calculateConditionsPoints({ base: 12, level, multiplier: 3 });

			break;
		case "Especialista":
			lifePoints = calculateConditionsPoints({
				base: 16,
				level,
				multiplier: 3,
				attribute: vigor,
			});
			endeavorPoints = calculateConditionsPoints({
				base: 3,
				level,
				multiplier: 3,
				attribute: presence,
			});
			sanity = calculateConditionsPoints({ base: 16, level, multiplier: 4 });

			break;
		case "Ocultista":
			lifePoints = calculateConditionsPoints({
				base: 12,
				level,
				multiplier: 2,
				attribute: vigor,
			});
			endeavorPoints = calculateConditionsPoints({
				base: 4,
				level,
				multiplier: 4,
				attribute: presence,
			});
			sanity = calculateConditionsPoints({ base: 20, level, multiplier: 5 });

			break;
	}

	return { endeavorPoints, lifePoints, sanity };
}
