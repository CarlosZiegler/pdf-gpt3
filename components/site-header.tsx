import Link from "next/link"
import { Button, Text, TextInput } from "@mantine/core"
import { modals } from "@mantine/modals"
import { SpotlightProvider, spotlight } from "@mantine/spotlight"
import { IconSearch } from "@tabler/icons-react"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { QAChat } from "./QAComponent"

export function SiteHeader() {
  const openModal = () =>
    modals.open({
      title: "Q&A Chat",
      children: <QAChat />,
    })
  return (
    <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <TextInput
            icon={<IconSearch size="1.2rem" />}
            placeholder="Search [ ⌘ + K ]"
            id="searchInput"
            onClick={openModal}
            value=""
            readOnly
            styles={{
              input: {
                cursor: "pointer",
              },
            }}
          />
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
