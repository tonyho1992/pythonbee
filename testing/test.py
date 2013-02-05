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

def test_inputs(in_path, out_path):
	in_arr = open(in_path, 'r').readlines()
	out_arr = open(out_path, 'r').readlines()
	failCount = 0
	for i, ele in enumerate(in_arr):
		inValue = eval(ele)
		outValue = eval(out_arr[i])
		try: # need to catch for infinite loops still
			if(fun(*inValue) == outValue):
				print bcolors.OKGREEN + '[PASSED] ' + bcolors.ENDC + 'fun(' + str(inValue) + ') == ' + str(outValue)
			else:
				print bcolors.FAIL + '[FAILED] ' + bcolors.ENDC + 'fun(' + str(inValue) + ') != ' + str(outValue)
				return False
		except:
			print bcolors.FAIL + '[FAILED] ' + bcolors.ENDC + "code.py has a runtime error"
			return False
	return True

if __name__ == "__main__":
	import sys
	if (len(sys.argv) == 1):
		print "Not enough Args. Use Case: python test.py 0 or python test.py 0 path/to/code.py"
		sys.exit()
	probNum = sys.argv[1]
	if (len(sys.argv) > 2):
		fin=open(sys.argv[2],"r")
		fout=open("code.py","w")
		fout.write(fin.read())
		fout.close()
		fin.close()
	try:
		from code import *
	except:
		print bcolors.FAIL + '[FAILED] ' + bcolors.ENDC + "code.py has syntax error"
		sys.exit()
	in_path = "problems/" + probNum + "/input.txt"
	out_path = "problems/" + probNum + "/output.txt"
	if(test_inputs(in_path, out_path) and len(sys.argv) > 2):
		print sys.argv[2].split('/')[1] + " SOLVED CORRECTLY"
