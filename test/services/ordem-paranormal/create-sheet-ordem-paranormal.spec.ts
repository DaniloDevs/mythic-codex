import { beforeEach, describe, expect, it } from "vitest";

import { SheetOrdemParanormalImMemoryRepository } from "@/repository/in-memory/sheet-ordem-paranormal-im-memory-repository";
import type { ISheetOrdemParanormalRepository } from "@/repository/sheet-ordem-paranormal-repository";
import { CreateSheetOrdemParanormalService } from "@/services/sheet-ordem-paranormal/create-sheet-ordem-paranormal";
import { createSheetOrdemParanormalMock } from "../_mocks/sheet-ordem-paranormal";

describe("Create Sheet Ordem Paranormal - Service", () => {
	let ordemRespository: ISheetOrdemParanormalRepository;

	let sut: CreateSheetOrdemParanormalService;

	beforeEach(() => {
		ordemRespository = new SheetOrdemParanormalImMemoryRepository();
		sut = new CreateSheetOrdemParanormalService(ordemRespository);
	});

	it("should be possible to create a paranormal order character sheet.", async () => {
		const { sheetMocks } = createSheetOrdemParanormalMock({
			trail: "Combatente",
		});

		const { sheet } = await sut.execute({
			sheet: sheetMocks,
		});

		expect(sheet.id).toEqual(expect.any(String));
	});
});
