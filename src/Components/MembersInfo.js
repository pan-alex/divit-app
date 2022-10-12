// Component containing an accordion with all members' info
// Controls state for group.members
import { group } from './Classes'
import MemberInfo from './MemberInfo'
import MemberNew from './MemberNew'
import { useState } from 'react'

export default function MembersInfo( {setMembersState} ) {
    const memberInfo = group.members.map(member => {
        return (
            <MemberInfo
                member={member}
                setMembersState={setMembersState}
                key={member.name}
            />
        )
    })


    return (
        <>
            <div className="accordion">
                { memberInfo }
            </div>
            <MemberNew setMembersState={setMembersState} />
        </>
    )
}
