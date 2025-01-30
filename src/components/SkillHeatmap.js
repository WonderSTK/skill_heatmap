import { useState, useEffect } from "react"

function SkillHeatmap({ selectedUsers }) {
  const [uniqueSkills, setUniqueSkills] = useState([])

  useEffect(() => {
    if (selectedUsers.length > 0) {
      const allSkills = new Set()
      selectedUsers.forEach((user) => {
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
        return "bg-gray-100"
      case 1:
        return "bg-green-200"
      case 2:
        return "bg-green-300"
      case 3:
        return "bg-green-400"
      case 4:
        return "bg-black"
      default:
        return "bg-gray-100"
    }
  }

  const getSkillScore = (user, skillName) => {
    const skillset = user.data?.data?.skillset || []
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

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join(".")
      .toUpperCase()
  }

  if (selectedUsers.length === 0) {
    return <div className="text-center py-12 text-gray-500">Select candidates to compare their skills</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="p-1 text-left text-xs font-medium text-gray-500">Skill / User</th>
            {selectedUsers.map((user) => (
              <th key={user.id} className="p-1 text-center text-xs font-medium text-gray-500">
                <span className="inline-block" title={user.name || "Unknown"}>
                  {getInitials(user.name || "Unknown")}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueSkills.map((skill) => (
            <tr key={skill}>
              <td className="p-1 text-xs text-gray-500">{skill}</td>
              {selectedUsers.map((user) => {
                const score = getSkillScore(user, skill)
                const colorClass = getScoreColor(score)
                return (
                  <td key={`${user.id}-${skill}`} className="p-0">
                    <div className={`w-4 h-4 ${colorClass}`} title={`${user.name}: ${skill} - Score: ${score}`} />
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

