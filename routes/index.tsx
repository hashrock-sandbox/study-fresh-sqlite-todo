/** @jsx h */
import { h, PageProps } from "../client_deps.ts";
import { Database } from "../store.ts";
import { Handlers } from "../server_deps.ts";

const db = new Database();

export default function Home({ data }: PageProps<User[] | null>) {
  if (!data) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <form method="POST">
        <input type="text" name="text" />
        <button type="submit" style="margin-left: 4px">Add</button>
      </form>

      {data.length > 0
        ? data.map((i) => <div>{i.userName}</div>)
        : <div>Not Found</div>}
    </div>
  );
}

interface User {
  userName: string;
}

export const handler: Handlers<User[]> = {
  async POST(req, ctx): Promise<Response> {
    const form = await req.formData();
    const text = form.get("text");
    if (typeof text !== "string") {
      return new Response("misformed form", { status: 400 });
    }
    db.addUser(text);
    return Response.redirect(req.url, 303);
  },
  async GET(_, ctx) {
    const u: User[] = await db.fetch();
    return ctx.render(u);
  },
};
