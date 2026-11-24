import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://decodex-portfolio.vercel.app'),
  title: 'DecodeX | Vaibhav Aryan - Software Engineer',
  description:
    'Portfolio of Vaibhav Aryan (DecodeX) — Software Engineer Intern at Money Forward, Google Summer of Code (GSoC) 2026 Contributor at AOSSIE, and B.Tech student at IIT (ISM) Dhanbad.',
  keywords: [
    'Vaibhav Aryan',
    'DecodeX',
    'Software Engineer',
    'Full Stack Developer',
    'IIT ISM Dhanbad',
    'Money Forward',
    'GSoC 2026',
    'Competitive Programming',
    'Distributed Systems',
  ],
  authors: [{ name: 'Vaibhav Aryan' }],
  openGraph: {
    title: 'DecodeX | Vaibhav Aryan - Software Engineer',
    description:
      'Software Engineer Intern at Money Forward, GSoC 2026 Contributor at AOSSIE, IIT (ISM) Dhanbad.',
    type: 'website',
    images: ['/profile.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-[#06080d] text-slate-100 antialiased selection:bg-blue-500/25 selection:text-white`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
