// import { Box } from '@chakra-ui/react'
import { group } from './Classes'

export default function RepaymentsBox() {

    const RepaymentItem = ({repayment}) => {
        return (
            <li className='repayment'>
                <div>
                    <p>{repayment[0] + ' -> ' + repayment[1]}</p>
                </div>
                <div>
                    <p>{repayment[2]}</p>
                </div>
            </li>
        )
    }

    let repayments = group.calculateRepayments()
    const RepaymentItems = repayments.map((repayment, i) => {
        return <RepaymentItem repayment={repayment} key={i} />
    })

    return (
        <section id='repayments'>
            <div className='container-sm'>
                <div className='card'>
                    <div className='card-header'>
                        <h2>Total</h2>
                        <strong className='h3'>
                            {'$' + group.members.reduce( (sum, member) => sum + member.contribution, 0)}
                        </strong>
                    </div>
                    <div className='card-body'>
                        <ul id='repaymentsList'>
                            {RepaymentItems}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}