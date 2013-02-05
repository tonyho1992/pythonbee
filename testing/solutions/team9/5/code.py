def fun(s):
	#    l o o p t a n d k e e p a r r o f s e e n 
	seen =[]
	for i in s:
		if i not in seen:
			seen.append(i)
	return len(seen)