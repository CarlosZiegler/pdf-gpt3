import * as fs from "fs/promises"
import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import { Document } from "langchain/document"
import { Embeddings } from "langchain/embeddings"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { SupabaseVectorStore } from "langchain/vectorstores"

// Create a single supabase client for interacting with your database
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
)

async function embedDocuments(
  client: SupabaseClient,
  docs: Document[],
  embeddings: Embeddings
) {
  console.log("creating embeddings...")
  await SupabaseVectorStore.fromDocuments(client, docs, embeddings)
  console.log("embeddings successfully stored in supabase")
}
