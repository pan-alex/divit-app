function m(n) {
    // Converts numbers to "money" by changing them to numbers with 2 decimal places.
    // Longer term use actual currency data types.
    return Number((+n).toFixed(2))
}


//     constructor(name, split) {
//         this.name = name;
//         this.contribution = 0;
//         this.split = split || 0;
//         this.transactions = []


export default class Group {
    constructor() {
        this.nTransactions = 0;
        this.members = {};
    }
    addMember(name, split) {
        if (!name) {
            alert('Enter a name')
        }
        let pattern = RegExp(name)
        if (Object.keys(this.members).find(key => key.match(pattern))) {
            alert(`The name ${name} is already in use.`)
        }
        this.members[name] = {'name': name, 'split': split || 1, 'contribution': 0, 'transactions': []}
        return this.toLocalStorage()
    }

    deleteMember(name) {
        delete this.members[name]
        return this.toLocalStorage()
    }

    updateMember(name, newName, newSplit) {
        if (newSplit) {
            this.members[name].split = newSplit
        }
        if (newName && name !== newName) {
            if (!this.members[newName]) {
                this.members[newName] = this.members[name]
                this.members[newName].name = newName
                delete this.members[name]
            } else {
                alert('That name is already being used.')
            }
        }
        return this.toLocalStorage()
    }

    objToGroup(obj) {
        obj = Object.assign(new Group(), obj)
        return obj
    }

    toLocalStorage() {
        localStorage.setItem('group', JSON.stringify(this))
        return this
    }

    fromLocalStorage() {
        return this.objToGroup(JSON.parse(localStorage.getItem('group'))) || new Group()
    }

    calculateShare() {
    // Returns:
    // this: Modifies the input object to add the following property:
        // credit: Number. The amount receiver to the this, based on their contribution minus what they are responsible for (sum * split). The sum of credit for all perople is 0.
        let sum = Object.values(this.members).reduce( (sum, member) => sum + member.contribution, 0);
        let splitSum = Object.values(this.members).reduce( (splitSum, member) => splitSum + +member.split, 0)
        for (let member in this.members) {
            this.members[member].credit = m(this.members[member].contribution - sum * this.members[member].split/splitSum)
        }
        return this.toLocalStorage()
     }

    calculateRepayments() {
    // Returns:
        // repayments: Array representing the repayments each member should make so that no one owes anyone money. Each element is a subarray representing one payment. It has the format [P, R, Amt] where P = payer, R = receiver, Amt = amount to pay.
        // A greedy approach is utilized where the member with the least credit pays the member with the most credit until all debts are paid.
        this.calculateShare()
        let members = []
        for (let member in this.members) {
            members.push({'name': member, 'credit': this.members[member].credit})
        }
        let payers = members.filter( a => a.credit < 0).sort( (a,b) => a.credit - b.credit);
        let receivers  = members.filter( a => a.credit > 0).sort( (a,b) => b.credit - a.credit);
        if ( payers.length < 1  || receivers.length < 1) return []

        let repayments = []
        do {
            let payer = payers[0];
            let receiver = receivers[0]
            let diff = +receiver.credit + +payer.credit
            if (diff < 0) {
                payer.credit =  m(payer.credit + receiver.credit);
                repayments.push( [payer.name, receiver.name, m(receiver.credit)] )
                receivers.shift()
            } else if (diff > 0) {
                receiver.credit = m(receiver.credit + payer.credit);
                repayments.push( [payer.name, receiver.name, m(-payer.credit)] )
                payers.shift()
            } else {
                repayments.push( [payer.name, receiver.name, m(receiver.credit)] )
                receivers.shift()
                payers.shift()
            }
        } while (payers.length > 0 && receivers.length > 0)
        return repayments
    }

    addTransaction(member, cost, category, description, date) {
        cost = m(cost)
        this.nTransactions += 1
        member.transactions.push({
            id: this.nTransactions,
            cost:cost,
            category: category,
            description: description,
            date: date
        })
        member.contribution = m(member.contribution + cost)
        this.calculateShare()
        return this.toLocalStorage()
    }

    updateTransaction(member, index, cost, category, description, date) {
        cost = m(cost)
        member.contribution = m(member.contribution + cost - member.transactions[index].cost)
        member.transactions[index] = {
            cost:cost,
            category: category,
            description: description,
            date: date
        }
        this.calculateShare()
        return this.toLocalStorage()
    }

    deleteTransaction(member, index) {
        this.contribution = m(member.contribution - member.transactions[index].cost)
        this.transactions.splice(index, 1)
        this.calculateShare()
        return this.toLocalStorage()
    }
}

const group = Group.prototype.fromLocalStorage()

export { group }