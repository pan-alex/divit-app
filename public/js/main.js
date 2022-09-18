function m(n) {
    // Converts numbers to "money" by changing them to numbers with 2 decimal places.
    // Longer term use actual currency data types.
    return Number((+n).toFixed(2))
}

class Group {
    constructor() {
    }
    add(name, split) {
        if (!this[name]) {
            this[name] = new Person(name, split)
        } else {
            alert('That name is already being used.')
        }
        this.toLocalStorage(this)
        return this[name]
    }

    delete(name) {
        delete this[name]
        this.toLocalStorage(this)
        return this
    }

    objToGroup(obj) {
        obj = Object.assign(new Group(), obj)
        for (let person in obj) {
            obj[person] = Object.assign(new Person(), obj[person])
        }
        return obj
    }

    toLocalStorage(obj) {
        localStorage.setItem('group', JSON.stringify(obj))
        return obj
    }

    fromLocalStorage() {
        return this.objToGroup(JSON.parse(localStorage.getItem('group'))) || new Group()
    }
}

class Person {
    constructor(name, split) {
        this.name = name;
        this.contribution = 0;
        this.split = split || 0;
        this.transactions = []
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
        Group.prototype.toLocalStorage(group)
        return this
    }

    changeSplit(newSplit) {
        this.split = newSplit;
        Group.prototype.toLocalStorage(group)
        return this.split
    }

    updatePerson(newName, newSplit) {
        this.name = newName;
        this.split = newSplit;
        Group.prototype.toLocalStorage(group)
        return this
    }
}


function calculateShare(group) {
// Returns:
// this: Modifies the input object to add the following property:
    // credit: Number. The amount receiver to the this, based on their contribution minus what they are responsible for (sum * split). The sum of credit for all perople is 0.
    let sum = Object.values(group).reduce( (sum, person) => sum + person.contribution, 0);
    let splitSum = Object.values(group).reduce( (splitSum, person) => splitSum + +person.split, 0);
    for (let person in group) {
        group[person].credit = m(group[person].contribution - sum * group[person].split/splitSum)
    }
    Group.prototype.toLocalStorage(group)
    return group
 }

function calculateRepayments(group) {
// Returns:
    // repayments: Array representing the repayments each person should make so that no one owes anyone money. Each element is a subarray representing one payment. It has the format [P, R, Amt] where P = payer, R = receiver, Amt = amount to pay.
    // A greedy approach is utilized where the person with the least credit pays the person with the most credit until all debts are paid.
    calculateShare(group)
    let people = []
    for (let person in group) {
        people.push([person, group[person].credit]) // format: [name, credit]
    }
    let payers = people.filter( a => a[1] < 0).sort( (a,b) => a[1] - b[1]);
    let receivers  = people.filter( a => a[1] > 0).sort( (a,b) => b[1] - a[1]);
    if ( payers.length < 1  || receivers.length < 1) return []

    let repayments = []
    do {
        let payer = payers[0];
        let receiver = receivers[0];
        let diff = +receiver[1] + +payer[1]
        if (diff < 0) {
            payer[1] =  m(payer[1] + receiver[1]);
            repayments.push( [payer[0], receiver[0], m(receiver[1])] )
            receivers.shift()
        } else if (diff > 0) {
            receiver[1] = m(receiver[1] + payer[1]);
            repayments.push( [payer[0], receiver[0], m(-payer[1])] )
            payers.shift()
        } else {
            repayments.push( [payer[0], receiver[0], m(receiver[1])] )
            receivers.shift()
            payers.shift()
        }
    } while (payers.length > 0 && receivers.length > 0)
    return repayments
}


function peopleToDOM() {
    people = document.querySelector('#people')
    people.innerHTML = ''
    // Create a div containing the name and split of each person in the group
    for (let name in group) {
        let div = document.createElement('div')
        div.classList.add('person')
        let detailsDiv = document.createElement('div')
        detailsDiv.classList.add('details')

        let expandBtn = document.createElement('button')
        expandBtn.innerText = 'Expand'
        expandBtn.addEventListener('click', function() { expandPersonDetails(detailsDiv, name) })

        let nameField = document.createElement('input')
        nameField.setAttribute('value', name)

        let splitField = document.createElement('input')
        splitField.setAttribute('value', group[name].split)

        let updateBtn = document.createElement('button')
        updateBtn.innerText = 'Update'
        updateBtn.addEventListener( 'click', function() {group[name].updatePerson(nameField.value, splitField.value)} )
        people.appendChild(div)
        div.appendChild(expandBtn)
        div.appendChild(nameField)
        div.appendChild(splitField)
        div.appendChild(updateBtn)
        div.appendChild(detailsDiv)
    }
}

function addPerson() {
    let name = document.querySelector("#personName");
    let split = document.querySelector("#personSplit");
    group.add(name.value, split.value);
    peopleToDOM()
    name.value = '';
    split.value = '';
}

function personTransactionsToDOM(parent, name) {
    parent.innerHTML = ''
    let transactions = group[name].transactions //.sort( (a,b) => b.date >= a.date)

    for (t in transactions) {
        let div = document.createElement('div')
        div.classList.add('transaction')

        let cost = document.createElement('input')
        cost.setAttribute('value', transactions[t].cost)

        let category = document.createElement('input')
        category.setAttribute('value', transactions[t].category)

        let description = document.createElement('input')
        description.setAttribute('value', transactions[t].description)

        let date = document.createElement('input')
        date.setAttribute('type', 'date')
        date.setAttribute('value', transactions[t].date)

        // let updateBtn = document.createElement('button')
        // updateBtn.innerText = 'Update'
        // updateBtn.addEventListener( 'click', function() {
        //     transactions[t].cost = cost.value;
        //     transactions[t].category = category.value;
        //     transactions[t].description = description.value;
        //     transactions[t].date = date.value
        // } )

        // let deleteBtn = document.createElement('button')
        // deleteBtn.innerText = 'Delete'
        // deleteBtn.addEventListener( 'click', function() {
        //     transactions.splice(t, 1)
        //     personTransactionsToDOM(parent, name)
        // } )

        parent.append(div)
        div.appendChild(date)
        div.appendChild(cost)
        div.appendChild(category)
        div.appendChild(description)
        // div.appendChild(updateBtn)
        // div.appendChild(deleteBtn)
    }
}

function expandPersonDetails(parent, name) {
    if (parent.classList.contains('expanded')) {
        parent.innerHTML = ''
        parent.classList.remove('expanded')
    } else {
        let div = document.createElement('div')
        let transactionsDiv = document.createElement('div')
        transactionsDiv.classList.add('transactions')

        let cost = document.createElement('input')
        cost.setAttribute('placeholder', 'Cost')

        let category = document.createElement('input')
        category.setAttribute('placeholder', 'Category')

        let description = document.createElement('input')
        description.setAttribute('placeholder', 'Description')

        let date = document.createElement('input')
        date.setAttribute('type', 'date')
        date.value = new Date().toISOString().slice(0,10)

        let submitBtn = document.createElement('button')
        submitBtn.innerText = 'Submit Transaction'
        submitBtn.addEventListener('click', function() {
            group[name].addTransaction(cost.value, category.value, description.value, date.value)
            cost.value = ''
            category.value = ''
            description.value = ''
            date.value = new Date().toISOString().slice(0,10)
            personTransactionsToDOM(transactionsDiv, name)
        })

        parent.appendChild(div)
        parent.classList.add('expanded')
        div.appendChild(cost)
        div.appendChild(category)
        div.appendChild(description)
        div.appendChild(date)
        div.appendChild(submitBtn)
        div.appendChild(transactionsDiv)
        personTransactionsToDOM(transactionsDiv, name)
    }
}

function repaymentsToDOM() {
    let repayments = calculateRepayments(group)
    let div = document.querySelector('#repayments')
    div.innerHTML = ''
    for (let repayment of repayments) {
        let p = document.createElement('p')
        p.innerText = repayment[0] + ' owes ' + repayment[1] + ' $' + repayment[2]
        div.appendChild(p)
    }
}


// On load
group = Group.prototype.fromLocalStorage()
peopleToDOM()

createPersonBtn.addEventListener('click', addPerson)
repaymentsBtn.addEventListener('click', repaymentsToDOM)
resetGroupBtn.addEventListener('click', function() {group = new Group(); peopleToDOM()})