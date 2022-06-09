console.log("\n %c NilBridge 1.6.0 %c http://Nilbridge.site \n\n","color: #fadfa3; background: #030307; padding:5px 0;","background: #fadfa3; padding:5px 0;");
let tg = TGTool();
function getGithub(owner, repo_name) {
    let options = {
        url: `https://api.github.com/repos/${owner}/${repo_name}`,
        method: 'GET',
        headers: {
            'Authorization':'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',
            //'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/91.0.4472.114',
            'Content-Type': 'application/json',
            'accept': 'application/vnd.github.v3+json',
        }
    };

    axios(options.url, options).then((dt) => {
        console.log('get',dt.data.html_url);
        document.getElementById("Modules").innerHTML += getCard(dt.data);
    }).catch(err => {
        document.getElementById("Modules").innerHTML += `<div id="err_box">模块：${repo_name} 信息加载失败<br>${err}<br></div>`;
        tg.error(`模块：${repo_name} 信息加载失败 : ${err}`);
    });
}

function unit(number) {
    let _number = number / 1000;
    if (_number >= 1000) {
        return parseFloat((_number / 1000).toFixed(1)) + 'm';
    } else if (_number >= 1) {
        return parseFloat(_number.toFixed(1)) + 'k';
    } else {
        return number;
    }
}

function getCard(data) {
    return `
   <div class="gr-card">
                    <div class="gr-header">
                        <img src="${data.owner.avatar_url}" alt="">
                    </div>
                    <div class="gr-content">
                        <div class="gr-fullname">
                            <p><i class="fab fa-github fa-lg" aria-hidden="true" id="gr-github-icon"></i> ${data.full_name}</p>
                        </div>
                        <div class="gr-description">
                            ${data.description}
                        </div>
                    </div>
                    <div class="gr-footer">
                        <div class="gr-language-star">
                            <span class="gr-language">${data.language}</span>
                            <i class="far fa-star" aria-hidden="true" id='gr-star-icon'> ${unit(data.stargazers_count)}</i>
                        </div>
                        <div class="gr-card-toolbar">
                            <div class="gr-repo-link">
                                <a href="${data.html_url}" target="_blank" rel="noopener noreferrer"
                                    title="Open in a new TAB">
                                    <i class="fas fa-external-link-square-alt fa-lg" aria-hidden="true" style="color: black;" id="gr-repo-link-icon"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
      `;
}