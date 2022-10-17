// Accordion item component containing info for individual members.
// Controls state for group.members[member]
import MemberEdit from "./MemberEdit";
import TransactionsList from "./TransactionsList";
import MemberMenu from "./MemberMenu";
import { useState } from 'react'

// eslint-disable-next-line
export default function MemberInfo( {member, setMembersState} ) {

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
                <div className='memberHeader' onClick={handleToggleTransactionList}>
                    <div className='memberHeaderInfo'>
                        <div>
                            <h3>{member.name}</h3>
                        </div>
                        <div className="flex-between">
                            <div className="flex-column text-end">
                                <span>Contribution</span>
                                <strong className="h3">${(member.contribution).toFixed(2)}</strong>
                            </div>
                            <div className="flex-column text-end">
                                <span>Credit</span>
                                <strong className="h3">${(member.credit).toFixed(2)}</strong>
                            </div>
                        </div>
                    </div>
                    <MemberMenu />
                </div>
                <MemberEdit
                    member={member}
                    setMembersState={setMembersState}
                    isVisible={memberEditVisible}
                    handleIsVisibleToggle={handleToggleMemberEdit}
                 />
                <TransactionsList
                    member={member}
                    setMembersState={setMembersState}
                    isVisible={transactionsVisible}
                    handleIsVisibleToggle={handleToggleTransactionList}
                />
            </div>
        </div>


        // <div id={'accordion-item-' + member.id} className="member accordion-item">
        //     <h2 className="accordion-header" aria-label={member.name}>
        //         <button
        //             type="button"
        //             className="accordion-button collapsed"
        //             data-bs-toggle="collapse"
        //             data-bs-target={"#accordion-collapse-" + member.id}
        //             aria-expanded="true"
        //             aria-controls={"#accordion-collapse-" + member.name}
        //             >
        //                 <div>
        //                     <h3>{member.name}</h3>
        //                 </div>
        //                 <div className="no-mobile">
        //                     <div className="flex-column">
        //                         <span>Contribution</span>
        //                         <strong className="h3">${(member.contribution).toFixed(2)}</strong>
        //                     </div>
        //                 </div>
        //                 <div>
        //                     <div className="flex-column">
        //                         <span>Credit</span>
        //                         <strong className="h3">${(member.credit).toFixed(2)}</strong>
        //                     </div>
        //                 </div>
        //         </button>
        //     </h2>
        //     <div
        //         id={'accordion-collapse-' + member.id}
        //         className='accordion-collapse collapse'
        //         aria-labelledby='accordion-collapse'
        //         >
        //             <div className='accordion-body'>
        //                 <MemberEdit member={member} setMembersState={setMembersState} />
        //                 <TransactionsList member={member} setMembersState={setMembersState} />
        //             </div>
        //     </div>
        // </div>
    )
}