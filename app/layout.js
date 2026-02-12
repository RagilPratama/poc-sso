import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata = {
  title: 'SSO Login dengan Clerk',
  description: 'Aplikasi Next.js dengan Clerk SSO',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="id">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
