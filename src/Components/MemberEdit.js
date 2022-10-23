// Component that, when visible, allows users to update a member's info or delete the member.
import { group } from './Classes'
import { useRef, useContext } from 'react'
import { GroupContext } from '../App'
import {Checkmark, Crossmark} from './Icons'

export default function MemberEdit( {member, handleIsVisibleToggle} ) {
    const [, setMembersState] = useContext(GroupContext)
    const memberName = useRef();
    const memberSplit = useRef();

    function handleEditMember() {
        group.updateMember(member, memberName.current.value, memberSplit.current.value);
        setMembersState()
        handleIsVisibleToggle()
    }


    return (
        <>
            <div className="container-lg memberEdit">
                <div  className='form-floating'>
                    <input type="text" ref={memberName} className="form-control" name="memberName" placeholder={member.name} />
                    <label htmlFor="memberName">Name</label>
                </div>
                <div className='form-floating'>
                   <input type="text" ref={memberSplit} name="personSplit" placeholder="percent" className="form-control" />
                    <label htmlFor="memberSplit">Percent</label>
                </div>
                <div className='flex-center'>
                <button className="btn btn-light" onClick={handleEditMember}>
                    <Checkmark />
                </button>
                <button className="btn btn-light" onClick={handleIsVisibleToggle}>
                    <Crossmark />
                </button>
                </div>
            </div>
        </>
    )
}
