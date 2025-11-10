interface RequestData {
	expression: string;
	context?: "advantage" | "disadvantage";
}

interface ResponseData {
	total: number;
	results: number[];
	modifier: number;
	expression: string;
	context?: "advantage" | "disadvantage";
}

class Dice {
	constructor(public readonly sides: number) {
		if (!Number.isFinite(sides) || sides <= 1) {
			throw new Error("Dice must have more than one side");
		}
	}

	roll(): number {
		return Math.floor(Math.random() * this.sides) + 1;
	}
}

export class RollDice {
	private roll({
		dice,
		quantity,
		modifier,
	}: {
		dice: Dice;
		quantity: number;
		modifier: number;
	}): ResponseData {
		const results = Array.from({ length: quantity }, () => dice.roll());
		const total = results.reduce((a, b) => a + b, 0) + modifier;

		return {
			results,
			total,
			modifier,
			expression: `${quantity}d${dice.sides}${modifier >= 0 ? `+${modifier}` : modifier}`,
		};
	}

	execute({ expression, context }: RequestData): ResponseData {
		const match = expression.match(/^(\d*)d(\d+)([+-]?\d+)?$/);
		if (!match) throw new Error("Invalid dice expression format");

		const quantity = Number(match[1] || 1);
		const sides = Number(match[2]);
		const modifier = match[3] ? Number(match[3]) : 0;

		if (!Number.isFinite(quantity) || quantity < 1 || quantity > 100) {
			throw new Error("Quantity must be between 1 and 100");
		}
		if (!Number.isFinite(sides) || sides <= 1) {
			throw new Error("Invalid number of sides for dice");
		}

		const dice = new Dice(sides);

		if (context) {
			const rolls = [
				this.roll({ dice, quantity, modifier }),
				this.roll({ dice, quantity, modifier }),
			];

			const chosenRoll =
				context === "advantage"
					? rolls.reduce((a, b) => (a.total >= b.total ? a : b))
					: rolls.reduce((a, b) => (a.total <= b.total ? a : b));

			return { ...chosenRoll, context };
		}

		return this.roll({ dice, quantity, modifier });
	}
}
