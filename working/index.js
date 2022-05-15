const path = require('path');

const publish_path = path.join(__dirname, '../', 'modules_publish');
const public_path = path.join(__dirname, '../', 'docs');
const tmp_path = path.join(__dirname, '../', 'tmp');

const uuid = require('./uuid');
const fs = require('fs');
const tgz = require('./tgz');

if (fs.existsSync(tmp_path)) {
    fs.rmSync(tmp_path, { recursive: true, force: true });

}

if (fs.existsSync(public_path)) {
    fs.rmSync(public_path, { recursive: true, force: true });

}
fs.mkdirSync(tmp_path);
fs.mkdirSync(public_path);

fs.copyFileSync('README.web.md',path.join(public_path,'README.md'));

let logs = {};
let api = {};

async function getDirInfo(dir) {
    let err = null;
    let stat = null;
    try {
        stat = fs.statSync(path.join(publish_path, dir));
    } catch (boom) {
        err = boom;
    }
    if (err) {
        logs[dir] = { succees: false, err: '无法找到文件！' };
    } else {
        if (stat.isDirectory()) {
            try {
                let package = JSON.parse(fs.readFileSync(path.join(path.join(publish_path, dir), 'package.json')));
                let name = package.name;
                let description = package.description;
                let author = package.author;
                let version = package.version;
                await pack2tgz(name, { description, author, version });
                logs[dir] = { succees: true };
            } catch (err) {
                console.log(err);
                logs[dir] = { succees: false, err };
            }
        } else {
            logs[dir] = { succees: false, err: '目标不是文件夹！' };
        }
    }
    return true;
}

function pack2tgz(name, info) {
    let id = uuid();
    info.path = `${id}/${name}.nbpack`;
    console.log(`packing ${name}`);
    tgz(id, name, tmp_path, publish_path, public_path);
    api[name] = info;
    console.log(`${name} api 构建成功`);
}


let files = fs.readdirSync(publish_path, { encoding: 'utf-8' });

async function build_module() {
    return new Promise((res, rej) => {
        let result = [];
        for (let i = 0; i < files.length; i++) {
            logs[files[i]] = {};
            result.push(getDirInfo(files[i]));
        }
        res(result);
    });
}

async function main() {
    await build_module();
    fs.writeFileSync(path.join(public_path ,'api.json'), JSON.stringify(api, null, 5));
    fs.writeFileSync(path.join(public_path ,'latest_build.json'), JSON.stringify(logs, null, 5));
    console.log('构建完成');
}

try {
    main();
} catch (err) {
    fs.writeFileSync(path.join(public_path ,'latest_build.json'), JSON.stringify({ succees: false, err }));
}

