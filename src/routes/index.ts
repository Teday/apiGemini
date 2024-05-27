import { generateResponse } from "../controllers";

const routes = (app: any) => {
	app.route("/chat").post(generateResponse);
};

export { routes };
