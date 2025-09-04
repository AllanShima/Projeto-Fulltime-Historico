import React from 'react'

const PriorityLevel = ({level}) => {
    const divColorClass = 
        level === "LOW" ? "bg-green-200 text-green-800": 
        level === "MEDIUM" ? "bg-yellow-200 text-yellow-800": 
        level === "HIGH" ? "bg-orange-200 text-orange-800" : 
        "bg-red-200 text-red-800";
    return (
        <div className={`rounded-md p-2 ${divColorClass}`}>
            <h3>{level}</h3>
        </div>
    )
}

export default PriorityLevel
