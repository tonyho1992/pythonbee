#! /bin/bash
for PROB in {1..7}
do
	for TEAM in {1..35}
	do
		python test.py $PROB solutions/team$TEAM/$PROB/code.py
	done
done