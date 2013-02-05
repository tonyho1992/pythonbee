def fun(n):
	if  len(n)==1:
		return n[0]
	return n[0]*fun(n[1: ])