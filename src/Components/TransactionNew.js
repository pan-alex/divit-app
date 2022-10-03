// "Form" that allows users to enter a new transaction

export default function TransactionNew( {member, newTransaction} ) {
    return (
        <>
            <div className={member.name + " container-lg newTransaction"}>
                <div  className='form-floating'>
                    <input type="text" id={'new-amount-' + member.name} className="amount form-control" name="amount" placeholder="Amount" />
                    <label htmlFor="amount">Amount</label>
                </div>
                <div className='form-floating'>
                    <input type="text" id={'new-category-' + member.name} name="category" placeholder="Category" className="category form-control" />
                    <label htmlFor="memberSplit">Category</label>
                </div>
                <div className='form-floating'>
                    <input type="text" id={'new-description-' + member.name} name="description" placeholder="Description" className="description form-control" />
                    <label htmlFor="memberSplit">Description</label>
                </div>
                <div className='form-floating'>
                    <input type="date" id={'new-date-' + member.name} name="date" className="date form-control" defaultValue={new Date().toISOString().slice(0,10)}/>
                    <label htmlFor="memberSplit">Date</label>
                </div>
                <button id={'new-transaction-' + member.name} className="btn btn-primary" onClick={newTransaction}>
                    Add
                    </button>
            </div>
        </>
    )


}