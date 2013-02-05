def fun(l):
	m=l
	m=""
	for e in l:
		if len(e)>len(m):
			m=e
	return m