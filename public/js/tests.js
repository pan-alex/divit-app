
group1 = {
    'A': {'contribution': 20, 'split': 0.5},
    'B': {'contribution': 10, 'split': 0.5}
}


group2 = {
    'A': {'contribution': 20, 'split': 20},
    'B': {'contribution': 10, 'split': 20}
}

group3 = {
    'A': {'contribution': 20, 'split': 20},
    'B': {'contribution': 10, 'split': 20},
    'C': {'contribution': 0, 'split': 40},
    'D': {'contribution': 40, 'split': 15}
}


calculateShare(group1)
calculateShare(group2)
calculateShare(group3)