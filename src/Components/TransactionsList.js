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
            <div className="transactionsListing container-lg">
                    <SyncTable member={member} transactions={member.transactions} setMembersState={setMembersState} />
            </div>
            <div>
                <div>
                    <TransactionNew member={member} setMembersState={setMembersState} />
                </div>
            </div>

        </>

    )
}
