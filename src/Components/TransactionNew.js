// "Form" that allows users to enter a new transaction
import { group } from './Classes'

export default function TransactionNew( {member, updateState} ) {

    function handleNewTransaction(e) {
        console.log(`member is ${member.name}`)
        let container = e.target.parentNode
        let amount = container.querySelector(`.amount`).value
        let category = container.querySelector(`.category`).value
        let description = container.querySelector(`.description`).value
        let date = container.querySelector(`.date`).value
        group.addTransaction(member, amount, category, description, date)
        updateState()
    }


    return (
        <>
            <div className={member.name + " container-lg newTransaction"}>
                <div  className='form-floating'>
                    <input type="text" id={'new-amount-' + member.name} className="amount form-control" name="amount" placeholder="Amount" />
                    <label htmlFor="amount">Amount</label>
                </div>
                <div className='form-floating'>
                    <input type="text" id={'new-category-' + member.name} name="category" placeholder="Category" className="category form-control" />
                    <label htmlFor="memberSplit">Category</label>
                </div>
                <div className='form-floating'>
                    <input type="text" id={'new-description-' + member.name} name="description" placeholder="Description" className="description form-control" />
                    <label htmlFor="memberSplit">Description</label>
                </div>
                <div className='form-floating'>
                    <input type="date" id={'new-date-' + member.name} name="date" className="date form-control" defaultValue={new Date().toISOString().slice(0,10)}/>
                    <label htmlFor="memberSplit">Date</label>
                </div>
                <button id={'new-transaction-' + member.name} className="btn btn-primary" onClick={handleNewTransaction}>
                    Add
                    </button>
            </div>
        </>
    )


}