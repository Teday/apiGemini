import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config()

const configuration = new GoogleGenerativeAI(process.env.API_KEY || "")

const modelId = "gemini-1.5-flash";
const model = configuration.getGenerativeModel({model: modelId});

const generateResponse = async (req: any, res: any) => {
    try {
        const { prompt } = req.body;

        const chat = model.startChat({
            generationConfig: {
                maxOutputTokens: 100,
            },
        })

        const result = await chat.sendMessage(prompt);
        const responseText = result.response.text();

        res.send(responseText)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error"});
    }
}

export { generateResponse }