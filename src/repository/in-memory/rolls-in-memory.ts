import type { Dice, DiceCreateInput } from "@/@types/dice";
import type { IRollsRepository } from "../rolls-repository";

export class RollsImMemoryRepository implements IRollsRepository {
	public items: Dice[] = [];

	async fetchHistoryByUserId(userId: string): Promise<Dice[]> {
		const rolls = this.items.filter((roll) => roll.userId === userId);

		return rolls;
	}

	async saveRolls(roll: DiceCreateInput): Promise<void> {
		const rollToSave: Dice = {
			userId: roll.userId,
			results: roll.results,
			total: roll.total,
			modifier: roll.modifier,
			context: roll.context,
			createdAt: new Date(),
		};

		this.items.push(rollToSave);
	}
}
