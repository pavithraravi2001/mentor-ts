import crypto from "crypto";
import { User } from "./model";

let user;

beforeAll(async () => {
  user = await User.create({
    name: "user",
    email: "a@a.com",
    password: "123456",
  });
});

describe("set email", () => {
  it("sets name automatically", () => {
    user.name = "";
    user.email = "test@example.com";
    expect(user.name).toBe("test");
  });

  it("sets profileURL automatically", () => {
    const hash = crypto.createHash("md5").update(user.email).digest("hex");
    expect(user.profileURL).toBe(
      `https://gravatar.com/avatar/${hash}?d=identicon`
    );
  });

  it("changes profileURL when it is gravatar", () => {
    user.email = "b@b.com";
    const hash = crypto.createHash("md5").update(user.email).digest("hex");
    expect(user.profileURL).toBe(
      `https://gravatar.com/avatar/${hash}?d=identicon`
    );
  });

  it("does not change profileURL when it is already set and is not gravatar", () => {
    user.profileURL = "not_gravatar.jpg";
    user.email = "c@c.com";
    expect(user.profileURL).toBe("not_gravatar.jpg");
  });
});

describe("authenticate", () => {
  it("returns the user when authentication succeeds", async () => {
    expect(await user.authenticate("123456")).toBe(user);
  });

  it("returns false when authentication fails", async () => {
    expect(await user.authenticate("blah")).toBe(false);
  });
});
