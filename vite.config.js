import { defineConfig, normalizePath, build } from 'vite'
import path, { resolve } from 'path'
import { fileURLToPath } from 'url';
import nunjucks from 'vite-plugin-nunjucks';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { StartFunc as StartFuncGetFiles } from "./viteFuncs/getFiles.js";
import sideBarItemsJson from './sideBarItems.json' with {type: 'json'};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SrcFolder = "src";
const FrontEndFolder = `${SrcFolder}/FrontEnd/HtmlFiles`;

const FrontEndDistFolder = "publicDir";

const root = resolve(__dirname, `${FrontEndFolder}`);

const files = StartFuncGetFiles({ inRootFolder: root });

const getVariables = (mode) => {
    const variables = {}
    Object.keys(files).forEach((filename) => {
        if (filename.includes('layouts')) filename = `layouts/${filename}`
        variables[filename + '.html'] = {
            web_title: "Mazer Admin Dashboard",
            sidebarItems: sideBarItemsJson,
            isDev: mode === 'development'
        }
    });

    console.log("variables : ", getVariables);

    return variables
};

build({
    configFile: false,
    build: {
        emptyOutDir: false,
        outDir: resolve(__dirname, `${FrontEndDistFolder}/assets/compiled/js`),
        lib: {
            name: 'app',
            formats: ['umd'],
            fileName: 'app',
            entry: './src/assets/js/app.js',
        },
        rollupOptions: {
            output: {
                entryFileNames: '[name].js'
            }
        }
    },
});

export default defineConfig((env) => ({
    publicDir: 'static',
    base: './',
    root,
    plugins: [
        viteStaticCopy({
            targets: [
                { src: normalizePath(resolve(__dirname, `./${SrcFolder}/assets/static`)), dest: "assets" },
            ],
            watch: {
                reloadPageOnChange: true
            }
        }),
        nunjucks({
            templatesDir: root,
            variables: getVariables(env.mode),
            nunjucksEnvironment: {
                filters: {
                    containString: (str, containStr) => {
                        if (!str.length) return false
                        return str.indexOf(containStr) >= 0
                    },
                    startsWith: (str, targetStr) => {
                        if (!str.length) return false
                        return str.startsWith(targetStr)
                    }
                }
            }
        })
    ],
    resolve: {
        alias: {
            '@': normalizePath(resolve(__dirname, 'src')),
            '~bootstrap': resolve(__dirname, 'node_modules/bootstrap'),
            '~bootstrap-icons': resolve(__dirname, 'node_modules/bootstrap-icons'),
            '~perfect-scrollbar': resolve(__dirname, 'node_modules/perfect-scrollbar'),
            '~@fontsource': resolve(__dirname, 'node_modules/@fontsource'),
        }
    },
    build: {
        emptyOutDir: false,
        manifest: true,
        target: "chrome58",
        outDir: resolve(__dirname, `${FrontEndDistFolder}`),
        rollupOptions: {
            input: files,
            output: {
            }
        },
    }
}));