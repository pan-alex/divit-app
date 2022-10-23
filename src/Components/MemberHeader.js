// Component that acts as header for the member. Contains high level information about the member.
import { useState } from 'react'
import MemberMenu from "./MemberMenu"
import MemberEdit from './MemberEdit'


export default function MemberHeader( {member, handleToggleTransactionList} ) {
    const [memberEditMode, setMemberEditMode] = useState(-1)

    function toggleMemberEdit() {
        setMemberEditMode(value => value * -1) // -1 = Not edit mode; 1 = edit mode
    }

    if (memberEditMode > 0) {
        return (
            <div className='memberHeader'>
                <MemberEdit member={member} handleIsVisibleToggle={toggleMemberEdit}/>
            </div>
        )
    } else {
        return (
            <div className='memberHeader hover' style={{cursor:'pointer'}} onClick={handleToggleTransactionList}>
                <MemberHeaderInfo member={member} />
                <MemberMenu member={member} toggleMemberEdit={toggleMemberEdit} />
            </div>
        )
    }
}

function MemberHeaderInfo( {member} ) {
    return (
        <div className='memberHeaderInfo'>
            <div>
                <h3>{member.name}</h3>
            </div>
            <div className="flex-between">
                <div className="flex-column text-end">
                    <span>Contribution</span>
                    <strong className="h3">${(member.contribution).toFixed(2)}</strong>
                </div>
                <div className="flex-column text-end">
                    <span>Credit</span>
                    <strong className="h3">${(member.credit).toFixed(2)}</strong>
                </div>
            </div>
        </div>
    )
}