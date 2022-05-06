/** @jsx h */
import { h, PageProps } from "../client_deps.ts";
import { Database, User } from "../store.ts";
import { Handlers } from "../server_deps.ts";

const db = new Database();

export default function Home({ data }: PageProps<PageData | null>) {
  if (!data) {
    return <h1>Error</h1>;
  }

  return (
    <div>
      <form method="POST">
        <input type="text" name="username" />
        <button type="submit">Add</button>
      </form>

      {data.users.length > 0
        ? data.users.map((i) => <div>{i.userName}</div>)
        : <div>Not Found</div>}
    </div>
  );
}

interface PageData {
  users: User[];
}

export const handler: Handlers<PageData> = {
  async POST(req, ctx): Promise<Response> {
    const form = await req.formData();
    const text = form.get("username");
    if (typeof text !== "string") {
      return new Response("misformed form", { status: 400 });
    }
    db.addUser(text);
    return Response.redirect(req.url, 303);
  },
  GET(_, ctx) {
    const p = {
      users: db.fetch(),
    };
    return ctx.render(p);
  },
};
