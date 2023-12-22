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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('JWT Module', () => {
    const userId = '123';
    const options = { expiresIn: '1h' };
    test('sign function should return a valid JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, index_1.sign)(userId, options);
        expect(typeof token).toBe('string');
    }));
    test('signSync function should return a valid JWT token synchronously', () => {
        const token = (0, index_1.signSync)(userId, options);
        expect(typeof token).toBe('string');
    });
    test('verify function should successfully verify a valid JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, index_1.sign)(userId, options);
        const decoded = yield (0, index_1.verify)(token);
        expect(decoded.id).toBe(userId);
    }));
    test('verify function should throw an error for an invalid JWT token', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidToken = 'invalid.token.string';
        try {
            yield (0, index_1.verify)(invalidToken);
            expect(true).toBe(false);
        }
        catch (error) {
            expect(error.name).toBe('JsonWebTokenError');
        }
    }));
});
