// Utility component that exports the global group variable and associated methods.

function m(n) {
    // Converts numbers to "money" by changing them to numbers with 2 decimal places.
    // Longer term use actual currency data types.
    return Number((+n).toFixed(2))
}

class Group {
    constructor() {
        this.nTransactions = 0;
        this.nMembers = 0;
        this.members = [];
    }
    checkNameUnused(name) {
        let pattern = RegExp(name)
        if (this.members.find(member => member.name.match(pattern))) {
            alert(`The name ${name} is already in use.`)
            return false
        }
        return true
    }


    addMember(name, split) {
        if (name.length < 1) {
            alert('Enter a name')
        }
        if (this.checkNameUnused) {
            const id = ++this.nMembers
            this.members.push({
                'id': id,
                'name': name,
                'split': split || 1,
                'contribution': 0,
                'transactions': []})
            return this.calculateShare()
        }
    }

    deleteMember(member) {
        const idx = this.members.indexOf(member)
        this.members.splice(idx, 1)
        return this.calculateShare()
    }

    updateMember(member, newName, newSplit) {
        const name = member.name
        if (newSplit) {
            member.split = newSplit
        }
        if (newName && name !== newName) {
            if (this.checkNameUnused) {
                member.name = newName
            }
        }
        return this.calculateShare()
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

    calculateContributions() {
        this.members.forEach( member => {
            let sum = member.transactions.reduce( (sum, transaction) => sum += m(transaction.cost), 0)
            member.contribution = m(sum);
        })
    }

    calculateShare() {
    // Returns:
    // this: Modifies the input object to add the following property:
        // credit: Number. The amount receiver to the this, based on their contribution minus what they are responsible for (sum * split). The sum of credit for all perople is 0.
        this.calculateContributions()
        let sum = this.members.reduce( (sum, member) => sum + member.contribution, 0);
        let splitSum = this.members.reduce( (splitSum, member) => splitSum + +member.split, 0)
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
        ++this.nTransactions
        member.transactions.push({
            id: this.nTransactions,
            cost:cost,
            category: category,
            description: description,
            date: date
        })
        member.contribution = m(member.contribution + cost)
        return this.calculateShare()
    }

    replaceTransactions(member, newTransactions) {
        member.transactions = newTransactions
        return this.calculateShare()
    }

    updateTransaction(member, id, cost, category, description, date) {
        cost = m(cost)
        let transaction = member.transactions.find(t => t.id === id)
        member.contribution = m(member.contribution + cost - transaction.cost)

        transaction.cost = cost;
        transaction.category = category;
        transaction.description = description;
        transaction.date = date;
        return this.calculateShare()
    }

    deleteTransaction(member, id) {
        let transaction = member.transactions.find(t => t.id === id)
        member.contribution = m(member.contribution - transaction.cost)
        member.transactions = member.transactions.filter(t => t.id !== id)
        return this.calculateShare()
    }
}

const group = Group.prototype.fromLocalStorage()
group.calculateShare()

export { group, Group }