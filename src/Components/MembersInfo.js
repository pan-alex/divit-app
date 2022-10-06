// Component containing an accordion with all members' info
// Controls state for group.members
import { group } from './Classes'
import MemberInfo from './MemberInfo'
import MemberNew from './MemberNew'
import { useState } from 'react'

export default function MembersInfo() {
    group.calculateShare()
    const [membersState, setMembers] = useState(group.members)

    function updateMembersState() {
        setMembers(prev => { return {...prev} })
    }

    const memberInfo = Object.values(membersState).map(member => {
        return <MemberInfo
                member={member}
                setMembersState={updateMembersState}
                key={member.name}/>
    })

    function addMember() {
        let name = document.querySelector('#memberName').value
        let split = document.querySelector('#memberSplit').value
        group.addMember(name, split)
        updateMembersState()
    }


    return (
        <>
            <div className="accordion">
                { memberInfo }
            </div>
            <MemberNew handleNewMember={addMember} />
        </>
    )
}
