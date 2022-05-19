import json
import requests
requests.packages.urllib3.disable_warnings()
def github_update(repo_url:str):
    try:
        repo =repo_url.split('github.com/')[1]
        r = requests.get(f'https://api.github.com/repos/{repo}',verify=False)
        if(r.status_code != 200):
            return {'find':False,'code':r.status_code}
        info = json.loads(r.text)
        url = info['url']
        release = requests.get(f'{url}/releases/latest',verify=False)
        if(release.status_code != 200):
            return {'find':False,'code':release.status_code}
        latest_tag = json.loads(release.text)['tag_name']
        return {'find':True,'tag_name':latest_tag}
    except:
        return {'find':False,'code':0}