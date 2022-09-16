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


function calculateRepayments(group) {
    // Parameters:
        // group: Object where each property is an object representing a person.
    // Returns:
        // repayments: Array representing the repayments each person should make so that no one owes anyone money.
            // Each element is a subarray representing one payment. It has the format [P, R, Amt] where P = payer, R = receiver, Amt = amount to pay.
            // A greedy approach is utilized where the person with the least credit pays the person with the most credit until all debts are paid.
    let people = []
    for (person in group) {
        people.push([person, group[person].credit]) // format: [name, credit]
    }
    payers = people.filter( a => a[1] < 0).sort( (a,b) => a[1] - b[1]); // Sort lowest to highest credit
    receivers  = people.filter( a => a[1] > 0).sort( (a,b) => b[1] - a[1]); // Sort highest to lowest credit

    let repayments = []
    do {
        // Pay off the person with the most credit
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

