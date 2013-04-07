import pymongo
import sys
import os

printing = True
class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'

    def disable(self):
        self.HEADER = ''
        self.OKBLUE = ''
        self.OKGREEN = ''
        self.WARNING = ''
        self.FAIL = ''
        self.ENDC = ''

def test_inputs(probNum, fun):
	in_path = "problems/" + probNum + "/input.txt"
	out_path = "problems/" + probNum + "/output.txt"
	in_arr = open(in_path, 'r').readlines()
	out_arr = open(out_path, 'r').readlines()
	failCount = 0
	for i, ele in enumerate(in_arr):
		inValue = eval(ele)
		outValue = eval(out_arr[i])
		try: # need to catch for infinite loops still
			if(fun(*inValue) == outValue):
				if printing:
					print bcolors.OKGREEN + '[PASSED] ' + bcolors.ENDC + 'fun(' + str(inValue) + ') == ' + str(outValue)
			else:
				if printing:
					print bcolors.FAIL + '[FAILED] ' + bcolors.ENDC + 'fun(' + str(inValue) + ') != ' + str(outValue) 
				return False
		except:
			if printing:
				print bcolors.FAIL + '[FAILED] ' + bcolors.ENDC + "code.py has a runtime error"
			return False
	return True

con = pymongo.Connection(host='127.0.0.1', port=3002)
db = con.meteor
pythonCode = db.pythonCode
COMMANDS=open("commands.txt", "w")
probNum = sys.argv[1]
for ele in pythonCode.find():
	try:
		exec ele["code"]
		test_inputs(probNum, fun)
	except Exception as e:
		print e
