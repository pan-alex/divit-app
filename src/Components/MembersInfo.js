// Component containing an accordion with all members' info
// Controls state for group.members
import { group } from './Classes'
import MemberInfo from './MemberInfo'
import MemberNew from './MemberNew'
// import { useState } from 'react'


export default function MembersInfo( {setMembersState} ) {
    const memberInfo = group.members.map(member => {
        return (
            <MemberInfo
                member={member}
                setMembersState={setMembersState}
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
            <div className="accordion">
                { memberInfo }
            </div>
            <section className="newMember">
                {/* <IconButton icon='+'/> */}
                <button arial-label='Add new member' onClick={handleNewMember}>+</button>
            </section>

            {/* <MemberNew setMembersState={setMembersState} /> */}
        </>
    )
}
