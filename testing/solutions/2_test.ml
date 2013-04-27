
let () =
  assert(camel [0;1;5] = 6);
  assert(camel [-5;-5;10] = 0);
  assert(camel [] = 0)
