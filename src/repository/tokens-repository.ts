import z from "zod";

const TokensCreateInputSchema = z.object({
	userId: z.string(),
	type: z.enum(["RECOVER_PASSWORD"]),
});

const TokensSchema = z.object({
	code: z.string(),
	type: z.enum(["RECOVER_PASSWORD"]),
	userId: z.string(),
	createdAt: z.date(),
});

export type TokensCreateInput = z.infer<typeof TokensCreateInputSchema>;
export type Tokens = z.infer<typeof TokensSchema>;

export interface ITokensRepository {
	createToken(data: TokensCreateInput): Promise<Tokens>;
	fetchTokensByUserId(userId: string): Promise<Tokens[]>;
	getTokenByCode(code: string): Promise<Tokens | null>;
}
