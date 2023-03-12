import { PineconeClient } from "@pinecone-database/pinecone"
import { Document } from "langchain/document"
import { OpenAIEmbeddings } from "langchain/embeddings"
import { PineconeStore } from "langchain/vectorstores"

import { envs } from "../envs"

const PINECONE_INDEX_NAME = "data-gpt"
const SMART_DOCU_INDEX_NAME = "smart-docus"

export const storeDocsInPineconeStore = async (
  docs: Document[],
  namespace?: string
) => {
  const pinecone = new PineconeClient()

  await pinecone.init({
    environment: namespace ? "us-east-1-aws" : "us-east1-gcp",
    apiKey: namespace ? envs.PINECONE_NEW_API_KEY : envs.PINECONE_API_KEY,
  })

  const index = pinecone.Index(
    namespace ? SMART_DOCU_INDEX_NAME : PINECONE_INDEX_NAME
  )
  await PineconeStore.fromDocuments(
    index,
    docs,
    new OpenAIEmbeddings({
      openAIApiKey: envs.OPENAI_API_KEY,
    }),
    "text",
    namespace // namespace to separate documents
  )
}
export const getVectorFromPineconeStore = async (namespace?: string) => {
  const pinecone = new PineconeClient()

  await pinecone.init({
    environment: namespace ? "us-east-1-aws" : "us-east1-gcp",
    apiKey: namespace ? envs.PINECONE_NEW_API_KEY : envs.PINECONE_API_KEY,
  })

  const index = pinecone.Index(
    namespace ? SMART_DOCU_INDEX_NAME : PINECONE_INDEX_NAME
  )
  const vectorStore = await PineconeStore.fromExistingIndex(
    index,
    new OpenAIEmbeddings({
      openAIApiKey: envs.OPENAI_API_KEY,
    }),
    "text",
    namespace // namespace to get specific documents
  )

  return vectorStore
}
