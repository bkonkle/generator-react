"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseGenerator_1 = __importDefault(require("../base/BaseGenerator"));
class ReactGenerator extends BaseGenerator_1.default {
    constructor() {
        super(...arguments);
        this.extraQuestions = [
            {
                type: 'confirm',
                name: 'apollo',
                message: 'Include react-apollo:',
                default: false,
                store: true,
            },
        ];
    }
    writing() {
        BaseGenerator_1.default.prototype.writing.call(this);
        // Copy over shared static files from the react generator
        this.fs.copy(this.templatePath('../../../src/react/static/**/*'), this.destinationRoot(), {
            globOptions: { dot: true },
        });
        // Move some extra dotfiles into place
        this.renameDotfiles(['babelrc']);
    }
}
exports.default = ReactGenerator;
//# sourceMappingURL=ReactGenerator.js.map