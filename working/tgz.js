const compressing = require('compressing');
const fs = require('fs');
const path = require('path');

async function tgz(id,name, tmp, publish, public) {
    try {
        let target = path.join(publish,name);
        let tar_path = path.join(tmp,name+'.tar');
        let tgz_path = path.join(tmp,name+'.tgz');
        await compressing.tar.compressDir(target,tar_path);
        await compressing.gzip.compressFile(tar_path,tgz_path);
        if(fs.existsSync(path.join(public,id))==false) {
            fs.mkdirSync(path.join(public,id));
        }
        fs.copyFileSync(tgz_path,path.join(public,id,name+'.nbpack'));
        return id;
    } catch (err) {
        console.error(err);
    }
}

function tgz_file(id,name,tmp,publish,public){
    tgz(id,name,tmp,publish,public)

}

module.exports = tgz_file;