import fs from 'fs'
import { resolve } from 'path'

const StartFunc = ({ inRootFolder }) => {
    const root = inRootFolder;
    let files = {}

    // fs.readdirSync(root)
    //     .filter(filename => filename.endsWith('.html'))
    //     .forEach(filename => {
    //         files[filename.slice(0, -5)] = resolve(root, filename)
    //     });

    let FolderNamesArray = fs.readdirSync(root)
        .filter(filename => fs.statSync(root + '/' + filename).isDirectory())

    FolderNamesArray.forEach(LoopFolderName => {
        fs.readdirSync(`${root}/${LoopFolderName}`)
            .filter(filename => filename.endsWith('.html'))
            .forEach(filename => {
                files[filename.slice(0, -5)] = resolve(`${root}/${LoopFolderName}`, filename)
            });
    });

    console.log("aaaaaa : ", files);

    return files;
};

export { StartFunc }