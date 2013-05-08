import argparse
import os
import pymongo
import sys

# Command line argument parsing
parser = argparse.ArgumentParser("Read submissions")
parser.add_argument("probNum", type=int, help="problem number")
parser.add_argument("-p", "--port", type=int, help="mongo port",
                    default=3002, dest="port")
args = vars(parser.parse_args())
print args

# Connection to running mongo instance
con = pymongo.Connection(host='127.0.0.1', port=args["port"])
db = con.meteor
pythonCode = db.pythonCode

# Grab the submissions
probNum = args["probNum"]
directory = str(probNum)
if not os.path.exists(directory):
    os.makedirs(directory)

# Write the submissions out to a file
for ele in pythonCode.find():
    if ele["prob"] == probNum:
        team = str(ele["team"])
        code = str(ele["code"])
        outfile = directory + "/" + team + ".ml"
        file = open(outfile, "wb")
        file.write(code)
        file.close()
        print "Writing file:", outfile
