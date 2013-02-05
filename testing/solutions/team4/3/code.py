def fun(a):
	if len(a)==0:
		return 1
	return a[0]*fun(a[1:])