group1 = new Group()
group1.add('A', 0.5)
group1.add('B', 0.5)
group1['A'].addTransaction(20)
group1['B'].addTransaction(10)
group1.calculateRepayments()

group2 = new Group()
group2.add('A', 20)
group2.add('B', 20)
group2.add('C', 20)
group2['A'].addTransaction(20)
group2['B'].addTransaction(5)
group2['C'].addTransaction(10)
group2.calculateRepayments()

group3 = new Group()
group3.add('A', 20)
group3.add('B', 20)
group3.add('C', 40)
group3.add('D', 15)
group3['A'].addTransaction(20)
group3['B'].addTransaction(10)
group3['D'].addTransaction(40)
group3.calculateRepayments()