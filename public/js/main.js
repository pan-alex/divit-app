function m(n) {
    // Converts numbers to "money" by changing them to numbers with 2 decimal places.
    // Longer term use actual currency data types.
    return Number(n.toFixed(2))
}
// const m = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2})



function calculateShare(group) {
     // Parameters:
        // group: Object where each property is an object representing a person. The object has the properties:
            // contrib: Number. Amount contributed to group.
            // split: Number. Proportion of the total that they are responsible for. Splits converted to percentages of the splitSum.
    // Returns:
        // group: Modifies the input object to add the follpayer property:
            // credit: Number. The amount receiver to the group, based on their contribution minus what they are responsible for (sum * split).
            // The sum of credit for all perople is 0.
    let sum = Object.values(group).reduce( (sum, person) => sum + person.contribution, 0);
    let splitSum = Object.values(group).reduce( (splitSum, person) => splitSum + person.split, 0);
    for (i in group) {
        group[i].split = group[i].split / splitSum
        group[i].credit = m(group[i].contribution - sum * group[i].split)
    }
    return group
}


// Determine the best way to allocate funds (minimum number of transactions)

// Likely a greedy approach is easiest:
    // Person with least credit pays out to the person with most credit.
        // This person continues paying out until all others are at 0.
    // Person with the next least credit pays out the person with the most credit remaining
    // Repeat until all credits are 0.
// Return an array with person payer, person receiver to, amount.
// [
//   [A, B, 15] -> A pays B 15.
//   [C, D, 5] -> C pays D 5.
// ]

function calculateRepayments(group) {
    // People, sorted by most payer to least payer.
    let people = []
    for (person in group) {
        people.push([person, group[person].credit]) // format: [name, credit]
    }
    payers = people.filter( a => a[1] < 0).sort( (a,b) => a[1] - b[1]); // Sort lowest to highest credit
    receivers  = people.filter( a => a[1] > 0).sort( (a,b) => b[1] - a[1]); // Sort highest to lowest credit

    // Calculate repayments
    let repayments = []
    do {
        // Pay off the person with the most credit
        let payer = payers[0];
        let receiver = receivers[0];
        let diff = +receiver[1] + +payer[1]
        if (diff < 0) {
            // If payer owes more than receiver is owed:
                // receiver is paid all credit
                // receiver credit is added to payer credit.
                // receiver is removed as credit is 0.
            payer[1] =  m(payer[1] + receiver[1]);
            repayments.push( [payer[0], receiver[0], m(receiver[1])] )
            receivers.shift()
        } else if (diff > 0) {
            // If payer owes less than receiver is owed:
                // payer pays off all debt
                // payer payment is subtracted from receiver credit
                // payer is removed as credit is 0.
            receiver[1] = m(receiver[1] + payer[1]);
            repayments.push( [payer[0], receiver[0], m(-payer[1])] )
            payers.shift()
        } else {
            // If amount is equal
                // No math needed; remove both payer and receiver as their credit is 0.
            repayments.push( [payer[0], receiver[0], m(receiver[1])] )
            receivers.shift()
            payers.shift()
        }
    } while (payers.length > 0 && receivers.length > 0)
    return repayments
}

