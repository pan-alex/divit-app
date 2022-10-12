// Menu with fields to create a new member
import { group } from './Classes'
import { useRef } from 'react'

export default function MemberNew( {setMembersState} ) {

    const memberName = useRef();
    const memberSplit = useRef();

    function handleNewMember() {
        group.addMember(memberName.current.value, memberSplit.current.value);
        setMembersState()
    }

    return (
        <section>
            <h2>Create a new Person</h2>
            <div className="container-lg flex-form">
                <div  className='form-floating'>
                    <input type="text" ref={memberName} id="newMemberName" className="form-control" name="memberName" placeholder="name" />
                    <label htmlFor="newMemberName">Name</label>
                </div>
                <div className='form-floating'>
                <input type="text" ref={memberSplit} id="newMemberSplit" name="personSplit" placeholder="percent" className="form-control" />
                    <label htmlFor="newMemberSplit">Percent</label>
                </div>
                <button id="btnMemberNew" className="btn btn-secondary" onClick={handleNewMember}>
                    Add Member
                </button>
            </div>
        </section>
    )
}