# m a k e a s t r i n g o f t h e u n i q u e
def fun(s):
	u=""
	for x in s:
		if not x in u:
			u+=x
	return len(u)