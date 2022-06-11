import shutil
import json
import time
from loguru import logger
import os
import hashlib
from helper import tgz,checkupdate
import config

# -i https://pypi.tuna.tsinghua.edu.cn/simple

last_log = {}
this_log = {
    'build_time':time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())),
    'modules':{}
}


time_md5 = hashlib.md5(time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())).encode(encoding='UTF-8')).hexdigest()
logger.info(f'获取到临时id：{time_md5}')
this_log['id'] = time_md5


if os.path.exists('.\\docs\\info.json'):
    with open('.\\docs\\info.json','r') as f:
        json_data = f.read()
        last_log = json.loads(json_data)
    f.close()


def checkDir(path):
    if(os.path.exists(path) == False):
        os.mkdir(path)

checkDir(config.pack_dir)
checkDir(config.publish_path)

publish_path = os.path.join(config.publish_path,time_md5)

checkDir(publish_path)

if(last_log.get('id') != None):
    old_path = os.path.join(config.publish_path,last_log.get('id'))
    if(os.path.exists(old_path)):
        logger.info(f'移除 旧文件夹：{old_path}')
        shutil.rmtree(old_path)

dirs = os.listdir(config.pack_dir)    

def github_check(module,repo,version):
    if(repo == None):return
    if(repo.get('url') == None):return
    type = repo.get('type')
    this_log['modules'][module]['github_check'] = {}
    if(type == 'git'):
        try:
            check = checkupdate.github_update(repo.get('url'))
            if(check['find']):
                logger.info(f'获取到 {module} 的 github 仓库信息，正在校验')
                this_log['modules'][module]['github_check']['success'] = True
                this_log['modules'][module]['github_check']['owner'] = check['owner']
                this_log['modules'][module]['github_check']['repo_name'] = check['repo_name']
                if(check['tag_name'] != version):
                    this_log['modules'][module]['github_check']['need_update'] = True
                    this_log['modules'][module]['github_check']['new'] = check['tag_name']
                    return True
                else:
                    this_log['modules'][module]['github_check']['need_update'] = False
            else:
                this_log['modules'][module]['github_check']['success'] = False
                this_log['modules'][module]['github_check']['owner'] = check['owner']
                this_log['modules'][module]['github_check']['repo_name'] = check['repo_name']
                this_log['modules'][module]['github_check']['err_code'] = check['code']
                logger.warning(f'无法获取 {module} 的 github 仓库信息')
        finally:
            logger.info(f'模块 {module} 仓库校验完成')
    else:
        this_log['modules'][module]['github_check']['success'] = False
        this_log['modules'][module]['github_check']['err_code'] = 444
        logger.warning(f'模块 {module} 使用了未支持的仓库方式：{type}')
        return False

def pack_nbpack(name,path):
    try:
        tgz.make_targz(os.path.join(publish_path,f'{name}.nbpack'),path)
        logger.success(f'生成 {name}.nbpack 成功')
        this_log['modules'][name]['build'] = {'success':True,'path':f'/{time_md5}/{name}.nbpack'}
    except Exception as err:
        print(err)
        logger.error(f'生成 {name}.nbpack 失败')
        this_log['modules'][name]['build'] = {'success':False,'msg':str(err)}
    


for module in dirs:
    try:
        module_path = os.path.join(os.getcwd(),config.pack_dir,module)
        json_path = os.path.join(module_path,'package.json')
        if(os.path.exists(json_path)):
            logger.info(f'读取 {module} 的信息文件')
            package_data = {}
            with open(json_path,'r') as package:
                package_data = json.loads(package.read())
            package.close()
            logger.info(f'{module} 信息读取完毕')
            name = package_data.get('name')
            version = package_data.get('version')
            author = package_data.get('author')
            repository = package_data.get('repository')
            if(github_check(name,repository,version)):
                os.system(f'cd {module_path} && git pull origin main')
                with open(json_path,'r') as package2:
                    package_data2 = json.loads(package2.read())
                    logger.info(f'{module} 信息读取完毕')
                    name = package_data2.get('name')
                    version = package_data2.get('version')
                    author = package_data2.get('author')
                    repository = package_data2.get('repository')
                package.close()
            this_log['modules'][name] = {'version':version,'author':author}
            logger.info(f'{name} 版本：{version} 作者：{author}')
            os.system(f'cd {module_path} && npm i --save && del package-lock.json')
            pack_nbpack(name,module_path)
        else:
            logger.warning(f'无法找到 {module} 的信息文件')
    except Exception as err:
        print(err)
        logger.error(f'{module} 文件夹 执行出错')
    finally:
        logger.info(f'{module} 文件夹 执行完毕')

out_file = open(os.path.join('docs','info.json'),'w+')
json.dump(this_log,out_file,indent=5,skipkeys=True)
logger.info('写入 info.json 完毕')
logger.info(this_log)
out_file.close()

time.sleep(5)