import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config()

const configuration = new GoogleGenerativeAI(process.env.API_KEY || "")

const modelId = "gemini-pro";
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
        const response = await result.response;
        const responseText = response.text();
        console.log("respon =", response.text())

        res.send(responseText)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error"});
    }
}

export { generateResponse }