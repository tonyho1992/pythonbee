#! /bin/bash
for PROB in {0..1}
do
	for TEAM in {1..2}
	do
		python test.py $PROB solutions/team$TEAM/$PROB/code.py
	done
done