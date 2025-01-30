import { X } from "lucide-react"

function UserList({ users, selectedUsers, onAddUser, onRemoveUser, loading, error }) {
  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>
  }

  return (
    <div className="space-y-4">
      {selectedUsers.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Selected Candidates</h3>
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded">
                <span className="text-sm">{user.name}</span>
                <button onClick={() => onRemoveUser(user.id)} className="text-gray-500 hover:text-gray-700">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      <h3 className="font-medium mb-2">Recommended Users</h3>
      {users
        .filter((user) => !selectedUsers.find((u) => u.id === user.id))
        .map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <span className="flex-grow text-sm">{user.name}</span>
            <button
              className="text-gray-600 hover:text-gray-900 px-2 py-1 rounded hover:bg-gray-100"
              onClick={() => onAddUser(user)}
            >
              +
            </button>
          </div>
        ))}
    </div>
  )
}

export default UserList

