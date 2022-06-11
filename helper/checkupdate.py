import json
import requests
from loguru import logger
requests.packages.urllib3.disable_warnings()
import base64
token = 'Z2hwX0ZYNkQ3QjdkTVhCRXBqOTJ3U2VhRGRjNEtFSlBuTjBjc1NxaQ=='
b64_byt =base64.b64decode( token).decode('utf8')



def github_update(repo_url:str):
    try:
        repo = repo_url.split('github.com/')[1]
        repo = repo.split('.git')[0]
        header= {
        'accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript, */*; q=0.01',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cookie': '_tb_token_=berT80V49uJ9PFEJKGPI; cna=IhV+FpiDqRsCAXE54OSIgfFP; v=0; t=bb1c685b877ff64669f99c9dade7042c; cookie2=1e5103120f9886062722c86a5fad8c64; uc1=cookie14=UoTbm8P7LhIRQg%3D%3D; isg=BJWVw-e2ZCOuRUDfqsuI4YF0pJFFPHuu_ffxbBc6UYxbbrVg3-JZdKMoODL97mFc; l=dBMDiW9Rqv8wgDSFBOCiVZ9JHt_OSIRAguWfypeMi_5Zl681GgQOkUvZ8FJ6VjWftBTB4tm2-g29-etki6jgwbd6TCNQOxDc.',
        'referer': 'https://item-paimai.taobao.com/pmp_item/609160317276.htm?s=pmp_detail&spm=a213x.7340941.2001.61.1aec2cb6RKlKoy',
        'sec-fetch-mode': 'cors',
        "sec-fetch-site": 'same-origin',
        'user-agent': 'Lition802',
        'x-requested-with': 'XMLHttpRequest',
        'Authorization':'token '+b64_byt
        }
        
        r = requests.get(headers=header,url=f'https://api.github.com/repos/{repo}',verify=False)
        print(f'get https://api.github.com/repos/{repo} with code:{r.status_code}')
        limit = r.headers.get('X-RateLimit-Remaining')
        logger.info(f'剩余请求次数：{limit}')
        if(r.status_code != 200): #仓库未找到
            return {'find':False,'code':r.status_code}
        info = json.loads(r.text)
        url = info['url']
        release = requests.get(headers=header,url=f'{url}/releases/latest',verify=False)
        if(release.status_code != 200):
            return {'find':False,'code':release.status_code,'owner':info['owner']['login'],'repo_name':info['name']}
        latest = json.loads(release.text)
        return {'find':True,'tag_name':latest['tag_name'],'owner':info['owner']['login'],'repo_name':info['name']}
    except Exception as err:
        print(err)
        return {'find':False,'code':-1}