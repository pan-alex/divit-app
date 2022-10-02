// Component containing an accordion with all members' info
import { group } from './Classes'
import MemberInfo from './MemberInfo'
import MemberNew from './MemberNew'
import { useState } from 'react'

export default function MembersInfo() {
    group.calculateShare()
    const [members, setMembers] = useState(group.members)

    let membersList = Object.values(members)
    let items = membersList.map(member => <MemberInfo member={member} key={member.name}/>)
    return (
        <>
            <div className="accordion">
                {items}
            </div>
            <MemberNew groupState={members} setState={setMembers}/>
        </>
    )
}
