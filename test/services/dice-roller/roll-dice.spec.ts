import { beforeEach, describe, expect, it, vi } from "vitest";
import { InvalidOperationsError } from "@/_errors/invalid-operations";
import { RollDiceService } from "@/services/dice-roller/roll-dice";

describe("Roll Dice Service", () => {
	let service: RollDiceService;

	beforeEach(() => {
		service = new RollDiceService();

		vi.restoreAllMocks();
	});

	describe("Standard rolls", () => {
		it("should be able to make standard rolls", () => {
			const roll = service.execute({ expression: "3d20" });

			expect(roll.total).toBeGreaterThanOrEqual(3);
			expect(roll.total).toBeLessThanOrEqual(60);
			expect(roll.results).toHaveLength(3);

			const sumOfResults = roll.results.reduce((a, b) => a + b, 0);
			expect(roll.total).toBe(sumOfResults + (roll.modifier || 0));

			expect(roll.modifier).toBe(0);

			expect(roll).not.toHaveProperty("context");
		});

		it("should be able to make standard rolls with positive modifiers", () => {
			const roll = service.execute({ expression: "3d20+5" });

			expect(roll.total).toBeGreaterThanOrEqual(8);
			expect(roll.total).toBeLessThanOrEqual(65);
			expect(roll.results).toHaveLength(3);

			const sumOfResults = roll.results.reduce((a, b) => a + b, 0);
			expect(roll.total).toBe(sumOfResults + roll.modifier);
			expect(roll.modifier).toBe(5);
		});

		it("should be able to make standard rolls with negative modifiers", () => {
			const roll = service.execute({ expression: "3d20-5" });

			expect(roll.total).toBeGreaterThanOrEqual(-2);
			expect(roll.total).toBeLessThanOrEqual(55);
			expect(roll.results).toHaveLength(3);

			const sumOfResults = roll.results.reduce((a, b) => a + b, 0);
			expect(roll.total).toBe(sumOfResults + roll.modifier);

			expect(roll.modifier).toBe(-5);
		});
	});

	describe("Rolls with advantage", () => {
		it("should be able to make standard rolls with advantage", () => {
			const roll = service.execute({ expression: "2d20", context: "advantage" });

			expect(roll.total).toBeGreaterThanOrEqual(2);
			expect(roll.total).toBeLessThanOrEqual(40);
			expect(roll.results).toHaveLength(2);

			expect(roll).toHaveProperty("context");
			expect((roll as any).context).toBe("advantage");

			const sumOfResults = roll.results.reduce((a, b) => a + b, 0);
			expect(roll.total).toBe(sumOfResults + (roll.modifier || 0));
			expect(roll.modifier).toBe(0);
		});

		it("should be able to make standard rolls with advantage with positive modifiers", () => {
			const roll = service.execute({ expression: "2d20+5", context: "advantage" });

			expect(roll.total).toBeGreaterThanOrEqual(7);
			expect(roll.total).toBeLessThanOrEqual(45);
			expect(roll.results).toHaveLength(2);

			expect(roll).toHaveProperty("context");
			expect((roll as any).context).toBe("advantage");

			const sumOfResults = roll.results.reduce((a, b) => a + b, 0);
			expect(roll.total).toBe(sumOfResults + roll.modifier);
			expect(roll.modifier).toBe(5);
		});

		it("should be able to make standard rolls with advantage with negative modifiers", () => {
			const roll = service.execute({ expression: "2d20-5", context: "advantage" });

			expect(roll.total).toBeGreaterThanOrEqual(-3);
			expect(roll.total).toBeLessThanOrEqual(35);
			expect(roll.results).toHaveLength(2);

			expect(roll).toHaveProperty("context");
			expect((roll as any).context).toBe("advantage");

			const sumOfResults = roll.results.reduce((a, b) => a + b, 0);
			expect(roll.total).toBe(sumOfResults + roll.modifier);
			expect(roll.modifier).toBe(-5);
		});

		it("should choose the highest value between two rolls with advantage", () => {
			const rollsWithAdvantage: number[] = [];
			const rollsWithoutAdvantage: number[] = [];

			for (let i = 0; i < 50; i++) {
				const rollAdvantage = service.execute({ expression: "1d20", context: "advantage" });
				const rollStandard = service.execute({ expression: "1d20" });
				rollsWithAdvantage.push(rollAdvantage.total);
				rollsWithoutAdvantage.push(rollStandard.total);
			}


			const avgWithAdvantage = rollsWithAdvantage.reduce((a, b) => a + b, 0) / rollsWithAdvantage.length;
			const avgWithoutAdvantage = rollsWithoutAdvantage.reduce((a, b) => a + b, 0) / rollsWithoutAdvantage.length;
			expect(avgWithAdvantage).toBeGreaterThan(avgWithoutAdvantage);
		});
	});

	describe("Rolls with disadvantage", () => {
		it("should be able to make standard rolls with disadvantage", () => {
			const roll = service.execute({ expression: "2d20", context: "disadvantage" });

			expect(roll.total).toBeGreaterThanOrEqual(2);
			expect(roll.total).toBeLessThanOrEqual(40);
			expect(roll.results).toHaveLength(2);

			expect(roll).toHaveProperty("context");
			expect((roll as any).context).toBe("disadvantage");

			const sumOfResults = roll.results.reduce((a, b) => a + b, 0);
			expect(roll.total).toBe(sumOfResults + (roll.modifier || 0));
			expect(roll.modifier).toBe(0);
		});

		it("should be able to make standard rolls with disadvantage with positive modifiers", () => {
			const roll = service.execute({ expression: "2d20+5", context: "disadvantage" });

			expect(roll.total).toBeGreaterThanOrEqual(7);
			expect(roll.total).toBeLessThanOrEqual(45);
			expect(roll.results).toHaveLength(2);

			expect(roll).toHaveProperty("context");
			expect((roll as any).context).toBe("disadvantage");

			const sumOfResults = roll.results.reduce((a, b) => a + b, 0);
			expect(roll.total).toBe(sumOfResults + roll.modifier);
			expect(roll.modifier).toBe(5);
		});

		it("should be able to make standard rolls with disadvantage with negative modifiers", () => {
			const roll = service.execute({ expression: "2d20-5", context: "disadvantage" });

			expect(roll.total).toBeGreaterThanOrEqual(-3);
			expect(roll.total).toBeLessThanOrEqual(35);
			expect(roll.results).toHaveLength(2);

			expect(roll).toHaveProperty("context");
			expect((roll as any).context).toBe("disadvantage");

			const sumOfResults = roll.results.reduce((a, b) => a + b, 0);
			expect(roll.total).toBe(sumOfResults + roll.modifier);
			expect(roll.modifier).toBe(-5);
		});

		it("should choose the lowest value between two rolls with disadvantage", () => {
			const rollsWithDisadvantage: number[] = [];
			const rollsWithoutDisadvantage: number[] = [];

			for (let i = 0; i < 50; i++) {
				const rollDisadvantage = service.execute({ expression: "1d20", context: "disadvantage" });
				const rollStandard = service.execute({ expression: "1d20" });
				rollsWithDisadvantage.push(rollDisadvantage.total);
				rollsWithoutDisadvantage.push(rollStandard.total);
			}

			const avgWithDisadvantage = rollsWithDisadvantage.reduce((a, b) => a + b, 0) / rollsWithDisadvantage.length;
			const avgWithoutDisadvantage = rollsWithoutDisadvantage.reduce((a, b) => a + b, 0) / rollsWithoutDisadvantage.length;
			expect(avgWithDisadvantage).toBeLessThan(avgWithoutDisadvantage);
		});
	});

	describe("Error cases", () => {
		it("should not be able to roll dice with only one side", () => {
			expect(() => service.execute({ expression: "1d1" })).toThrowError(InvalidOperationsError);
		});

		it("should not be able to make standard rolls with an invalid expression", () => {
			expect(() => service.execute({ expression: "tresDvinte" })).toThrowError(Error);
		});

		it("should not be able to make more than 100 standard rolls", () => {
			expect(() => service.execute({ expression: "200d20" })).toThrowError(InvalidOperationsError);
		});

		it("should not be able to make less than 1 standard roll", () => {
			expect(() => service.execute({ expression: "0d20" })).toThrowError(InvalidOperationsError);
		});
	});
});
