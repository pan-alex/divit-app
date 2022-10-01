// Menu with fields to create a new member
import { group } from './Classes'

export default function MemberNew( {groupState, setState}) {
    function handleClick() {
        let name = document.querySelector('#memberName').value
        let split = document.querySelector('#memberSplit').value
        group.addPerson(name, split)
        setState(prev => {
            return {...prev}
        })
    }

    return (
        <section>
            <h2>Create a new Person</h2>
            <form className="container-lg flex-form">
                <div  className='form-floating'>
                    <input type="text" id="memberName" className="form-control " name="memberName" placeholder="name" />
                    <label htmlFor="memberName">Name</label>
                </div>
                <div className='form-floating'>
                <input type="text" id="memberSplit" name="personSplit" placeholder="percent" className="form-control" />
                    <label htmlFor="memberSplit">Percent</label>
                </div>
                <button id="btnMemberNew" className="btn btn-primary" onClick={handleClick}>
                    Add Member
                    </button>
            </form>
        </section>
    )
}