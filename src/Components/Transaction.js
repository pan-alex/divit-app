// Component that renders a table row containing a single transaction
import TransactionNew from "./TransactionNew"
import { useState } from 'react'

export default function Transaction( {transaction} ) {
    let [edit, setEdit] = useState(false)

    if (!edit) {
        return (
            <tr onClick={() => setEdit(true)}>
                <TransactionNoEdit transaction={transaction}/>
            </tr>
        )
    } else {
        return (
            <tr>
                <TransactionEdit transaction={transaction} updateState={setEdit}/>
            </tr>
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

function TransactionEdit( {transaction, updateState} ) {
    console.log(transaction)
    return (
        <>
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
            <td colSpan={4}>
                <button onClick={() => updateState(false)}>
                    Update
                </button>
            </td>
    </>
    )
}