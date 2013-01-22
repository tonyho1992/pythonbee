from code import *

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
		if(fun(*inValue) == outValue):
			print bcolors.OKGREEN + '[PASSED] ' + bcolors.ENDC + 'fun(' + str(inValue) + ') == ' + str(outValue)
		else:
			print bcolors.FAIL + '[FAILED] ' + bcolors.ENDC + 'fun(' + str(inValue) + ') != ' + str(outValue)

if __name__ == "__main__":
	import sys
	probNum = sys.argv[1]
	in_path = "problems/" + probNum + "/input.txt"
	out_path = "problems/" + probNum + "/output.txt"
	test_inputs(in_path, out_path)
