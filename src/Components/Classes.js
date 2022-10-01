import { useState } from 'react'

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
    addPerson(name, split) {
        if (name && !this[name]) {
            this[name] = {'name': name, 'split': split || 0, 'contribution': 0, 'transactions': []}
        } else {
            alert('Enter a name that is not already in use.')
        }
        this.toLocalStorage()
        return 'hi'
    }

    deletePerson(name) {
        delete this[name]
        return this.toLocalStorage()
    }

    updatePerson(name, newName, newSplit) {
        if (newSplit) {
            this[name].split = newSplit
        }
        if (newName && name !== newName) {
            if (!this[newName]) {
                this[newName] = this[name]
                this[newName].name = newName
                delete this[name]
            } else {
                alert('That name is already being used.')
            }
        }
        return this.toLocalStorage()
    }

    objToGroup(obj) {
        obj = Object.assign(new Group(), obj)
        // for (let person in obj) {
        //     obj[person] = Object.assign(new Person(), obj[person])
        // }
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
        let sum = Object.values(this).reduce( (sum, person) => sum + person.contribution, 0);
        let splitSum = Object.values(this).reduce( (splitSum, person) => splitSum + +person.split, 0);
        for (let person in this) {
            this[person].credit = m(this[person].contribution - sum * this[person].split/splitSum)
        }
        return this.toLocalStorage()
     }

    calculateRepayments() {
    // Returns:
        // repayments: Array representing the repayments each person should make so that no one owes anyone money. Each element is a subarray representing one payment. It has the format [P, R, Amt] where P = payer, R = receiver, Amt = amount to pay.
        // A greedy approach is utilized where the person with the least credit pays the person with the most credit until all debts are paid.
        this.calculateShare()
        let people = []
        for (let person in this) {
            people.push({'name': person, 'credit': this[person].credit})
        }
        let payers = people.filter( a => a.credit < 0).sort( (a,b) => a.credit - b.credit);
        let receivers  = people.filter( a => a.credit > 0).sort( (a,b) => b.credit - a.credit);
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

    addTransaction(cost, category, description, date) {
        cost = m(cost)
        this.transactions.push({
            cost:cost,
            category: category,
            description: description,
            date: date
        })
        this.contribution = m(this.contribution + cost)
        return this.toLocalStorage()
    }

    updateTransaction(index, cost, category, description, date) {
        cost = m(cost)
        this.contribution = m(this.contribution + cost - this.transactions[index].cost)
        this.transactions[index] = {
            cost:cost,
            category: category,
            description: description,
            date: date
        }
        return this.toLocalStorage()
    }

    deleteTransaction(index) {
        this.contribution = m(this.contribution - this.transactions[index].cost)
        this.transactions.splice(index, 1)
        return this.toLocalStorage()
    }
}

const group = Group.prototype.fromLocalStorage()

export { group }