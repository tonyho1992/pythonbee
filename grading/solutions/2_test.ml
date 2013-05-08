
let () =
  assert(camel [0;1;5] = [5;1;0]);
  assert(camel [-5] = [-5]);
  assert(camel [] = [])
