def fun(l):
	m=0
	s=''
	for x in l:
		if len(x)>m:
			m=len(x)
			s=x
	return s