def fun(l):
	a=l[0]
	for i in l:
		if len(i)>len(a):
			a=i
	return a
#don