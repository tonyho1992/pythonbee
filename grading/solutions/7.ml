(* output an int option of the last element of the list *)
let rec camel lst =
  match lst with
    | [] -> None
    | [x] -> Some x
    | _::xs -> camel xs
