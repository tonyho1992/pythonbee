def fun(l):
	m=0
	f=''
	for i in l:
		if len(i)>m:
			f=i
			m=len(i)
	return f
