// Component containing an accordion with all members' info
import { group } from './Classes'
import MemberInfo from './MemberInfo'
import MemberNew from './MemberNew'
import { useState } from 'react'

export default function MembersInfo() {
    group.calculateShare()
    const [groupState, setGroup] = useState(group)

    let members = Object.values(groupState)
    let items = members.map(member => <MemberInfo member={member} key={member.name}/>)
    return (
        <>
            <div className="accordion">
                {items}
            </div>
            <MemberNew groupState={groupState} setState={setGroup}/>
        </>
    )
}
