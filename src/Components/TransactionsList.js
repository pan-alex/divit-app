// Component that renders a table of all of the member's transactions
import SyncTable from "./SyncTable"
import TransactionNew from "./TransactionNew"

export default function TransactionsList( {member, isVisible, handleIsVisibleToggle} ) {
    member.transactions.sort( (a, b) => new Date(b.date) - new Date(a.date) )

    if (isVisible > 0) {
        return (
            <>
                <div className="transactionsListing">
                    <SyncTable member={member} transactions={member.transactions} />
                </div>
                <div>
                    <TransactionNew member={member} />
                </div>
                <button className='btn btn-light' onClick={handleIsVisibleToggle}>
                ︿
                </button>
            </>

        )
    } else {
        return <></>
    }

}
