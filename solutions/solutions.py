def add(a,b):
    return a+b

def squared(n):
    return n*n
    
def longestword(sentence):
    return sorted(sentence.split(" "),key=lambda x: len(x))[-1]
    
def average(lst):
    return float(sum(lst))/len(lst)

def sum_to_n(n):
    return sum(range(n+1))

def repeat_n_times(str,n):
    return str*n

def doesAppear(arr,n):
    return n in arr

def isBetween(lst):
    return (lst[1] < lst[0] < lst[2])

def lstMax(lst):
    return sorted(lst)[-1]

def sortLst(lst):
    return sorted(lst)

def numDistinct(str):
    return len(set(list(str)))

def concatAll(lst):
    return ''.join(lst)

def allLower(str):
    return str.lower()

def prodAll(lst):
    return reduce(lambda x,y: x*y, lst)

def longestwordcount(sentence):
    return len(sorted(sentence.split(" "),key=lambda x: len(x))[-1])

def twosum(lst,n):
    lst = sorted(lst)
    print lst
    
if __name__ == "__main__":
    twosum([1,2,3,4,5],7)

    # print add(2,3) == 5
    # print add(4,5) == 9
    # print add(0,0) == 0
    # print add(-1,-1) == -2
    # print add(-1,12) == 11
    # print squared(2)
    # print squared(-4)
    # print longestword("Last year we used a lot of napkins at Harvard")
    # print longestword("A BB CCC DDDD EEEEE OVER THE HILL")
    # print average([1,2,3,4,5,6])
    # print average([3,5,7])
    # print sum_to_n(5)
    # print sum_to_n(1)
    # print sum_to_n(3)
    # print sum_to_n(10)
    # print repeat_n_times("Hi",3)
    # print repeat_n_times("Bye",4)
    # print repeat_n_times("Whee",5)
    # print doesAppear([1,2,3,4,5,6],5)
    # print doesAppear([3,5,7],1)
    # print isBetween([1, 2, 3])
    # print isBetween([5, 4, 7])
    # print isBetween([4, 4, 5])
    # print isBetween([5, 4, 5])
    # print lstMax([4,5,6,1,2,3])
    # print lstMax([6,2,5,3,1])
    # print sortLst([4,5,6,1,2,3])
    # print sortLst([6,2,5,3,1])
    # print numDistinct("test") == 3
    # print numDistinct("unique") == 5
    # print numDistinct("aaaaa") == 1
    # print numDistinct("abcabcabcabc") == 3
    # print concatAll(['a','b','cd','def'])
    # print allLower("PIN")
    # print allLower("aBcD")
    # print prodAll([1,2,3,4,5])
    # print longestwordcount("Last year we used a lot of napkins at Harvard")
    # print longestwordcount("A BB CCC DDDD EEEEEE OVER THE HILL")
    # print longestwordcount("hello world")
    # print longestwordcount("goodbye world")
    