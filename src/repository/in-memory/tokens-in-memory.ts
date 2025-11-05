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

	async fetchTokensByUserId(userId: string): Promise<Tokens[]> {
		const userTokens = this.items
			.filter((tokens) => tokens.userId === userId)
			.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

		return userTokens;
	}

	async getTokenByCode(code: string): Promise<Tokens | null> {
		const token = this.items.find((token) => token.code === code);

		return token ?? null;
	}
}
