// Component that acts as header for the member. Contains high level information about the member.
import MemberMenu from "./MemberMenu"


export default function MemberHeader( {member, handleClick} ) {
    return (
        <div className='memberHeader' onClick={handleClick}>
            <MemberHeaderInfo member={member} />
            <MemberMenu member={member} />
        </div>
    )
}

function MemberHeaderInfo( {member} ) {

    return (
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
    )
}