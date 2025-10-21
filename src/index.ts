import FastifyCookie from "@fastify/cookie";
import FastifyJWT from "@fastify/jwt";
import Swagger from "@fastify/swagger";
import ScalarSwagger from "@scalar/fastify-api-reference";
import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(FastifyJWT, {
	secret: env.SECRET_JWT,
	cookie: {
		cookieName: "token",
		signed: false,
	},
});

app.register(FastifyCookie);

app.register(Swagger, {
	openapi: {
		info: {
			title: "Mythic Codex",
			description: "RPG character management system",
			version: "0.0.1",
		},
	},
});

app.register(ScalarSwagger, {
	routePrefix: "/docs",
});

export { app };
