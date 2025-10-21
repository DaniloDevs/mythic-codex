import { app } from ".";
import { env } from "./env";

app
	.listen({
		port: env.PORT,
	})
	.then(() => {
		console.log(`Server Running!`);
		console.log(`DOCS: http://localhost:${env.PORT}/docs`);
	});
