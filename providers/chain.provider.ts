import { ChatVectorDBQAChain } from "langchain/chains"
import { OpenAIChat } from "langchain/llms"
import { PineconeStore } from "langchain/vectorstores"

import { envs } from "../envs"

export const getResponseFromChain = async (
  vectorStore: PineconeStore,
  question: string,
  chatHistory?: string[]
) => {
  const model = new OpenAIChat({
    openAIApiKey: envs.OPENAI_API_KEY,
  })

  const chain = ChatVectorDBQAChain.fromLLM(model, vectorStore)
  const response = await chain.call({
    question,
    max_tokens: 1000, // todo: pick up a sensible value
    temperature: 0,
    chat_history: chatHistory || [],
  })

  return response
}
