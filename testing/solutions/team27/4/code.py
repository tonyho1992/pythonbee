# l e n ( ) 
def fun(l):
	m=""
	for x in l:
		if len(x) > len(m):
			m = x
	return m
