import type { NextApiRequest, NextApiResponse, PageConfig } from "next"
import { createDocuments } from "@/providers/document.provider"
import { getFileText } from "@/providers/formidable"
import { storeDocsInPineconeStore } from "@/providers/pinecone.provider"
import { z } from "zod"

const ingestSchema = z.object({
  namespace: z.string().optional(),
})

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { namespace } = await ingestSchema.parseAsync(req.headers)
  const fileText = await getFileText(req)
  const docs = await createDocuments(fileText)
  await storeDocsInPineconeStore(docs, namespace)
  console.log("Ingested", docs.length, "documents")
  res.status(200).json({
    message: "Success",
  })
}

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

export default handler
