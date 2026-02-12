import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'

export default async function Home() {
  const user = await currentUser()

  return (
    <main className="container">
      <div className="header">
        <h1>Selamat Datang, {user?.firstName || 'User'}!</h1>
        <div className="header-actions">
          <UserButton />
        </div>
      </div>
      <div className="content">
        <p>Anda berhasil login menggunakan Clerk SSO.</p>
        <p>Email: {user?.emailAddresses[0]?.emailAddress}</p>
      </div>
    </main>
  )
}
