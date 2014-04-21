#!/bin/bash

NUMPROBS=7

for prob in $(seq $NUMPROBS)
do
    cp $prob.ml ${prob}_run.ml
    cat ${prob}_test.ml >> ${prob}_run.ml
    ocamlc -w -A -o ${prob}_run ${prob}_run.ml
    ./${prob}_run
done
