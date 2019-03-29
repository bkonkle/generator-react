"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiGenerator_1 = __importDefault(require("../../src/api/ApiGenerator"));
class GraphQLGenerator extends ApiGenerator_1.default {
    constructor() {
        super(...arguments);
        this.subgenerator = 'graphql';
    }
    initializing() {
        ApiGenerator_1.default.prototype.initializing.call(this);
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            return ApiGenerator_1.default.prototype.prompting.call(this);
        });
    }
    writing() {
        ApiGenerator_1.default.prototype.writing.call(this);
    }
    install() {
        ApiGenerator_1.default.prototype.install.call(this);
    }
}
exports.default = GraphQLGenerator;
//# sourceMappingURL=index.js.map