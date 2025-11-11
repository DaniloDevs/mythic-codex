import { beforeEach, describe, expect, it } from "vitest";
import { RollDice } from "@/services/dice/roll-dice";

describe("Roll Dice Service", () => {
	let service: RollDice;

	beforeEach(() => {
		service = new RollDice();
	});

	it("should be able to roll basic dice", () => {
		const roll = service.execute({ expression: "1d20" });

		expect(roll.total).toBeGreaterThanOrEqual(1);
		expect(roll.total).toBeLessThanOrEqual(20);
		expect(roll.results).toHaveLength(1);
	});

	it("should be able to roll multiple dice", () => {
		const roll = service.execute({ expression: "3d6" });

		expect(roll.total).toBeGreaterThanOrEqual(3);
		expect(roll.total).toBeLessThanOrEqual(18);
		expect(roll.results).toHaveLength(3);
		roll.results.forEach((result) => {
			expect(result).toBeGreaterThanOrEqual(1);
			expect(result).toBeLessThanOrEqual(6);
		});
		expect(roll.modifier).toBe(0);
	});

	it("should be able to roll dice with positive modifiers", () => {
		const roll = service.execute({ expression: "1d20+1" });

		expect(roll.modifier).toBe(1);
		expect(roll.total).toBeGreaterThanOrEqual(2);
		expect(roll.total).toBeLessThanOrEqual(21);
		expect(roll.expression).toMatch(/1d20\+1/);
	});

	it("should be able to roll dice with negative modifiers", () => {
		const roll = service.execute({ expression: "1d20-1" });

		expect(roll.modifier).toBe(-1);
		expect(roll.total).toBeGreaterThanOrEqual(0);
		expect(roll.total).toBeLessThanOrEqual(19);
		expect(roll.expression).toMatch(/1d20-1/);
	});

	it("should be able to roll with advantage", () => {
		const roll = service.execute({ expression: "1d20", context: "advantage" });

		expect(roll.context).toBe("advantage");
		expect(roll.total).toBeGreaterThanOrEqual(1);
		expect(roll.total).toBeLessThanOrEqual(20);
		expect(roll.results).toHaveLength(1);
	});

	it("should be able to roll with advantage using modifiers", () => {
		const roll = service.execute({ expression: "1d20+5", context: "advantage" });

		expect(roll.context).toBe("advantage");
		expect(roll.modifier).toBe(5);
		expect(roll.total).toBeGreaterThanOrEqual(6);
		expect(roll.total).toBeLessThanOrEqual(25);
	});

	it("should be able to roll with advantage using negative modifiers", () => {
		const roll = service.execute({ expression: "2d20-5", context: "advantage" });

		expect(roll.context).toBe("advantage");
		expect(roll.modifier).toBe(-5);
		expect(roll.total).toBeGreaterThanOrEqual(-3);
		expect(roll.total).toBeLessThanOrEqual(35);
	});

	it("should be able to roll with disadvantage", () => {
		const roll = service.execute({ expression: "1d20", context: "disadvantage" });

		expect(roll.context).toBe("disadvantage");
		expect(roll.total).toBeGreaterThanOrEqual(1);
		expect(roll.total).toBeLessThanOrEqual(20);
		expect(roll.results).toHaveLength(1);
	});

	it("should be able to roll with disadvantage using modifiers", () => {
		const roll = service.execute({ expression: "1d20+5", context: "disadvantage" });

		expect(roll.context).toBe("disadvantage");
		expect(roll.modifier).toBe(5);
		expect(roll.total).toBeGreaterThanOrEqual(6);
		expect(roll.total).toBeLessThanOrEqual(25);
	});

	it("should be able to roll with disadvantage using negative modifiers", () => {
		const roll = service.execute({ expression: "2d20-5", context: "disadvantage" });

		expect(roll.context).toBe("disadvantage");
		expect(roll.modifier).toBe(-5);
		expect(roll.total).toBeGreaterThanOrEqual(-3);
		expect(roll.total).toBeLessThanOrEqual(35);
	});

	it("should throw error when quantity exceeds maximum (200 dice)", () => {
		expect(() => service.execute({ expression: "200d20" })).toThrow(
			"Quantity must be between 1 and 100",
		);
	});

	it("should throw error when quantity is zero", () => {
		expect(() => service.execute({ expression: "0d20" })).toThrow(
			"Quantity must be between 1 and 100",
		);
	});

	it("should throw error when dice has invalid number of sides (0 sides)", () => {
		expect(() => service.execute({ expression: "4d0" })).toThrow(
			"Invalid number of sides for dice",
		);
	});
});
