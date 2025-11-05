import { randomUUID } from "node:crypto";
import type { ITokensRepository, Tokens, TokensCreateInput } from "../tokens-repository";

export class TokensImMemoryRepository implements ITokensRepository {
	public items: Tokens[] = [];

	async createToken(data: TokensCreateInput) {
		const tokens: Tokens = {
			userId: data.userId,
			type: data.type,
			code: randomUUID(),
			createdAt: new Date(),
		};

		this.items.push(tokens);

		return tokens;
	}

	async getTokensByUserId(userId: string): Promise<Tokens[]> {
		const userTokens = this.items.filter(tokens => tokens.userId === userId).sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

		return userTokens
	}

	validateToken(code: string): Promise<boolean> {
		throw new Error("Method not implemented.");
	}
}
