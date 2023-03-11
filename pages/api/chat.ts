import type { NextApiRequest, NextApiResponse } from "next"
import { getResponseFromChain } from "@/providers/chain.provider"
import { getVectorFromPineconeStore } from "@/providers/pinecone.provider"
import { z } from "zod"

const chatSchema = z.object({
  namespace: z.string().optional(),
  question: z.string(),
  // chatHistory: z.array(z.string()).optional(),
  chatHistory: z.any(),
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question, chatHistory, namespace } = await chatSchema.parseAsync(
    req.body
  )

  const vectorStore = await getVectorFromPineconeStore(namespace)
  const response = await getResponseFromChain(
    vectorStore,
    question,
    chatHistory
  )

  res.status(200).json(response)
}
