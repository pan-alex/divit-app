// Simple group
group1 = new Group()
group1.add('A', 0.5)
group1.add('B', 0.5)
group1['A'].addTransaction(20)
group1['B'].addTransaction(10)
calculateRepayments(group1) // ['B', 'A', 5]
// Adding transactions
group1['B'].addTransaction(30) // ['A', 'B', 10]
calculateRepayments(group1)
// Updating splits
group1['B'].changeSplit(1.5)
calculateRepayments(group1)  // ['B', 'A', 5]
// No one owes anyone
group1['B'].addTransaction(20)
calculateRepayments(group1)  // ['B', 'A', 5]



// Decimal math with irrational numbers
group2 = new Group()
group2.add('A', 20)
group2.add('B', 20)
group2.add('C', 20)
group2['A'].addTransaction(20)
group2['B'].addTransaction(5)
group2['C'].addTransaction(10)
calculateRepayments(group2)

// Larger group
group3 = new Group()
group3.add('A', 20)
group3.add('B', 20)
group3.add('C', 40)
group3.add('D', 15)
group3['A'].addTransaction(20)
group3['B'].addTransaction(10)
group3['D'].addTransaction(40)
calculateRepayments(group3)

// Casting an object to group class
group4 = {
    'A': {'name': 'A', 'contribution': 20, 'split': 1},
    'B': {'name': 'B', 'contribution': 10, 'split': 1},
    'C': {'name': 'C', 'contribution': 100, 'split': 1},
    'D': {'name': 'D', 'contribution': 40, 'split': 1}
}
group4 = Group.prototype.objToGroup(group4)
// Group class methods work
group4.add('E', 1)
group4['E'].addTransaction(20)
calculateRepayments(group4)

group4.delete('E')
calculateRepayments(group4)
// Person class methods work
group4['A'].addTransaction(10)
calculateShare(group4) // A contribution: 30



// Store in local storage
localStorage.removeItem('group')
location.reload()

group.add('A', 20)
group.add('B', 20)
group.add('C', 40)
group.add('D', 15)
group['A'].addTransaction(20)
group['B'].addTransaction(10)
group['D'].addTransaction(40)
calculateRepayments(group)
group.toLocalStorage()

// Retrieval from local storage
delete group
location.reload()

console.log(group)