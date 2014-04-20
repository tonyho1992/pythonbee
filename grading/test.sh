#!/bin/bash

if [[ -z $1 ]]
then
    echo "usage: ./test.sh PROBNUM MONGOPORT"
    exit
fi

if [[ -z $2 ]]
then
    echo "usage: ./test.sh PROBNUM MONGOPORT"
    exit
fi

prob=$1
port=$2

# Compile our solution
cd solutions
./build.sh

# Grab submissions
cd ..
python readprobs.py $prob --port=$port
cd $prob

for team in $(ls)
do
    echo "Testing $team..."
    team=${team%???}

    # Compile their source code and run it
    cp $team.ml ${team}_run.ml
    cat ../solutions/${prob}_test.ml >> ${team}_run.ml
    ocamlfind ocamlopt -linkpkg -thread -package core ${team}_run.ml -o ${team}_run
    ./${team}_run
done