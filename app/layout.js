import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

export const metadata = {
  title: 'Dashboard Data Indonesia',
  description: 'Aplikasi Dashboard dengan Peta Indonesia',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="id">
        <head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""
          />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
