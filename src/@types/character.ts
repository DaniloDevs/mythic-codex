import z from "zod";
import { type RpgSystem, RpgSystemEnum, type RpgSystemMap } from "./rpg-system";

const CharacterBaseSchema = z.object({
	userId: z.string(),
	sheetId: z.string(),
	name: z.string(),
	rpgSystem: RpgSystemEnum.options,
	age: z.number(),
	description: z.string(),
	avatar: z.string().nullable(),
});

const CharacterSchema = CharacterBaseSchema.extend({
	id: z.string(),
	slug: z.string(),
});

const CharacterCreateInputSchema = CharacterBaseSchema;

export type Character<T extends RpgSystem = RpgSystem> = CharacterBase & {
	rpgSystem: T;
	sheet: RpgSystemMap[T]["sheet"];
	inventory: RpgSystemMap[T]["inventory"];
};

export type CharacterBase = z.infer<typeof CharacterSchema>;
export type CharacterCreateInput = z.infer<typeof CharacterCreateInputSchema>;

// Helper types para uso mais fácil
export type OrdemCharacter = Character<"Ordem Paranormal">;
export type DungeonsCharacter = Character<"Dungeon And Dragons">;
export type TormentaCharacter = Character<"Tormenta">;
