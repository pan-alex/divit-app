// Accordion item component containing info for individual members.
// Controls state for group.members[member]
import TransactionsList from "./TransactionsList";
import MemberHeader from "./MemberHeader";
import { useState } from 'react'



// eslint-disable-next-line
export default function MemberInfo( {member} ) {
    const [transactionsVisible, setTransactionsVisible] = useState(-1);

    function handleToggleTransactionList() {
        setTransactionsVisible(value => value * -1) // -1 not visible; 1 visible
    }

    return (
        <div className='container-sm' style={{'maxWidth': '1000px'}}>
            <div className='card'>
                <MemberHeader member={member} handleToggleTransactionList={handleToggleTransactionList}/>
                <TransactionsList
                    member={member}
                    isVisible={transactionsVisible}
                    handleIsVisibleToggle={handleToggleTransactionList}
                />
            </div>
        </div>
    )
}