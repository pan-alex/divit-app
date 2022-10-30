// "Form" that allows users to enter a new transaction
import { group } from './Classes'
import { useContext } from 'react'
import { GroupContext } from '../App'
import { Checkmark } from './Icons'

export default function TransactionNew( { member } ) {
    const [, setMembersState] = useContext(GroupContext)

    // Todo: Replace with useRef
    function handleNewTransaction(e) {
        let container = e.target.parentNode.parentNode
        let amount = container.querySelector(`.amount`).value
        let category = container.querySelector(`.category`).value
        let description = container.querySelector(`.description`).value
        let date = container.querySelector(`.date`).value// + 'T00:00' // keeps midnight local time
        group.addTransaction(member, amount, category, description, date)
        setMembersState()
    }


    return (
        <div className="newTransaction">
            <h4>New Transaction</h4>
            <div className='form-fields'>
                <div className='form-floating date'>
                    <input type="date" id={'new-date-' + member.name} name="date" className="date form-control" defaultValue={new Date().toISOString().slice(0,10)}/>
                    <label htmlFor="date">Date</label>
                </div>
                <div className='form-floating category'>
                    <input type="text" id={'new-category-' + member.name} name="category" placeholder="Category" className="category form-control" />
                    <label htmlFor="category">Category</label>
                </div>
                <div className='form-floating description'>
                    <input type="text" id={'new-description-' + member.name} name="description" placeholder="Note" className="description form-control" />
                    <label htmlFor="description">Note</label>
                </div>
                <div className='form-floating amount'>
                    <input type="text" id={'new-amount-' + member.name} className="amount form-control" name="amount" placeholder="Amount" />
                    <label htmlFor="amount">Amount</label>
                </div>
                <button id={'new-transaction-' + member.name} className="btn btn-light" onClick={handleNewTransaction}>
                    <Checkmark />
            </button>
            </div>
        </div>
    )


}