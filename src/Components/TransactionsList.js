// Component that renders a table of all of the member's transactions
import SyncTable from "./SyncTable"
// import Transaction from "./Transaction"
import TransactionNew from "./TransactionNew"
import { useState } from "react"

export default function TransactionsList( {member, setMembersState} ) {
    member.transactions.sort( (a, b) => new Date(b.date) - new Date(a.date) )
    // let transactions = member.transactions.map(transaction => {
    //     return (
    //         <Transaction
    //             member={member}
    //             transaction={transaction}
    //             setMembersState={setMembersState}
    //             key={transaction.id}
    //         />
    //     )
    // })

    // let [transactions, setTransactions] = useState(member.transactions);

    return (
        <>
            <div className="transactionsListing container-lg table table-striped table-hover">
                <div className='thead'>
                    <div className='tr'>
                        <span className="th date">Date</span>
                        <span className="th category">Category</span>
                        <span className="th description no-mobile">Description</span>
                        <span className="th amount">Amount</span>
                    </div>
                </div>
                <div className='tbody'>
                    <SyncTable transactions={member.transactions} />
                </div>
                {/* <div className='tbody'>
                    {transactions}
                </div> */}
            </div>
            <div className='table'>
                <div className='tbody'>
                    <TransactionNew member={member} setMembersState={setMembersState} />
                </div>
            </div>

        </>

    )
}
