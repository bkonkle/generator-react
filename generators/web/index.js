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
const ReactGenerator_1 = __importDefault(require("../../src/react/ReactGenerator"));
class WebGenerator extends ReactGenerator_1.default {
    constructor() {
        super(...arguments);
        this.subgenerator = 'web';
    }
    initializing() {
        ReactGenerator_1.default.prototype.initializing.call(this);
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            return ReactGenerator_1.default.prototype.prompting.call(this);
        });
    }
    writing() {
        ReactGenerator_1.default.prototype.writing.call(this);
        // Move some extra dotfiles into place
        this.renameDotfiles(['dockerignore']);
    }
    install() {
        ReactGenerator_1.default.prototype.install.call(this);
    }
}
exports.default = WebGenerator;
//# sourceMappingURL=index.js.map