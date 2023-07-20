import { Button } from "@/components/ui/Button";

export default async function Home() {
  var Odoo = require("async-odoo-xmlrpc");
  var odoo = new Odoo({
    url: "http://localhost",
    port: "8110",
    db: "test",
    username: "admin",
    password: "admin",
  });
  const test = await odoo.connect();
  console.log(test);
  let id = await odoo.execute_kw("account.invoice", "search", [[]]);
  return (
    <main>
      <Button className="animate-in zoom-in duration-500">click</Button>
      <h1>{test} u</h1>
    </main>
  );
}
