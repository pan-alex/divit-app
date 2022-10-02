// Component that renders a table row containing a single transaction

export default function Transaction( {transaction} ) {
    return (
        <tr>
            <td>{transaction.cost}</td>
            <td>{transaction.category}</td>
            <td>{transaction.description}</td>
            <td>{transaction.date}</td>
        </tr>
    )
}