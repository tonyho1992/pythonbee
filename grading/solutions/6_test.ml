
let () =
  assert(not (camel [5;6;7]));
  assert(camel [5;8;9;8;5]);
  assert(camel [1])
