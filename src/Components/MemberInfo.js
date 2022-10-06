// Accordion item component containing info for individual members.
// Controls state for group.members[member]
import TransactionsList from "./TransactionsList";

// eslint-disable-next-line
export default function MemberInfo( {member, setMembersState} ) {

    return (
        <div id={'accordion-item-' + member.name} className="member accordion-item">
            <h2 className="accordion-header" aria-label={member.name}>
                <button
                    type="button"
                    className="accordion-button collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target={"#accordion-collapse-" + member.name}
                    aria-expanded="true"
                    aria-controls={"#accordion-collapse-" + member.name}
                    >
                        <div>
                            <h3>{member.name}</h3>
                        </div>
                        <div className="no-mobile">
                            <div className="flex-column">
                                <span>Contribution</span>
                                <strong className="h3">${member.contribution}</strong>
                            </div>
                        </div>
                        <div>
                            <div className="flex-column">
                                <span>Credit</span>
                                <strong className="h3">${member.credit}</strong>
                            </div>
                        </div>
                </button>
            </h2>
            <div
                id={'accordion-collapse-' + member.name}
                className='accordion-collapse collapse'
                aria-labelledby='accordion-collapse'
                >
                    <div className='accordion-body'>
                        <TransactionsList member={member} setMembersState={setMembersState} />
                    </div>
            </div>
        </div>
    )
}