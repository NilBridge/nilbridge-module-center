 <link rel="stylesheet" href="https://fastly.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.3/css/all.min.css" integrity="sha256-2H3fkXt6FEmrReK448mDVGKb3WW2ZZw35gI7vqHOE4Y=" crossorigin="anonymous">

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script src="/doc/get_gh_info.js"></script>
<div id="Modules">
<p>加载中...</p>
</div>

<script>
axios('/doc/store.json').then((dt)=>{
    document.getElementById("Modules").innerHTML = '';
    for(let i in dt){
        console.log(dt[i]);
        getGithub(dt[i].owner,dt[i].repo_name)
    }
})
</script>


 <style>
                /* css part */
                .gr-card {

                    --gr-header-width-proportion: 10%;
                    --gr-footer-width-proportion: 10%;
                    --gr-content-width-proportion: 80%;

                    --gr-header-min-width: 80px;
                    --gr-footer-min-width: 80px;

                    --gr-card-element-margin: 6px 10px 6px 10px; /* header content footer*/

                    display: flex;
                    background-color: #fff;
                    border-radius: 6px;
                    overflow: hidden;
                    box-shadow: 0px 4px 6px rgba(0, 0, 0, .12);
                    margin-bottom: 20px;
                    vertical-align: middle;
                    position: relative;
                }

                .gr-header {
                    width: var(--gr-header-width-proportion);
                    min-width: var(--gr-header-min-width);
                    margin: var(--gr-card-element-margin);
                    background-color: #fff;
                    /* background-color: blueviolet; */
                }

                .gr-header img {
                    width: 80px;
                    height: 80px;
                    position: relative;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    object-fit: cover;
                    border-radius: 50%;
                    margin: 0px;
                }

                .gr-content {
                    width: var(--gr-content-width-proportion);
                    margin: var(--gr-card-element-margin);
                    background-color: #fff;
                    text-align: left;
                }

                #gr-github-icon {
                    font-size: 1.3rem;
                }
                .gr-fullname {
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }

                .gr-fullname p {
                    line-height: 2rem;
                    margin: 10px 0px 0px 0px;
                    padding: 0;
                    font-size: .83rem;
                    font-weight: bolder;
                }

                .gr-description {
                    font-size: .8rem;
                    line-height: 1.6rem;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }

                .gr-footer {
                    width: var(--gr-footer-width-proportion);
                    min-width: var(--gr-footer-min-width);
                    margin: var(--gr-card-element-margin);
                    display: flex;
                    /* background-color: aqua; */
                    background-color: #fff;
                    position: relative;
                    padding: 0px;
                }

                .gr-language-star {
                    margin: auto auto 22px auto;
                    text-align: center;
                    opacity: 1;
                }

                .gr-language {
                    font-size: .8rem;
                    font-weight: 600;
                    line-height: 2.2rem;
                    color: #2070d3;
                }

                #gr-star-icon {
                    font-size: .8rem;
                    display: inherit;
                }

                .gr-card-toolbar{
                    display:flex;
                    width: 100%;
                    height: 100%;

                    position: absolute;

                    opacity: 0;
                    animation: fade-out;
                    animation-duration: .4s;
                    z-index: -1;
                    /* background-color: #2070d3; */
                }

                .gr-repo-link {
                    margin: auto;
                }

                #gr-repo-link-icon {
                    font-size: 16px;
                }
                /* animation part */

                @keyframes fade-in {
                    0% {opacity: 0;}/*初始状态 透明度为0*/
                    100% {opacity: 1;}/*结束状态 透明度为1*/
                }

                @keyframes fade-out {
                    0% {opacity: 1;}/*初始状态 透明度为0*/
                    100% {opacity: 0;}/*结束状态 透明度为1*/
                }

                .gr-card:hover .gr-language-star{
                    opacity: 0;
                    animation: fade-out;
                    animation-duration: .3s;
                }

                .gr-card:hover .gr-card-toolbar{
                    opacity: 1;
                    animation: fade-in;
                    animation-duration: .6s;
                    z-index: 1;
                }
</style>
