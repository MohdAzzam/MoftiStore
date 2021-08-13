import { useEffect, useState } from "react"

/**
 * 
 * @param {String} name 
 * @param {String} label 
 * @param {String} activeTab 
 * @param {*} onClick 
 * @returns 
 */
export default function Tab({
    name,
    label,
    activeTab,
    onClick
}) {

    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(activeTab === name);
    }, [activeTab, name])

    return (
        <p className={isActive ? "user-tab active" : "user-tab"} onClick={() => onClick(name)} >{label}</p>
    )
}