import { beforeEach, describe, expect, it } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { SheetOrdemParanormalImMemoryRepository } from "@/repository/in-memory/sheet-ordem-paranormal-im-memory-repository";
import type { ISheetOrdemParanormalRepository } from "@/repository/sheet-ordem-paranormal-repository";
import { CreateSheetOrdemParanormalService } from "@/services/sheet-ordem-paranormal/create-sheet-ordem-paranormal";
import { GetSheetOrdemParanormalById } from "@/services/sheet-ordem-paranormal/get-sheet-ordem-paranormal-by-id";
import { createSheetOrdemParanormalMock } from "../_mocks/sheet-ordem-paranormal";

describe("Get Sheet Ordem Paranormal By Id - Service", () => {
	let ordemRespository: ISheetOrdemParanormalRepository;
	let createSheetOrdemService: CreateSheetOrdemParanormalService;

	let sut: GetSheetOrdemParanormalById;

	beforeEach(() => {
		ordemRespository = new SheetOrdemParanormalImMemoryRepository();
		createSheetOrdemService = new CreateSheetOrdemParanormalService(ordemRespository);
		sut = new GetSheetOrdemParanormalById(ordemRespository);
	});

	it("should be possible to search for a record using an existing sheet ID.", async () => {
		const { sheetMocks } = createSheetOrdemParanormalMock({ trail: "Especialista" });

		const { sheet } = await createSheetOrdemService.execute({ sheet: sheetMocks });

		const { sheetOrdem } = await sut.execute({ sheetId: sheet.id });

		expect(sheetOrdem.id).toEqual(expect.any(String));
	});

	it("should not be possible to search for a record by a sheet ID that does not exist.", async () => {
		await expect(() =>
			sut.execute({ sheetId: "non-exist-sheet" }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
