// "Form" that allows users to enter a new transaction
import { group } from './Classes'
import { useContext, useRef } from 'react'
import { GroupContext } from '../App'
import { Checkmark } from './Icons'

export default function TransactionNew( { member } ) {
    const [, setMembersState] = useContext(GroupContext)

    const date = useRef()
    const category = useRef()
    const description = useRef()
    const amount = useRef()

    function handleNewTransaction() {
        group.addTransaction(
            member,
            amount.current.value,
            category.current.value,
            description.current.value,
            date.current.value
        )
        setMembersState()
    }


    return (
        <div className="newTransaction">
            <h4>New Transaction</h4>
            <div className='form-fields'>
                <div className='form-floating date'>
                    <input type="date" id={'new-date-' + member.name} ref={date} name="date" className="date form-control" defaultValue={new Date().toISOString().slice(0,10)}/>
                    <label htmlFor="date">Date</label>
                </div>
                <div className='form-floating category'>
                    <input type="text" id={'new-category-' + member.name}  ref={category} name="category" placeholder="Category" className="category form-control" />
                    <label htmlFor="category">Category</label>
                </div>
                <div className='form-floating description'>
                    <input type="text" id={'new-description-' + member.name} ref={description} name="description" placeholder="Note" className="description form-control" />
                    <label htmlFor="description">Note</label>
                </div>
                <div className='form-floating amount'>
                    <input type="text" id={'new-amount-' + member.name}  ref={amount} className="amount form-control" name="amount" placeholder="Amount" />
                    <label htmlFor="amount">Amount</label>
                </div>
                <button id={'new-transaction-' + member.name} className="btn btn-light" onClick={handleNewTransaction}>
                    <Checkmark />
            </button>
            </div>
        </div>
    )


}