#!/bin/bash

NUMPROBS=2

for prob in $(jot $NUMPROBS)
do
    cp $prob.ml ${prob}_run.ml
    cat ${prob}_test.ml >> ${prob}_run.ml
    ocamlc -o ${prob}_run ${prob}_run.ml
    ./${prob}_run
done