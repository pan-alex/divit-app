// Menu with fields to create a new member
import { group } from './Classes'

export default function MemberNew( {handleNewMember}) {
    return (
        <section>
            <h2>Create a new Person</h2>
            <div className="container-lg flex-form">
                <div  className='form-floating'>
                    <input type="text" id="memberName" className="form-control" name="memberName" placeholder="name" />
                    <label htmlFor="memberName">Name</label>
                </div>
                <div className='form-floating'>
                <input type="text" id="memberSplit" name="personSplit" placeholder="percent" className="form-control" />
                    <label htmlFor="memberSplit">Percent</label>
                </div>
                <button id="btnMemberNew" className="btn btn-primary" onClick={handleNewMember}>
                    Add Member
                    </button>
            </div>
        </section>
    )
}