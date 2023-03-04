import type { NextApiRequest, NextApiResponse } from "next"
import { getResponseFromChain } from "@/providers/chain.provider"
import { createDocumentsFromUrl } from "@/providers/document.provider"
import { getVectorFromPineconeStore } from "@/providers/pinecone.provider"
import { GitbookLoader } from "langchain/document_loaders"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { question, chatHistory } = req.body

  const vectorStore = await getVectorFromPineconeStore()
  const response = await getResponseFromChain(
    vectorStore,
    question,
    chatHistory
  )

  res.status(200).json(response)
}
