from code import *
import json
import pprint

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
	inS = open(in_path, 'r').read()
	outS = open(out_path, 'r').read()
	fin = json.loads(inS)
	fout = json.loads(outS)
	for i in fin:
		data = fin[i]
		if(fun(*data) == fout[i]):
			print bcolors.OKGREEN + '[PASSED] ' + bcolors.ENDC + str(data) + '==' + str(fout[i])
		else:
			print bcolors.FAIL + '[FAILED]' + bcolors.ENDC + str(data) + '!=' + str(fout[i])

if __name__ == "__main__":
	import sys
	probNum = sys.argv[1]
	in_path = "problems/" + probNum + "/input.txt"
	out_path = "problems/" + probNum + "/output.txt"
	test_inputs(in_path, out_path)
