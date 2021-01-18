import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
// controller
import findingController from "../controllers/finding.ts";

router
  .get("/finding", findingController.getAllFindings)

export default router;