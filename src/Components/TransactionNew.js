// "Form" that allows users to enter a new transaction

export default function TransactionNew( {member, handleClick} ) {
    return (
        <>
            <div className="container-lg newTransaction">
                <div  className='form-floating'>
                    <input type="text" id={'new-amount-' + member.name} className="form-control" name="amount" placeholder="Amount" />
                    <label htmlFor="amount">Amount</label>
                </div>
                <div className='form-floating'>
                    <input type="text" id={'new-category-' + member.name} name="personSplit" placeholder="Category" className="form-control" />
                    <label htmlFor="memberSplit">Category</label>
                </div>
                <div className='form-floating'>
                    <input type="text" id={'new-description-' + member.name} name="personSplit" placeholder="Description" className="form-control" />
                    <label htmlFor="memberSplit">Description</label>
                </div>
                <div className='form-floating'>
                    <input type="date" id={'new-date-' + member.name} name="personSplit" className="form-control" defaultValue={new Date().toISOString().slice(0,10)}/>
                    <label htmlFor="memberSplit">Date</label>
                </div>
                <button id="btnMemberNew" className="btn btn-primary" onClick={handleClick}>
                    Add
                    </button>
            </div>
        </>
    )


}