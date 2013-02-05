def fun(n):
	if  len(n)==1:
		return n [0]
	return [ fun(n [ 1 : ] ) , n [ 0 ] ]