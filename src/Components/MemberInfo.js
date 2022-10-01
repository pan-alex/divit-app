// Accordion item component containing info for individual members.

//

export default function MemberInfo( {member} ) {
    return (
        <div id={'accordion-item-' + member.name} className="member accordion-item">
            <h2 className="accordion-header" aria-label={member.name}>
                <button
                    type="button"
                    className="accordion-button"
                    data-bs-toggle="collapse"
                    data-bs-target={"#accordion-collapse" + member.name}
                    aria-expanded="true"
                    aria-controls={"#accordion-collapse" + member.name}
                    >
                    {member.name}
                </button>
            </h2>
            <div
                id={'accordion-collapse' + member.name}
                className='accordion-collapse collapse collapse'
                aria-labelledby='accordion-collapse'
                >
                    <div className='accordion-body'>
                        <p>This is {member.name}'s info</p>
                    </div>
            </div>
        </div>
    )
}