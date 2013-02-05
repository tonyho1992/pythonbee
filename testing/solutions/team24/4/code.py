def fun(A):
	V=0
	n = 0
	for i in A:
		if len(i)> n:
			n=len(i)
			V=i
	return V