import { calculateConditionsPoints } from "./calc-conditions-points-ordem-paranormal";

export function CalculateConditionsClass({
	trail,
	next,
	vigor,
	presence,
}: {
	trail: "Combatente" | "Especialista" | "Ocultista";
	next: number;
	vigor: number;
	presence: number;
}) {
	const level = next / 5;

	let endeavorPoints: number, vitality: number, sanity: number;

	switch (trail) {
		case "Combatente":
			vitality = calculateConditionsPoints({
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
			vitality = calculateConditionsPoints({
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
			vitality = calculateConditionsPoints({
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

	return { endeavorPoints, vitality, sanity };
}
