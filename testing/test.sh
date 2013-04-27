#!/bin/bash

prob=$1

# Compile our solution
cd solutions
cp $prob.ml ${prob}_run.ml
cat ${prob}_test.ml >> ${prob}_run.ml
ocamlc -o ${prob}_run ${prob}_run.ml

# Grab submissions
cd ..
python readprobs.py $prob
cd $prob

for team in $(ls)
do
    echo "Testing $team..."
    team=${team%???}

    # Compile their source code and run it
    cp $team.ml ${team}_run.ml
    cat ../solutions/${prob}_test.ml >> ${team}_run.ml
    ocamlc -o ${team}_run ${team}_run.ml
    ./${team}_run
done