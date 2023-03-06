import type { NextApiRequest, NextApiResponse } from "next"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const model = new OpenAIApi(configuration)
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { question } = req.body

    const completion = await model.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
      max_tokens: 4000,
      temperature: 0,
    })
    const response = completion.data.choices[0].message

    res.status(200).json(response)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}
