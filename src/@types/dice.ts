import z from "zod";

const StrategyEnum = z.enum(["stantard", "advantage", "disadvantage"]);

const DiceCreateInputSchema = z.object({
	userId: z.string(),
	results: z.number().array(),
	total: z.number(),
	modifier: z.number(),
	context: z.enum(StrategyEnum.options),
});

const DiceSchema = z.object({
	userId: z.string(),
	results: z.number().array(),
	total: z.number(),
	modifier: z.number(),
	context: z.enum(StrategyEnum.options),
	createdAt: z.date(),
});

export type DiceCreateInput = z.infer<typeof DiceCreateInputSchema>;
export type Dice = z.infer<typeof DiceSchema>;
