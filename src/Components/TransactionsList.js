// Component that renders a table of all of the member's transactions
import Transaction from "./Transaction"
import TransactionNew from "./TransactionNew"

export default function TransactionsList( {member, setMembersState} ) {
    member.transactions.sort( (a, b) => new Date(b.date) - new Date(a.date) )
    let transactions = member.transactions.map(transaction => {
        return (
            <Transaction
                member={member}
                transaction={transaction}
                setMembersState={setMembersState}
                key={transaction.id}
            />
        )
    })

    return (
        <>
            <table className="transactionsListing container-lg table table-striped table-hover">
                <thead>
                    <tr>
                        <th className="date">Date</th>
                        <th className="category">Category</th>
                        <th className="description no-mobile">Description</th>
                        <th className="amount">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions}
                </tbody>
            </table>
            <table className='table'>
                <tbody>
                    <TransactionNew member={member} />
                </tbody>
            </table>

        </>

    )
}
