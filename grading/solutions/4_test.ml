
let () =
  assert(camel [(5,5); (6,8); (-5,0)] = [5;8;0]);
  assert(camel [(-4,4)] = [4]);
  assert(camel [(6,6); (7,-3)] = [6;7])
