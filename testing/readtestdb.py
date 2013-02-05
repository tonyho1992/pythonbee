import pymongo
import sys
import os
con = pymongo.Connection(host='127.0.0.1', port=3002)
db = con.meteor
pythonCode = db.pythonCode
COMMANDS=open("commands.txt", "w")
for ele in pythonCode.find({"prob":int(sys.argv[1])}):
	filename = "solutions/"+ele["team"]+"/"+str(ele["prob"])+"/code.py"
	fout = open(filename, "w")
	fout.write(ele["code"])
	command = filename + '\n'
	COMMANDS.write(command)
COMMANDS.close()