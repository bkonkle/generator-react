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
const BaseGenerator_1 = __importDefault(require("../base/BaseGenerator"));
var ReactTarget;
(function (ReactTarget) {
    ReactTarget["web"] = "web";
    ReactTarget["mobile"] = "mobile";
})(ReactTarget = exports.ReactTarget || (exports.ReactTarget = {}));
class ReactGenerator extends BaseGenerator_1.default {
    constructor() {
        super(...arguments);
        this.extraQuestions = [
            {
                type: 'confirm',
                name: 'useApollo',
                message: 'Include React Apollo:',
                default: false,
                store: true,
            },
        ];
        this.target = ReactTarget.web;
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            yield BaseGenerator_1.default.prototype.prompting.call(this);
            this.config.set('target', this.target);
        });
    }
    writing() {
        BaseGenerator_1.default.prototype.writing.call(this);
        const config = this.config.getAll();
        // Copy over shared static files from the react generator
        this.fs.copy(this.templatePath('../../../src/react/static/**/*'), this.destinationRoot(), {
            globOptions: { dot: true },
        });
        // // Render shared templates from the react generator
        // this.renderTemplates('../../../src/react/templates/**/*')
        // Move some extra dotfiles into place
        this.renameDotfiles(['babelrc']);
        if (config.useApollo) {
            // Render shared templates from the react generator's apollo folder
            this.renderTemplates('../../../src/react/apollo/templates/**/*');
        }
    }
}
exports.default = ReactGenerator;
//# sourceMappingURL=ReactGenerator.js.map