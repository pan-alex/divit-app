// Component that renders a table of all of the member's transactions
import { useContext } from 'react';
import SyncTable from "./SyncTable"
import TransactionNew from "./TransactionNew"
import { GroupContext } from '../App'

export default function TransactionsList( {member, isVisible, handleIsVisibleToggle} ) {
    const [, setMembersState] = useContext(GroupContext)
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
                <button className='btn btn-outline-secondary' onClick={handleIsVisibleToggle}>
                    Collapse
                </button>
            </>

        )
    } else {
        return <></>
    }

}
