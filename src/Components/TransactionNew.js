// "Form" that allows users to enter a new transaction
import { group } from './Classes'

export default function TransactionNew( {member, setMembersState} ) {

    function handleNewTransaction(e) {
        let container = e.target.parentNode.parentNode
        let amount = container.querySelector(`.amount`).value
        let category = container.querySelector(`.category`).value
        let description = container.querySelector(`.description`).value
        let date = container.querySelector(`.date`).value + 'T00:00' // keeps midnight local time
        group.addTransaction(member, amount, category, description, date)
        setMembersState()
    }


    return (
        <>
            <div className="tr table table-primary newTransaction">
                <div className='td form-floating'>
                    <input type="date" id={'new-date-' + member.name} name="date" className="date form-control" defaultValue={new Date().toISOString().slice(0,10)}/>
                    <label htmlFor="date">Date</label>
                </div>
                <div className='td form-floating'>
                    <input type="text" id={'new-category-' + member.name} name="category" placeholder="Category" className="category form-control" />
                    <label htmlFor="category">Category</label>
                </div>
                <div className='td form-floating'>
                    <input type="text" id={'new-description-' + member.name} name="description" placeholder="Description" className="description form-control" />
                    <label htmlFor="description">Description</label>
                </div>
                <div className='td form-floating'>
                    <input type="text" id={'new-amount-' + member.name} className="amount form-control" name="amount" placeholder="Amount" />
                    <label htmlFor="amount">Amount</label>
                </div>
                <div className='tr'>
                    <button id={'new-transaction-' + member.name} className="btn btn-outline-primary" onClick={handleNewTransaction}>
                            Add
                    </button>
                </div>
            </div>
        </>
    )


}