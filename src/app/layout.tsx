import { Providers } from "../components/providers"
import "./globals.css"



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script 
          src="https://cdn.databuddy.cc/databuddy.js" 
          data-client-id="FQfvRLmMlfxGg_MTSR2bw" 
          data-enable-batching="true" 
          crossOrigin="anonymous" 
          async 
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
