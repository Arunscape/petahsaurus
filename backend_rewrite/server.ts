import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import findingRouter from "./routes/finding.ts"
import Finding from './interfaces/Finding.ts'

const app = new Application();

const router = new Router();

router.get("/", ({ response }: { response: any }) => {
  response.body = {
    message: "hello world",
  };
});


app.use(router.routes());
app.use(findingRouter.routes())
app.use(router.allowedMethods())

app.addEventListener("listen", ({ secure, hostname, port }) => {
    const protocol = secure ? "https://" : "http://";
    const url = `${protocol}${hostname ?? "localhost"}:${port}`;
    console.log(`Listening on: ${url}`);
  });

await app.listen("0.0.0.0:5000");
