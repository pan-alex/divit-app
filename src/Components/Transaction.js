// Component that renders a table row containing a single transaction
import { group } from "./Classes"
import { useState, useRef, useEffect } from 'react'

export default function Transaction( {member, transaction, setMembersState} ) {
    let [edit, setEdit] = useState(false)

    if (!edit) {
        return (
            <div className='tr' onClick={() => setEdit(true)}>
                <TransactionNoEdit transaction={transaction}/>
            </div>
        )
    } else {
        return (
            <TransactionEdit member={member} transaction={transaction} setMembersState={setMembersState} setEditState={setEdit}/>
        )
    }
}


function TransactionNoEdit( {transaction} ) {
    console.log(transaction.date)
    let date = new Date(transaction.date)
    console.log(date)
    date = date.toString().slice(4, 15).split(' ')

    date[1] = Number(date[1]) + ',' //Remove leading 0 and add ','
    date = date.join(' ')

    return (
        <>
            <span className="td date">{date}</span>
            <span className="td category">{transaction.category}</span>
            <span className="td description no-mobile">{transaction.description}</span>
            <span className="td amount">$ {transaction.cost.toFixed(2)}</span>
        </>
    )
}

function TransactionEdit( {member, transaction, setMembersState, setEditState} ) {

    const inputRef = useRef();
    useEffect( () => inputRef.current.focus(), [])

    function updateTransaction(event) {
        let container = event.target.parentNode.parentNode.querySelector('.transactionInfo')
        let amount = container.querySelector(`.amount`).value
        let category = container.querySelector(`.category`).value
        let description = container.querySelector(`.description`).value
        let date = container.querySelector(`.date`).value
        group.updateTransaction(member, transaction.id, amount, category, description, date)
        setMembersState()
        setEditState()
    }

    function deleteTransaction() {
        group.deleteTransaction(member, transaction.id)
        setMembersState()
        setEditState()
    }


    return (
        <div className='rowGroup highlight'>
            <div className='tr transactionInfo'>
                <div className='td form-floating'>
                    <input type="date" name="date" className="date form-control"
                        defaultValue={transaction.date}/>
                    <label htmlFor="date">Date</label>
                </div>
                <div className='td form-floating'>
                    <input type="text" name="category" placeholder="Category" className="category form-control"
                        defaultValue={transaction.category}/>
                    <label htmlFor="category">Category</label>
                </div>
                <div className='td form-floating'>
                    <input type="text"name="description" placeholder="Description" className="description form-control"
                        defaultValue={transaction.description}/>
                    <label htmlFor="description">Description</label>
                </div>
                <div className='td form-floating'>
                    <input ref={inputRef} type="text" className="amount form-control" name="amount" placeholder="Amount"
                        defaultValue={transaction.cost.toFixed(2)}/>
                    <label htmlFor="amount">Amount</label>
                </div>
            </div>
            <div className='btn-row'>
                <button className='btn btn-primary' onClick={updateTransaction}>Update</button>
                <button className='btn btn-secondary'onClick={() => setEditState(false)}>Cancel</button>
                <button className='btn btn-danger btn-sm'onClick={deleteTransaction}>Delete</button>
            </div>
    </div>
    )
}