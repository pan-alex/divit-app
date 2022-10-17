// Component that renders a table of all of the member's transactions
import SyncTable from "./SyncTable"
import TransactionNew from "./TransactionNew"

export default function TransactionsList( {member, setMembersState, isVisible, handleIsVisibleToggle} ) {
    member.transactions.sort( (a, b) => new Date(b.date) - new Date(a.date) )

    if (isVisible > 0) {
        return (
            <>
                <div className="transactionsListing">
                    <SyncTable member={member} transactions={member.transactions} setMembersState={setMembersState} />
                </div>
                <div>
                    <TransactionNew member={member} setMembersState={setMembersState} />
                </div>
                <button className='btn btn-outline-secondary' onClick={handleIsVisibleToggle}>
                    Collapse
                </button>
            </>

        )
    } else {
        return <></>
    }

}
