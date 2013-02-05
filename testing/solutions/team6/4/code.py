def fun(a):
	l=""
	for x in a:
		if len(l)<len(x):
			l=x
	return l