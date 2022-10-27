// Component that renders a table of all of the member's transactions
import SyncTable from "./SyncTable"
import TransactionNew from "./TransactionNew"

export default function TransactionsList( {member, isVisible, handleIsVisibleToggle} ) {
    member.transactions.sort( (a, b) => new Date(b.date) - new Date(a.date) )

    const transactionHeader = member.name.slice(-1).toLowerCase() === 's' ? `${member.name}' Transactions` : `${member.name}'s Transactions`

    let classes = isVisible > 0 ? '' : 'hide '
    return (
        <div className={classes + 'memberBody'}>
            <div className='transactionNew'>
                <TransactionNew member={member} />
            </div>
            <div className="transactionsList">
                <h4>{transactionHeader}</h4>
                <SyncTable member={member} transactions={member.transactions} />
            </div>
            <button className='btn btn-light' onClick={handleIsVisibleToggle}>
            ︿
            </button>
        </div>

        )
}