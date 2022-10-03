// Accordion item component containing info for individual members.
// Controls state for group.members[member]
import { group } from './Classes'
import TransactionNew from "./TransactionNew";
import TransactionsList from "./TransactionsList";
import { useState } from 'react'

export default function MemberInfo( {member} ) {

    const [ , setMember] = useState(member)

    function addTransaction() {
        let amount = document.querySelector(`#new-amount-${member.name}`).value
        let category = document.querySelector(`#new-category-${member.name}`).value
        let description = document.querySelector(`#new-description-${member.name}`).value
        let date = document.querySelector(`#new-date-${member.name}`).value
        group.addTransaction(member, amount, category, description, date)
        setMember(prev => {
            return {...prev}
        })
    }

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
                        <TransactionNew member={member} handleClick={addTransaction}/>
                        <TransactionsList member={member} />
                    </div>
            </div>
        </div>
    )
}