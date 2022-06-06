import json
import requests
requests.packages.urllib3.disable_warnings()
def github_update(repo_url:str):
    try:
        repo = repo_url.split('github.com/')[1]
        repo = repo.split('.git')[0]
        r = requests.get(f'https://api.github.com/repos/{repo}',verify=False)
        print(f'get https://api.github.com/repos/{repo} with code:{r.status_code}')
        if(r.status_code != 200):
            return {'find':False,'code':r.status_code}
        info = json.loads(r.text)
        url = info['url']
        release = requests.get(f'{url}/releases/latest',verify=False)
        if(release.status_code != 200):
            return {'find':False,'code':release.status_code}
        latest = json.loads(release.text)
        return {'find':True,'tag_name':latest['tag_name'],'owner':info['owner']['login'],'repo_name':info['name']}
    except Exception as err:
        print(err)
        return {'find':False,'code':0}