import type { Dice, DiceCreateInput } from "@/@types/dice";

export interface IRollsRepository {
	fetchHistoryByUserId(userId: string): Promise<Dice[]>;
	saveRolls(roll: DiceCreateInput): Promise<void>;
}
