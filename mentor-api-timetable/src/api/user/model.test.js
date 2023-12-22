"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const model_1 = require("./model");
let user;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    user = yield model_1.User.create({
        name: "user",
        email: "a@a.com",
        password: "123456",
    });
}));
describe("set email", () => {
    it("sets name automatically", () => {
        user.name = "";
        user.email = "test@example.com";
        expect(user.name).toBe("test");
    });
    it("sets profileURL automatically", () => {
        const hash = crypto_1.default.createHash("md5").update(user.email).digest("hex");
        expect(user.profileURL).toBe(`https://gravatar.com/avatar/${hash}?d=identicon`);
    });
    it("changes profileURL when it is gravatar", () => {
        user.email = "b@b.com";
        const hash = crypto_1.default.createHash("md5").update(user.email).digest("hex");
        expect(user.profileURL).toBe(`https://gravatar.com/avatar/${hash}?d=identicon`);
    });
    it("does not change profileURL when it is already set and is not gravatar", () => {
        user.profileURL = "not_gravatar.jpg";
        user.email = "c@c.com";
        expect(user.profileURL).toBe("not_gravatar.jpg");
    });
});
describe("authenticate", () => {
    it("returns the user when authentication succeeds", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield user.authenticate("123456")).toBe(user);
    }));
    it("returns false when authentication fails", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(yield user.authenticate("blah")).toBe(false);
    }));
});
