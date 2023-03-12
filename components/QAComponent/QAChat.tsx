import React, { useCallback, useState } from "react"
import Head from "next/head"
import { cn } from "@/providers/utils"
import { Group, Button as MantineButton, TextInput } from "@mantine/core"
import {
  SpotlightProvider,
  spotlight,
  type SpotlightAction,
} from "@mantine/spotlight"
import {
  IconDashboard,
  IconFileText,
  IconHome,
  IconSearch,
} from "@tabler/icons-react"
import { Bot, Loader2, Send, User } from "lucide-react"
import md from "markdown-it"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"

const DEFAULT_QUESTION = ""

export function QAChat() {
  const [question, setQuestion] = useState(DEFAULT_QUESTION)

  const [isAsking, setIsAsking] = useState(false)
  const [chatHistory, setChatHistory] = useState<any>([
    {
      from: "bot",
      content: "Hi have all content of www.prea.eu, how can I help you?",
    },
  ])

  const handleQueryChange = (e) => {
    setQuestion(e.target.value)
  }

  const handleSubmit = useCallback(async () => {
    if (!question) {
      return
    }
    setIsAsking(true)
    setQuestion("")
    setChatHistory([
      ...chatHistory,
      {
        role: "user",
        content: question,
      },
    ])

    const response = await fetch("/api/chat", {
      body: JSON.stringify({
        question,
        chatHistory,
        namespace: "prea-website",
      }),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    })
    const answer = await response.json()

    if (answer.text) {
      setChatHistory((currentChatHistory) => [
        ...currentChatHistory,
        {
          from: "bot",
          content: answer.text,
        },
      ])
    }
    if (answer.error) {
      console.error(answer.error)
    }

    setIsAsking(false)
  }, [question, chatHistory])

  return (
    <section className="container flex justify-items-stretch gap-6 pt-6 pb-8 md:py-10">
      <div className="flex grow flex-col items-start gap-2">
        <div
          style={{
            width: "100%",
          }}
        >
          <div className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex  flex-col space-y-4 overflow-y-auto rounded border border-gray-400 p-4">
            {chatHistory.map((chat, index) => {
              return (
                <div className="chat-message" key={index}>
                  <div
                    className={cn(
                      "flex",
                      "items-end",
                      chat.role === "assistant" && "justify-end"
                    )}
                  >
                    <div
                      className={cn(
                        "order-2 mx-2 flex max-w-xs flex-col items-start space-y-2 text-xs",
                        chat.role === "assistant" && "order-1"
                      )}
                    >
                      <div>
                        <span
                          className={cn(
                            "scrolling-auto overflow-auto inline-block rounded-lg bg-gray-300 px-4 py-2 text-gray-600",
                            chat.role === "user" &&
                              "rounded-bl-none bg-gray-300 text-gray-600",
                            chat.role === "assistant" &&
                              "rounded-br-none bg-blue-600 text-white"
                          )}
                        >
                          {chat.content}
                        </span>
                      </div>
                    </div>
                    {chat.role === "user" ? (
                      <User className="order-1 h-4 w-4" />
                    ) : (
                      <Bot className="order-1 h-4 w-4" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <form>
            <div className="mb-2 pt-4 sm:mb-0">
              <div className="relative flex">
                <TextInput
                  icon={<User className="order-1 h-4 w-4" />}
                  type="text"
                  value={question}
                  placeholder={DEFAULT_QUESTION}
                  onChange={handleQueryChange}
                />
                <div className="items-center sm:flex">
                  <Button
                    onClick={handleSubmit}
                    disabled={!question}
                    type="submit"
                  >
                    {!isAsking ? (
                      <Send className="h-4 w-4" />
                    ) : (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
