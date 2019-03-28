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
const path_1 = require("path");
const child_process_1 = require("child_process");
const figlet_1 = require("figlet");
const yeoman_generator_1 = __importDefault(require("yeoman-generator"));
const chalk_1 = __importDefault(require("chalk"));
class WebGenerator extends yeoman_generator_1.default {
    initializing() {
        this.log('\n');
        this.log(figlet_1.textSync('react', { font: 'Big Money-nw' }));
        this.log(`\n\nWelcome to ${chalk_1.default.blue('@bkonkle/react')}!\n`);
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
            const answers = yield this.prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: 'Your project name:',
                    default: path_1.basename(this.destinationRoot()),
                },
                {
                    type: 'input',
                    name: 'description',
                    message: "The project's description:",
                },
                {
                    type: 'input',
                    name: 'repo',
                    message: 'The repository url:',
                    default: this.config.get('repo'),
                },
                {
                    type: 'input',
                    name: 'author',
                    message: "The project's author:",
                    default: this.config.get('author'),
                    store: true,
                },
                {
                    type: 'input',
                    name: 'keywords',
                    message: 'Comma-separated project keywords:',
                    filter: keywords => keywords ? keywords.split(',').map(keyword => keyword.trim()) : [],
                },
            ]);
            Object.keys(answers).forEach(key => {
                this.config.set(key, answers[key]);
            });
        });
    }
    writing() {
        // Copy over static files
        this.fs.copy(this.templatePath('../static/**/*'), this.destinationRoot(), {
            globOptions: { dot: true },
        });
        // Render templates
        this.fs.copyTpl(this.templatePath('**/*'), this.destinationRoot(), this.config.getAll(), { globOptions: { dot: true } });
        // Move the dotfiles into place
        const dotfiles = ['gitignore', 'huskyrc', 'editorconfig', 'dockerignore'];
        for (const file of dotfiles) {
            this.fs.move(this.destinationPath(file), this.destinationPath(`.${file}`));
        }
    }
    install() {
        this.yarnInstall();
    }
}
exports.default = WebGenerator;
//# sourceMappingURL=index.js.map