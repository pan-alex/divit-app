// function m(n) {
//     // Converts numbers to "money" by changing them to numbers with 2 decimal places.
//     // Longer term use actual currency data types.
//     return Number((+n).toFixed(2))
// }


// // DOM functions
// function setAttributes(el, attrs) {
//     Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
// }


// function CompAccordionItem(name, accordionParent) {
//     let accordionItem = document.createElement('div')
//     setAttributes(accordionItem, {'class': 'person accordion-item', 'id': `accordion-item-${name}`})
//     let accordionHeader = document.createElement('h2')
//     setAttributes(accordionHeader, {'class': 'accordion-header'})

//     let accordionBtn = document.createElement('button')
//     setAttributes(accordionBtn, {
//         'type': 'button',
//         'class': 'accordion-button',
//         'data-bs-toggle': 'collapse',
//         'data-bs-target': `#accordion-collapse-${name}`,
//         'aria-expanded': 'true',
//         'aria-controls': `accordion-collapse-${name}`,
//     })
//     accordionBtn.innerText = name

//     let accordionCollapse = document.createElement('div')
//     setAttributes(accordionCollapse, {'class': 'accordion-collapse collapse show', 'aria-labelledby': 'accordion-collapse', 'id': `accordion-collapse-${name}`})

//     let accordionBody = document.createElement('div')
//     setAttributes(accordionBody, {'class': 'accordion-body'})

//     // accordionParent.appendChild(accordionItem)
//     accordionParent.insertBefore(accordionItem, accordionParent.childNodes[0])
//     accordionItem.appendChild(accordionHeader)
//     accordionHeader.appendChild(accordionBtn)
//     accordionItem.appendChild(accordionCollapse)
//     accordionCollapse.appendChild(accordionBody)

//     return [accordionItem, accordionHeader, accordionBtn, accordionCollapse, accordionBody]
// }


// function CompEditMember(parentElement, name) {

//     // Adds fields for editting a person's name / split
//     let nameDiv = document.createElement('div')
//     setAttributes(nameDiv, {'class': 'container-lg editPerson'})

//     let nameField = document.createElement('input')
//     setAttributes(nameField, {'value': name, 'class': 'form-control', 'type': 'text', 'placeholder': 'Name'})

//     let splitField = document.createElement('input')
//     setAttributes(splitField, {'value': group[name].split, 'class': 'form-control', 'type': 'text', 'placeholder': 'Percent'})

//     let updateBtn = document.createElement('button')
//     setAttributes(updateBtn, {'class': 'btn btn-outline-primary'})
//     updateBtn.innerText = 'Update'
//     updateBtn.addEventListener( 'click', function() {
//         group.updatePerson(name, nameField.value, splitField.value)
//         location.reload()
//     } )

//     let deleteBtn = document.createElement('button')
//     setAttributes(deleteBtn, {
//         'class': 'btn btn-outline-secondary col',
//     })

//     deleteBtn.innerText = 'Delete'
//     deleteBtn.addEventListener( 'click', function() {
//         group.deletePerson(name)
//         location.reload()
//     } )

//     parentElement.appendChild(nameDiv)
//     nameDiv.append(nameField)
//     nameDiv.append(splitField)
//     nameDiv.append(updateBtn)
//     nameDiv.append(deleteBtn)
// }

// function CompNewTransaction(parentElement, transactionsListingElement, name) {
//     let newTransactionsDiv = document.createElement('div')
//     setAttributes(newTransactionsDiv, {'class': 'newTransaction container-lg'})

//     let date = document.createElement('input')
//     setAttributes(date, {'class': 'form-control', 'type': 'date', 'value': `${new Date().toISOString().slice(0,10)}` })

//     let cost = document.createElement('input')
//     setAttributes(cost, {'class': 'form-control', 'type': 'number', 'placeholder': 'Cost'})

//     let category = document.createElement('input')
//     setAttributes(category, {'class': 'form-control', 'type': 'text', 'placeholder': 'Category'})

//     let description = document.createElement('input')
//     setAttributes(description, {'class': 'form-control description', 'type': 'text', 'placeholder': 'Description'})

//     let submitBtn = document.createElement('button')
//     setAttributes(submitBtn, {'class': 'btn btn-primary'})
//     submitBtn.innerText = 'Add'

//     submitBtn.addEventListener('click', function() {
//         group[name].addTransaction(cost.value, category.value, description.value, date.value)
//         cost.value = ''
//         category.value = ''
//         description.value = ''
//         date.value = new Date().toISOString().slice(0,10)
//         CompTransactionsListing(transactionsListingElement, name)
//     })

//     newTransactionsDiv.appendChild(date)
//     newTransactionsDiv.appendChild(cost)
//     newTransactionsDiv.appendChild(category)
//     newTransactionsDiv.appendChild(description)
//     newTransactionsDiv.appendChild(submitBtn)
//     parentElement.appendChild(newTransactionsDiv)
// }


// function CompTransactionsListing(parentElement, name) {
//     parentElement.innerHTML = ''
//     let transactions = group[name].transactions

//     for (let t in transactions) {
//         let transactionsDiv = document.createElement('div')
//         transactionsDiv.classList.add('transaction')

//         let cost = document.createElement('input')
//         setAttributes(cost, {'class': 'form-control', 'type': 'number', 'placeholder': 'Cost', 'value': transactions[t].cost})

//         let category = document.createElement('input')
//         setAttributes(category, {'class': 'form-control', 'type': 'text', 'placeholder': 'Category', 'value': transactions[t].category})

//         let description = document.createElement('input')
//         setAttributes(description, {'class': 'form-control description', 'type': 'text', 'placeholder': 'Description', 'value': transactions[t].description})

//         let date = document.createElement('input')
//         setAttributes(date, {'class': 'form-control', 'type': 'date', 'value': transactions[t].date})

//         let updateBtn = document.createElement('button')
//         setAttributes(updateBtn, {'class': 'btn btn-outline-primary'})
//         updateBtn.innerText = 'Update'
//         updateBtn.addEventListener( 'click', function() {
//             group[name].updateTransaction(t, cost.value, category.value, description.value, date.value)
//         } )

//         let deleteBtn = document.createElement('button')
//         setAttributes(deleteBtn, {'class': 'btn btn-outline-secondary'})
//         deleteBtn.innerText = 'Delete'
//         deleteBtn.addEventListener( 'click', function() {
//             group[name].deleteTransaction(t)
//             CompTransactionsListing(parentElement, name)
//         } )

//         parentElement.append(transactionsDiv)
//         transactionsDiv.appendChild(date)
//         transactionsDiv.appendChild(cost)
//         transactionsDiv.appendChild(category)
//         transactionsDiv.appendChild(description)
//         transactionsDiv.appendChild(updateBtn)
//         transactionsDiv.appendChild(deleteBtn)
//     }
// }

// function CompTransactionInfo(parentElement, name) {
//     let div = document.createElement('div')
//     setAttributes(div, {'class': 'transactionInfo'})
//     parentElement.appendChild(div)

//     let transactionsListingDiv = document.createElement('div')
//     setAttributes(transactionsListingDiv, {'class': 'transactionsListing container-lg'})
//     div.appendChild(transactionsListingDiv)

//     CompNewTransaction(div, transactionsListingDiv, name)
//     CompTransactionsListing(transactionsListingDiv, name)
// }

// function memberInfoToDOM() {
//     people = document.querySelector('#people')
//     // people.innerHTML = ''
//     for (let name in group) {
//         let accordionBody = CompAccordionItem(name, people)[4]
//         CompEditMember(accordionBody, name)
//         CompTransactionInfo(accordionBody, name)
//     }
// }

// function addPersonfromDOM() {
//     let name = document.querySelector("#personName");
//     let split = document.querySelector("#personSplit");
//     group.addPerson(name.value, split.value);
//     name.value = '';
//     split.value = '';
//     location.reload()
// }

// function repaymentsToDOM() {
//     let div = document.querySelector('#repayments')
//     div.innerHTML = ''

//     let repayments = group.calculateRepayments()
//     if (repayments.length < 1) div.innerHTML = 'No repayments required'
//     for (let repayment of repayments) {
//         let p = document.createElement('p')
//         p.innerText = repayment[0] + ' owes ' + repayment[1] + ' $' + repayment[2]
//         div.appendChild(p)
//     }
// }


// // On load
// group = Group.prototype.fromLocalStorage()
// memberInfoToDOM()

// createPersonBtn.addEventListener('click', addPersonfromDOM)
// repaymentsBtn.addEventListener('click', repaymentsToDOM)
// resetGroupBtn.addEventListener('click', function() {
//     group = new Group()
//     Group.prototype.toLocalStorage(group)
//     location.reload()
// })