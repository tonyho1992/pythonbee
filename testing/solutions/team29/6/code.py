#f r l o o p u s e n e g i n d e x - 1 = l a s t
def fun(a):
	l=[]
	for i in range(len(a)):
		l+=a[len(a)-i]
	return l
#a [ - i ] w o r k s 