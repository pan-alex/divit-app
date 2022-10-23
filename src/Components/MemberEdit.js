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
        try {
            group.updateMember(member, memberName.current.value, memberSplit.current.value);
            setMembersState()
            handleIsVisibleToggle()
        } catch {
            alert(`The name ${memberName.current.value} is already in use.`)
        }
    }


    return (
        <>
            <div className="container-lg memberEdit">
                <div className='mb-3 row'>
                    <label className='col-form-label col-sm-2' htmlFor="memberName">Name</label>
                    <div className='col-sm-10'>
                        <input type="text" className="form-control" ref={memberName} name="memberName" placeholder={member.name} autoFocus/>
                    </div>
                </div>
                <div className='mb-3 row'>
                    <label className='col-form-label col-sm-2' htmlFor="memberSplit">Split</label>
                    <div className='col-sm-10'>
                        <input type="text" className="form-control" ref={memberSplit} name="personSplit" placeholder={member.split} />
                    </div>
                </div>
                <div className='flex-center'>
                <button className="btn btn-light" onClick={handleEditMember} aria-label='Save Changes'>
                    <Checkmark />
                </button>
                <button className="btn btn-light" onClick={handleIsVisibleToggle} aria-label='Cancel'>
                    <Crossmark />
                </button>
                </div>
            </div>
        </>
    )
}
