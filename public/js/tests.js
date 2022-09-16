group1 = {
    'A': {'contribution': 20, 'split': 0.5},
    'B': {'contribution': 10, 'split': 0.5}
}
group1 = calculateShare(group1)
payments1 = calculateRepayments(group1)

group2 = {
    'A': {'contribution': 20, 'split': 20},
    'B': {'contribution': 5, 'split': 20},
    'C': {'contribution': 10, 'split': 20},
}
group2 = calculateShare(group2)
payments2 = calculateRepayments(group2)

group3 = {
    'A': {'contribution': 20, 'split': 20},
    'B': {'contribution': 10, 'split': 20},
    'C': {'contribution': 0, 'split': 40},
    'D': {'contribution': 40, 'split': 15}
}
group3 = calculateShare(group3)
payments3 = calculateRepayments(group3)
