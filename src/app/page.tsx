import { cn } from "@/lib/utils"
import { Layout } from "@/components/layout/Layout"
import { TypingTest } from "@/components/typing-test/TypingTest"

// Sample text for typing test
const sampleText = "The quick brown fox jumps over the lazy dog. Programming is the process of creating a set of instructions that tell a computer how to perform a task. Programming can be done using a variety of computer programming languages, such as JavaScript, Python, and C++."

export default function Home() {
  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16">
        <h1
          className={cn(
            "inline-flex tracking-tight flex-col gap-1 transition text-center",
            "font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-none",
            "bg-gradient-to-r from-20% bg-clip-text text-transparent",
            "from-emerald-400 to-emerald-600"
          )}
        >
          <span>HaltType</span>
        </h1>

        <p className="text-zinc-400 text-lg/7 md:text-xl/8 text-pretty sm:text-wrap sm:text-center text-center mb-4">
          Test your typing speed and accuracy with our minimalist typing test.
        </p>

        <TypingTest content={sampleText} />
      </div>
    </Layout>
  )
}
