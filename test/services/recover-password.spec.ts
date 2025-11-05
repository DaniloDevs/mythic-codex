import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResourceNotFoundError } from "@/_errors/resource-not-found";
import { TokensImMemoryRepository } from "@/repository/in-memory/tokens-in-memory";
import { UserImMemoryRepository } from "@/repository/in-memory/user-in-memory";
import { RecoverPasswordService } from "@/services/recover-password";

describe("Recover Password  Service", () => {
	let repository: TokensImMemoryRepository;
	let userRepository: UserImMemoryRepository;
	let sut: RecoverPasswordService;

	beforeEach(() => {
		repository = new TokensImMemoryRepository();
		userRepository = new UserImMemoryRepository();
		sut = new RecoverPasswordService(repository, userRepository);
	
      vi.useFakeTimers()
   })
 
   afterEach(() => {
     vi.useRealTimers()
   })

	it("should be possible to get a token to recover the password.", async () => {
		const user = await userRepository.create({
			id: "user-id",
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		const { token } = await sut.execute({ type: "RECOVER_PASSWORD", userId: user.id });

		expect(token.code).toEqual(expect.any(String));
	});

	it("should not be possible to create a recover token for a non-existent user.", async () => {
		await expect(
			sut.execute({ type: "RECOVER_PASSWORD", userId: "not-exist-user" }),
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

   it('should not be possible to create a token for 30 minutes after the last one was created.',async () => {
      vi.setSystemTime(new Date(2023, 0, 1, 13, 0))
		
      const user = await userRepository.create({
			id: "user-id",
			name: "Jhon Doe",
			email: "ex@email.com",
			password: "123456879",
			avatar: null,
		});

		await sut.execute({ type: "RECOVER_PASSWORD", userId: user.id });
		
		vi.setSystemTime(new Date(2023, 0, 1, 13, 5))
      
		await expect(
			sut.execute({ type: "RECOVER_PASSWORD", userId: user.id }),
		).rejects.toBeInstanceOf(Error);
   })
});
