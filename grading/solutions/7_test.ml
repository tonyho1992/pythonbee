
let () =
  assert(camel [5;7;8] = Some 8);
  assert(camel [9] = Some 9);
  assert(camel [] = None)

