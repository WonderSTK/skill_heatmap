import { useState, useEffect } from "react"
import axios from "axios"
import UserList from "./components/UserList"
import SkillHeatmap from "./components/SkillHeatmap"

function App() {
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get("https://forinterview.onrender.com/people")
      const usersWithData = await Promise.all(
        response.data.map(async (user) => {
          try {
            const detailResponse = await axios.get(`https://forinterview.onrender.com/people/${user.id}`)
            return {
              ...user,
              data: detailResponse.data.data, // Note: we're accessing data.data here
            }
          } catch (error) {
            console.error(`Error fetching details for user ${user.id}:`, error)
            return {
              ...user,
              data: { data: { skillset: [] } },
            }
          }
        }),
      )
      setUsers(usersWithData)
      console.log("Final combined data:", usersWithData)
    } catch (error) {
      console.error("Error fetching users:", error)
      setError("An error occurred while fetching user data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAddUser = (user) => {
    if (!selectedUsers.find((u) => u.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user])
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button className="text-gray-600 hover:text-gray-900">← Back to My Jobs</button>
            <h1 className="text-xl font-medium ml-4">Posk_UXdesigner_sr001</h1>
            <span className="ml-auto text-gray-600">{users.length} Candidates</span>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="w-72 flex-shrink-0">
            <div className="bg-gray-50 rounded-lg p-4">
              <h2 className="font-medium mb-4">Most recommended</h2>
              <UserList users={users} onAddUser={handleAddUser} loading={loading} error={error} />
            </div>
          </div>
          <div className="flex-grow">
            <div className="flex gap-2 mb-4">
              <button className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">Compare View</button>
              <button className="px-4 py-2 border rounded hover:bg-gray-50">Individual view</button>
              <button className="px-4 py-2 border rounded hover:bg-gray-50">Shortlisted candidates</button>
            </div>
            <SkillHeatmap selectedUsers={selectedUsers} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

