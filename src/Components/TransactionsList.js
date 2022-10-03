// Component that renders a table of all of the member's transactions
import Transaction from "./Transaction"

export default function TransactionsList( {member} ) {
    let transactions = member.transactions.map(transaction => <Transaction transaction={transaction} key={transaction.id}/>)

    return (
        <>
            <table className="transactionsListing container-lg table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions}
                </tbody>
            </table>
        </>

    )
}
