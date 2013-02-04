import pymongo
import test

con = pymongo.Connection(host='127.0.0.1', port=3002)
db = con.meteor
pythonCode = db.pythonCode
for ele in pythonCode.find({}):
	fout = open("solutions/"+ele["team"]+"/"+str(ele["prob"])+"/code.py", "w")
	fout.write(ele["code"])
	in_path = "problems/" + probNum + "/input.txt"
	out_path = "problems/" + probNum + "/output.txt"
	test_inputs(in_path, out_path)
