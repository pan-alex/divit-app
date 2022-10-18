// Component containing an accordion with all members' info
// Controls state for group.members
import { group } from './Classes'
import MemberInfo from './MemberInfo'
// import MemberNew from './MemberNew'
// import { useState } from 'react'
import { useContext } from 'react'
import { GroupContext } from '../App'

export default function MembersInfo() {
    const [, setMembersState] = useContext(GroupContext)
    const memberInfo = group.members.map(member => {
        return (
            <MemberInfo
                member={member}
                key={member.id}
            />
        )
    })

    function handleNewMember() {
        group.addMember('AAA')
        setMembersState()
    }

    return (
        <>
            <div>
                { memberInfo }
            </div>
            <section className="newMember">
                <button arial-label='Add new member' onClick={handleNewMember}>+</button>
            </section>
        </>
    )
}
