// Component containing an accordion with all members' info
// Controls state for group.members
import { group } from './Classes'
import MemberInfo from './MemberInfo'
import MemberNew from './MemberNew'
import { useState } from 'react'

export default function MembersInfo() {
    group.calculateShare()
    const [membersState, setMembers] = useState(group.members)
    const memberInfo = Object.values(membersState).map(member => {
        return <MemberInfo
                member={member}
                newTransaction={e => addTransaction(e)}
                key={member.name}/>
    })

    function addMember() {
        let name = document.querySelector('#memberName').value
        let split = document.querySelector('#memberSplit').value
        group.addMember(name, split)
        setMembers(prev => { return {...prev} })
    }

    function addTransaction(e) {
        let container = e.target.parentNode
        let name = container.classList[0]
        let amount = container.querySelector(`.amount`).value
        let category = container.querySelector(`.category`).value
        let description = container.querySelector(`.description`).value
        let date = container.querySelector(`.date`).value
        group.addTransaction(group.members[name], amount, category, description, date)
        setMembers(prev => { return {...prev} })
    }


    return (
        <>
            <div className="accordion">
                { memberInfo }
            </div>
            <MemberNew handleClick={addMember} />
        </>
    )
}
