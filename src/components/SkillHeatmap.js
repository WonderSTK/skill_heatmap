import { useState, useEffect } from "react"

function SkillHeatmap({ selectedUsers }) {
  const [uniqueSkills, setUniqueSkills] = useState([])

  useEffect(() => {
    if (selectedUsers.length > 0) {
      const allSkills = new Set()
      selectedUsers.forEach((user) => {
        // Correctly traverse the nested structure to get all skills
        const skillset = user.data?.data?.skillset || []
        skillset.forEach((category) => {
          const skills = category.skills || []
          skills.forEach((skill) => {
            if (skill.name) {
              allSkills.add(skill.name)
            }
          })
        })
      })
      setUniqueSkills(Array.from(allSkills))
    }
  }, [selectedUsers])

  const getScoreColor = (score) => {
    switch (Number(score)) {
      case 0:
        return "bg-white"
      case 1:
        return "bg-yellow-100"
      case 2:
        return "bg-green-500"
      case 3:
        return "bg-red-500"
      case 4:
        return "bg-black"
      default:
        return "bg-gray-100"
    }
  }

  const getSkillScore = (user, skillName) => {
    const skillset = user.data?.data?.skillset || []
    // Search through all categories and their skills
    for (const category of skillset) {
      const skills = category.skills || []
      for (const skill of skills) {
        if (skill.name === skillName && skill.pos?.[0]?.consensus_score !== undefined) {
          return skill.pos[0].consensus_score
        }
      }
    }
    return -1
  }

  if (selectedUsers.length === 0) {
    return <div className="text-center py-12 text-gray-500">Select candidates to compare their skills</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="w-48 p-2 text-left text-sm font-medium text-gray-600">Skill / User</th>
            {selectedUsers.map((user) => (
              <th key={user.id} className="p-2 text-center text-sm font-medium text-gray-600">
                {user.name || "Unknown"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueSkills.map((skill) => (
            <tr key={skill}>
              <td className="p-2 text-sm text-gray-600">{skill}</td>
              {selectedUsers.map((user) => {
                const score = getSkillScore(user, skill)
                const colorClass = getScoreColor(score)
                return (
                  <td key={`${user.id}-${skill}`} className="p-2">
                    <div
                      className={`w-8 h-8 mx-auto ${colorClass} border border-gray-200 flex items-center justify-center ${score === 4 ? "text-white" : "text-black"}`}
                      title={`Score: ${score}`}
                    >
                      {score >= 0 ? score : "-"}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SkillHeatmap

