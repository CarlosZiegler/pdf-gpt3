import type { NextApiRequest, NextApiResponse, PageConfig } from "next"
import { createDocuments } from "@/providers/document.provider"
import { getFileText } from "@/providers/formidable"
import { storeDocsInPineconeStore } from "@/providers/pinecone.provider"

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const fileText = await getFileText(req)
  const docs = await createDocuments(fileText)
  await storeDocsInPineconeStore(docs)

  res.status(200).json({})
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

export default handler
