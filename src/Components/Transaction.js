// Component that renders a table row containing a single transaction
import { group } from "./Classes"
import { useState } from 'react'

export default function Transaction( {member, transaction, setMembersState} ) {
    let [edit, setEdit] = useState(false)

    if (!edit) {
        return (
            <tr onClick={() => setEdit(true)}>
                <TransactionNoEdit transaction={transaction}/>
            </tr>
        )
    } else {
        return (
            <TransactionEdit member={member} transaction={transaction} setMembersState={setMembersState} setEditState={setEdit}/>
        )
    }
}


function TransactionNoEdit( {transaction} ) {
    let date = new Date(transaction.date).toString().slice(4, 15).split(' ')
    date[1] = Number(date[1]) + ',' //Remove leading 0 and add ','
    date = date.join(' ')

    return (
        <>
            <td className="date">{date}</td>
            <td className="category">{transaction.category}</td>
            <td className="description no-mobile">{transaction.description}</td>
            <td className="amount">$ {transaction.cost.toFixed(2)}</td>
        </>
    )
}

function TransactionEdit( {member, transaction, setMembersState, setEditState} ) {

    function updateTransaction(event) {
        let container = event.target.parentNode.parentNode
        let amount = container.querySelector(`.amount`).value
        let category = container.querySelector(`.category`).value
        let description = container.querySelector(`.description`).value
        let date = container.querySelector(`.date`).value
        group.addTransaction(member, amount, category, description, date)
        setMembersState()
        setEditState()
    }

    return (
        <>
        <tr>
            <td className='form-floating'>
                <input type="date" name="date" className="date form-control"
                    defaultValue={transaction.date}/>
                <label htmlFor="date">Date</label>
            </td>
            <td className='form-floating'>
                <input type="text" name="category" placeholder="Category" className="category form-control"
                    defaultValue={transaction.category}/>
                <label htmlFor="category">Category</label>
            </td>
            <td className='form-floating'>
                <input type="text"name="description" placeholder="Description" className="description form-control"
                    defaultValue={transaction.description}/>
                <label htmlFor="description">Description</label>
            </td>
            <td className='form-floating'>
                <input type="text" className="amount form-control" name="amount" placeholder="Amount"
                    defaultValue={transaction.cost.toFixed(2)}/>
                <label htmlFor="amount">Amount</label>
            </td>
        </tr>
        <div>
        <button onClick={updateTransaction}>
                Update
            </button>
            <button onClick={() => setMembersState(false)}>
                Cancel
            </button>
            <button onClick={() => setMembersState(false)}>
                Delete
            </button>
        </div>
    </>
    )
}