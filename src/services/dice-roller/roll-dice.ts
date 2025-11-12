import { InvalidOperationsError } from "@/_errors/invalid-operations";
import type { IRollsRepository } from "@/repository/rolls-repository";

interface RequestData {
	userId: string;
	expression: string;
	context?: "advantage" | "disadvantage";
}

export class RollDiceService {
	constructor(private rollsRepository: IRollsRepository) {}

	async execute({ expression, context, userId }: RequestData) {
		const { modifier, quantity, sides } = this.parse(expression);

		this.validateQuantify({ quantity });

		const dice = new Dice(sides);

		const roll = this.getRollStrategy(context ?? "standard", dice, quantity, modifier);

		await this.rollsRepository.saveRolls({
			userId,
			...roll,
			context: context ?? "stantard",
		});

		return roll;
	}

	private parse(expression: string) {
		const match = expression.match(/^(\d*)d(\d+)([+-]?\d+)?$/);

		if (!match) {
			throw new Error("Invalid dice expression format");
		}

		return {
			quantity: Number(match[1] || 1),
			sides: Number(match[2]),
			modifier: match[3] ? Number(match[3]) : 0,
		};
	}

	private validateQuantify({ quantity }: { quantity: number }): void {
		const minQuantity = 1;
		const maxQuantity = 100;

		if (!Number.isFinite(quantity) || quantity < minQuantity || quantity > maxQuantity) {
			throw new InvalidOperationsError(
				`Quantity must be between ${minQuantity} and ${maxQuantity}`,
			);
		}
	}

	private standardStrategy(dice: Dice, quantity: number, modifier: number) {
		const results = Array.from({ length: quantity }, () => dice.roll());
		const total = results.reduce((a, b) => a + b, 0) + modifier;

		return { results, total, modifier };
	}

	private advantageStrategy(dice: Dice, quantity: number, modifier: number) {
		const roll1 = this.standardStrategy(dice, quantity, modifier);
		const roll2 = this.standardStrategy(dice, quantity, modifier);

		const chosen = roll1.total >= roll2.total ? roll1 : roll2;

		return {
			...chosen,
			context: "advantage",
		};
	}

	private disadvantageStrategy(dice: Dice, quantity: number, modifier: number) {
		const roll1 = this.standardStrategy(dice, quantity, modifier);
		const roll2 = this.standardStrategy(dice, quantity, modifier);

		const chosen = roll1.total <= roll2.total ? roll1 : roll2;

		return {
			...chosen,
			context: "disadvantage",
		};
	}

	private getRollStrategy(
		context: "advantage" | "disadvantage" | "standard",
		dice: Dice,
		quantity: number,
		modifier: number,
	) {
		const strategies = {
			advantage: this.advantageStrategy,
			disadvantage: this.disadvantageStrategy,
			standard: this.standardStrategy,
		};

		const strategy = strategies[context] || this.standardStrategy;
		return strategy.call(this, dice, quantity, modifier);
	}
}

class Dice {
	constructor(public readonly sides: number) {
		if (!Number.isFinite(sides) || sides <= 1) {
			throw new InvalidOperationsError("Dice must have more than one side");
		}
	}

	roll(): number {
		return Math.floor(Math.random() * this.sides) + 1;
	}
}
