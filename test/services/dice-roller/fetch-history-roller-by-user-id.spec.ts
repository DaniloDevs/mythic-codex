import { beforeEach, describe, expect, it, vi } from "vitest";
import type { User } from "@/@types/user";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { RollsImMemoryRepository } from "@/repository/in-memory/rolls-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { FetchHistoryRollsByUserIdService } from "@/services/dice-roller/fetch-history-rollers-by-user-id";
import { RollDiceService } from "@/services/dice-roller/roll-dice";

describe("Fetch History Roller By User Id Service", () => {
	let rollRepository: RollsImMemoryRepository;
	let userRepository: UserImMemoryRepository;
	let rollDiceService: RollDiceService;
	let sut: FetchHistoryRollsByUserIdService;

	let user: User;

	beforeEach(async () => {
		rollRepository = new RollsImMemoryRepository();
		userRepository = new UserImMemoryRepository();
		rollDiceService = new RollDiceService(rollRepository);
		sut = new FetchHistoryRollsByUserIdService(userRepository, rollRepository);

		user = await userRepository.create({
			id: "user-01",
			name: "Jhon Doe",
			email: "ex@email.com",
			avatar: null,
			password: "123456",
		});

		vi.restoreAllMocks();
	});

	it("It should be possible to list a user's rolls.", async () => {
		for (let i = 0; i < 20; i++) {
			await rollDiceService.execute({ expression: "1d20", userId: user.id });
		}

		const { historyRolls } = await sut.execute({ userId: user.id });

		expect(historyRolls.length).toBe(20);
	});

	it("It should not be possible to list the rolls of a user that does not exist.", async () => {
		await expect(sut.execute({ userId: "non-exist-user" })).rejects.toBeInstanceOf(
			ResourceNotFoundError,
		);
	});
});
