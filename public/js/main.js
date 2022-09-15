function calculateShare(group) {
     // Parameters:
        // group: Object where each property is an object representing a person. The object has the properties:
            // contrib: Number. Amount contributed to group.
            // split: Number. Proportion of the total that they are responsible for. Splits converted to percentages of the splitSum.
    // Returns:
        // group: Modifies the input object to add the following property:
            // share: Number. The amount owed to the group, based on their contribution minus what they are responsible for (sum * split).
            // The sum of share for all perople is 0.
    let sum = Object.values(group).reduce( (sum, person) => sum + person.contribution, 0);
    let splitSum = Object.values(group).reduce( (splitSum, person) => splitSum + person.split, 0);
    for (i in group) {
        group[i].split = group[i].split / splitSum
        group[i].share = (group[i].contribution - sum * group[i].split).toFixed(2)
    }
    return group
}
