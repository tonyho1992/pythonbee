(* output the sum of the elements greater than 5 *)
let camel lst = List.fold_left (+) 0 (List.filter (fun x -> x > 5) lst)
