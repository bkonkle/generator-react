"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = __importDefault(require("../base/BaseGenerator"));
class ApiGenerator extends BaseGenerator_1.default {
    writing() {
        BaseGenerator_1.default.prototype.writing.call(this);
        // Copy over shared static files from the api generator
        this.fs.copy(this.templatePath('../../../src/api/static/**/*'), this.destinationRoot(), {
            globOptions: { dot: true },
        });
    }
}
exports.default = ApiGenerator;
//# sourceMappingURL=ApiGenerator.js.map