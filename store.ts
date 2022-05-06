import * as db from "https://raw.githubusercontent.com/cybertim/SmallSQLiteORM/main/mod.ts";

export class User extends db.SSQLTable {
  userName = "";
  address = "";
  active = false;
  age = 0;
}

export class Log extends db.SSQLTable {
  userId = -1;
  insertDate = new Date().getDate();
  description = "";
  status = 0;
}

export class Database {
  orm = new db.SSQL("test.db", [User, Log]);

  addUser(text: string) {
    const u = new User();
    u.userName = text;
    this.orm.save(u);
    return true;
  }
  fetch() {
    return this.orm.findMany(User, {});
  }
}
