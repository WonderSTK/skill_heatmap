function UserList({ users, onAddUser, loading, error }) {
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
        {users.map((user) => (
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
  
  