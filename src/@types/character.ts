import z from "zod";
import { RpgSystemEnum } from "./rpg-system";

const character = z.object({
	id: z.string(),
	slug: z.string(),
	userId: z.string(),
	sheetId: z.string(),
	name: z.string(),
	rpgSystem: RpgSystemEnum,
	age: z.number(),
	description: z.string(),
	avatar: z.string().nullable(),
	createdAt: z.date(),
});

const characterCreateInput = z.object({
	userId: z.string(),
	sheetId: z.string(),
	name: z.string(),
	rpgSystem: RpgSystemEnum,
	age: z.number(),
	description: z.string(),
	avatar: z.string().nullable(),
});

export type Character = z.infer<typeof character>;
export type CharacterCreateInput = z.infer<typeof characterCreateInput>;
