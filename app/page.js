import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import IndonesiaMap from './components/IndonesiaMap'

export default async function Home() {
  const user = await currentUser()

  return (
    <main className="container">
      <div className="header">
        <h1>Selamat Datang, {user?.firstName || 'Widya Utami'} !</h1>
        <div className="header-actions">
          <UserButton />
        </div>
      </div>

      <IndonesiaMap />
    </main>
  )
}
