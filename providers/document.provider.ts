import { Document } from "langchain/document"
import {
  CSVLoader,
  CheerioWebBaseLoader,
  DirectoryLoader,
  GitbookLoader,
  JSONLoader,
  PDFLoader,
  TextLoader,
} from "langchain/document_loaders"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

export const createDocuments = async (fileText: string) => {
  const rawDocs = new Document({ pageContent: fileText })
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000,
    chunkOverlap: 200,
  })
  const docs = await textSplitter.splitDocuments([rawDocs])

  return docs
}

export const createDocumentsFromUrl = async (url: string) => {
  const loader = new CheerioWebBaseLoader(url)
  const docs = await loader.load()
  return docs
}
export const createDocumentsFromJsonFile = async (url: string) => {
  const loader = new JSONLoader(
    "src/document_loaders/example_data/example.json",
    "/texts"
  )
  const docs = await loader.load()
  return docs
}
export const createDocumentsFromCSVFile = async (url: string) => {
  // id,text
  //1,This is a sentence.
  //2,This is another sentence.

  const loader = new CSVLoader(
    "src/document_loaders/example_data/example.csv",
    "text"
  )
  const docs = await loader.load()
  return docs
}
export const createDocumentsFromPDFFile = async (url: string) => {
  const loader = new PDFLoader("src/document_loaders/example_data/example.pdf")
  const docs = await loader.load()
  return docs
}
export const createDocumentsFromTxtFile = async (url: string) => {
  const loader = new TextLoader("src/document_loaders/example_data/example.txt")
  const docs = await loader.load()
  return docs
}
export const createDocumentsFromDirectory = async (url: string) => {
  const loader = new DirectoryLoader(
    "src/document_loaders/example_data/example",
    {
      ".json": (path) => new JSONLoader(path, "/texts"),
      ".txt": (path) => new TextLoader(path),
      ".csv": (path) => new CSVLoader(path, "text"),
    }
  )
  const docs = await loader.load()
  return docs
}
export const createDocumentsFromGitBook = async (url: string) => {
  const loader = new GitbookLoader(url, {
    shouldLoadAllPaths: true,
  })
  const docs = await loader.load()
  return docs
}
