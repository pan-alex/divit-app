// Accordion item component containing info for individual members.
// Controls state for group.members[member]
import MemberEdit from "./MemberEdit";
import TransactionsList from "./TransactionsList";
import MemberHeader from "./MemberHeader";
import MemberMenu from "./MemberMenu";
import { useState, useContext } from 'react'
import { GroupContext } from '../App'



// eslint-disable-next-line
export default function MemberInfo( {member} ) {
    const [, setMembersState] = useContext(GroupContext)
    const [transactionsVisible, setTransactionsVisible] = useState(-1);
    const [memberEditVisible, setMemberEditVisible] = useState(-1);

    function handleToggleTransactionList() {
        setTransactionsVisible(transactionsVisible * -1) // -1 not visible; 1 visible
    }

    function handleToggleMemberEdit(e) {
        setMemberEditVisible(memberEditVisible * -1)
    }

    return (
        <div className='container-sm' style={{'maxWidth': '1000px'}}>
            <div className='card'>
                <MemberHeader member={member} handleClick={handleToggleTransactionList}/>
                <MemberEdit
                    member={member}
                    isVisible={memberEditVisible}
                    handleIsVisibleToggle={handleToggleMemberEdit}
                 />
                <TransactionsList
                    member={member}
                    isVisible={transactionsVisible}
                    handleIsVisibleToggle={handleToggleTransactionList}
                />
            </div>
        </div>
    )
}