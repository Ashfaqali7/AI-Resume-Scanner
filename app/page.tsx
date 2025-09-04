import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import ResumeScanner from "./scanner/page"
import { redirect } from "next/navigation"

export default async function ResumeScannerPage() {
    const session = await getServerSession(authOptions)

    if (!session) redirect("/auth/login")

    return <ResumeScanner />
}
