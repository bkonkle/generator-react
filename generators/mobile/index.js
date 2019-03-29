"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ReactGenerator_1 = __importStar(require("../../src/react/ReactGenerator"));
class MobileGenerator extends ReactGenerator_1.default {
    constructor() {
        super(...arguments);
        this.subgenerator = 'mobile';
        this.target = ReactGenerator_1.ReactTarget.mobile;
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
    }
    install() {
        ReactGenerator_1.default.prototype.install.call(this);
    }
}
exports.default = MobileGenerator;
//# sourceMappingURL=index.js.map