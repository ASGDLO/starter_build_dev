import { Metadata } from "next"
import FundPageClient from "./FundPageClient"

export const metadata: Metadata = {
  title: "Our Fund | crypto-build.com",
  description: "Learn about our cryptocurrency fund and how it can help you achieve your financial goals.",
}

export default function FundPage() {
  return <FundPageClient />
}