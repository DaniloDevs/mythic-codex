import z from "zod";
import type {
	OrdemParanormalInventory,
	OrdemParanormalSheet,
} from "./ordem-paranormal-sheet";

interface RpgSystemConfig {
	sheet: unknown;
	inventory: unknown;
}

interface DungeonsSheet {
	level: number;
}

interface DungeonsInventory {
	gold: number;
}

interface TormentaSheet {
	level: number;
}

interface TormentaInventory {
	tibares: number;
}

// Sistemas configurados
interface OrdemParanormalSystem extends RpgSystemConfig {
	sheet: OrdemParanormalSheet;
	inventory: OrdemParanormalInventory;
}

interface DungeonsSystem extends RpgSystemConfig {
	sheet: DungeonsSheet;
	inventory: DungeonsInventory;
}

interface TormentaSystem extends RpgSystemConfig {
	sheet: TormentaSheet;
	inventory: TormentaInventory;
}

// ============================================
// 2. MAPEAMENTO DE SISTEMAS
// ============================================

type RpgSystemMap = {
	"Ordem Paranormal": OrdemParanormalSystem;
	"Dungeon And Dragons": DungeonsSystem;
	Tormenta: TormentaSystem;
};

export const RpgSystemEnum = z.enum([
	"Dungeon And Dragons",
	"Ordem Paranormal",
	"Tormenta",
]);

export type RpgSystem = z.infer<typeof RpgSystemEnum>;

export type {
	RpgSystemConfig,
	OrdemParanormalSheet,
	OrdemParanormalInventory,
	OrdemParanormalSystem,
	DungeonsSheet,
	DungeonsInventory,
	DungeonsSystem,
	TormentaSheet,
	TormentaInventory,
	TormentaSystem,
	RpgSystemMap,
};
