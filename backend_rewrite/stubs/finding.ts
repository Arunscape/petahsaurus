import { v4 } from "https://deno.land/std/uuid/mod.ts";
// interface
import Finding from '../interfaces/Finding.ts';

let findings: Finding[] = [
  {
    id: v4.generate(),
  },
  {
    id: v4.generate(),
  },
];

export default findings;