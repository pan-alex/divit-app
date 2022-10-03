// Component containing an accordion with all members' info
// Controls state for group.members
import { group } from './Classes'
import MemberInfo from './MemberInfo'
import MemberNew from './MemberNew'
import { useState } from 'react'

export default function MembersInfo() {
    group.calculateShare()
    const [membersState, setMembers] = useState(group.members)

    function addMember() {
        let name = document.querySelector('#memberName').value
        let split = document.querySelector('#memberSplit').value
        group.addMember(name, split)
        setMembers(prev => {
            return {...prev}
        })
    }

    return (
        <>
            <div className="accordion">
                { Object.values(membersState).map(member => <MemberInfo member={member} key={member.name}/>) }
            </div>
            <MemberNew handleClick={addMember} />
        </>
    )
}
