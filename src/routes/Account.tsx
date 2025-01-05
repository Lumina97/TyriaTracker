import { createFileRoute } from '@tanstack/react-router'
import Navbar from '../Components/NavBar/Navbar'
import AccountDataComponent from '../Components/Account/AccountDataComponent'

export const Route = createFileRoute('/account')({
  component: AccountComponent,
})

function AccountComponent() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-row">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="bg-gray-800 min-h-full p-4 rounded-lg shadow-lg">
          <AccountDataComponent />
        </div>
      </div>
    </div>
  )
}
