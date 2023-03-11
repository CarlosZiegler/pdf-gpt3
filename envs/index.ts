import { z } from "zod"

export const formatErrors = <T>(
  /** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
  errors: Record<string, any>
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${(value._errors as any).join(", ")}\n`
    })
    .filter(Boolean)

export const serverSchema = z.object({
  // DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production"]),
  PINECONE_API_KEY: z.string(),
  PINECONE_NEW_API_KEY: z.string(),
  OPENAI_API_KEY: z.string(),
})

const _serverEnv = serverSchema.safeParse(process.env)

if (!_serverEnv.success) {
  console.error("❌ Invalid environment variables:\n")
  throw new Error("Invalid environment variables")
}

for (let key of Object.keys(_serverEnv.data)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    console.warn("❌ You are exposing a server-side env-variable:", key)

    throw new Error("You are exposing a server-side env-variable")
  }
}

export const envs = { ..._serverEnv.data }
