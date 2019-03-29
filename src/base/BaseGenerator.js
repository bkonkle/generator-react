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
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const figlet_1 = require("figlet");
const path_1 = require("path");
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
class BaseGenerator extends yeoman_generator_1.default {
    constructor() {
        super(...arguments);
        this.subgenerator = '<BASE>';
        this.extraQuestions = [];
    }
    /***
     * Tasks
     */
    initializing() {
        this.log('\n');
        this.log(figlet_1.textSync('react', { font: 'Big Money-nw' }));
        this.log(`\n\nWelcome to ${chalk_1.default.blue(`@bkonkle/react:${this.subgenerator}`)}!\n`);
        this.config.set('year', new Date().getFullYear());
        try {
            const origin = child_process_1.execSync('git config --get remote.origin.url');
            if (origin.toString()) {
                this.config.set('repo', origin.toString().trim());
            }
        }
        catch (error) {
            // pass
        }
        try {
            const author = child_process_1.execSync('git config --get user.name');
            const email = child_process_1.execSync('git config --get user.email');
            if (author.toString() && email.toString()) {
                this.config.set('author', `${author.toString().trim()} <${email.toString().trim()}>`);
            }
        }
        catch (error) {
            // pass
        }
    }
    prompting() {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.config.getAll();
            const answers = yield this.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Your project name:',
                    default: path_1.basename(this.destinationRoot()),
                    store: true,
                },
                {
                    type: 'input',
                    name: 'description',
                    message: "The project's description:",
                    store: true,
                },
                {
                    type: 'input',
                    name: 'repo',
                    message: 'The repository url:',
                    default: config.repo,
                    store: true,
                },
                {
                    type: 'input',
                    name: 'author',
                    message: "The project's author:",
                    default: config.author,
                    store: true,
                },
                {
                    type: 'input',
                    name: 'keywords',
                    message: 'Comma-separated project keywords:',
                    filter: keywords => keywords
                        ? Array.isArray(keywords)
                            ? keywords.map(keyword => keyword.trim())
                            : keywords.split(',').map(keyword => keyword.trim())
                        : [],
                    store: true,
                },
                {
                    type: 'confirm',
                    name: 'useAuth0',
                    message: 'Include Auth0 authentication:',
                    default: false,
                    store: true,
                },
                ...this.extraQuestions,
            ]);
            Object.keys(answers).forEach(key => {
                this.config.set(key, answers[key]);
            });
        });
    }
    writing() {
        // Copy over shared static files from the base generator
        this.fs.copy(this.templatePath('../../../src/base/static/**/*'), this.destinationRoot(), {
            globOptions: { dot: true },
        });
        // Copy over static files
        this.fs.copy(this.templatePath('../static/**/*'), this.destinationRoot(), {
            globOptions: { dot: true },
        });
        // // Render shared templates from the base generator
        // this.renderTemplates('../../../src/base/templates/**/*')
        // Render templates
        this.renderTemplates('**/*');
        // Move the dotfiles into place
        this.renameDotfiles(['gitignore', 'huskyrc', 'editorconfig']);
    }
    install() {
        this.yarnInstall();
    }
    /***
     * Utilities
     */
    /**
     * Move dotfiles into place
     */
    renameDotfiles(dotfiles) {
        for (const file of dotfiles) {
            this.fs.move(this.destinationPath(file), this.destinationPath(`.${file}`));
        }
    }
    /**
     * Render templates recursively
     */
    renderTemplates(templatePath) {
        this.fs.copyTpl(this.templatePath(templatePath), this.destinationRoot(), this.config.getAll(), { globOptions: { dot: true } });
    }
}
exports.default = BaseGenerator;
//# sourceMappingURL=BaseGenerator.js.map