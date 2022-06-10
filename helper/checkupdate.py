import json
import requests
from loguru import logger
requests.packages.urllib3.disable_warnings()
def github_update(repo_url:str):
    try:
        repo = repo_url.split('github.com/')[1]
        repo = repo.split('.git')[0]
        r = requests.get(headers={'Authorization':'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'},url=f'https://api.github.com/repos/{repo}',verify=False)
        logger.info(f'get https://api.github.com/repos/{repo} with code:{r.status_code}')
        if(r.status_code != 200): #仓库未找到
            return {'find':False,'code':r.status_code}
        info = json.loads(r.text)
        url = info['url']
        release = requests.get(headers={'Authorization':'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'},url=f'{url}/releases/latest',verify=False)
        if(release.status_code != 200):
            return {'find':False,'code':release.status_code,'owner':info['owner']['login'],'repo_name':info['name']}
        latest = json.loads(release.text)
        return {'find':True,'tag_name':latest['name'],'owner':info['owner']['login'],'repo_name':info['name']}
    except Exception as err:
        print(err)
        return {'find':False,'code':-1}