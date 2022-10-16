// Component that renders a table of all of the member's transactions
import SyncTable from "./SyncTable"
import TransactionNew from "./TransactionNew"

export default function TransactionsList( {member, toggleVisibility, setMembersState} ) {
    member.transactions.sort( (a, b) => new Date(b.date) - new Date(a.date) )

    if (toggleVisibility > 0) {
        return (
            <>
                <div className="transactionsListing">
                    <SyncTable member={member} transactions={member.transactions} setMembersState={setMembersState} />
                </div>
                <div>
                    <TransactionNew member={member} setMembersState={setMembersState} />
                </div>
            </>

        )
    } else {
        return <></>
    }

}
