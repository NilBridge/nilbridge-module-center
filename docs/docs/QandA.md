<style>
.g-card img {
    width: 100%;
}
.g-card{
    height: 270px;
    width: 260px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 4px;
    display: inline-block;
    margin-left: 18px;
    vertical-align: top;
}
.g-card span {
    font-size: 12px;
    color: #BFBFBF;
    display: block;
    letter-spacing: 2px;
    padding: 30px 20px;
}

.card {
    width:400px;
    margin:0px auto;
    background-color:white;
    box-shadow:0px 5px 20px #999;
}
.card a {
    color:#333;
    text-decoration:none;
}
.card:hover .card-image img {
    width:160%;
    filter:grayscale(0);
}
.card-image {
    height:250px;
    position:relative;
    overflow:hidden;
}
.card-image img {
    width:150%;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    filter:grayscale(1);
    transition-property:filter width;
    transition-duration:.3s;
    transition-timing-function:ease;
}
.card-body {
    text-align:center;
    padding: 15px 20px;
    box-sizing: border-box;
}
.card-date {
    font-family: 'Source Sans Pro', sans-serif;
}
.card-title, .card-excerpt {
    font-family: 'Playfair Display', serif;
}
.card-date, .card-title {
    text-align:center;
    text-transform:uppercase;
    font-weight: bold;
}
.card-date, .card-excerpt {
    color: #777;
}
</style>

<div class="g-card">
    <img  src="https://lition.online/posts/1b7797d3/1.webp" alt=""/>
    <div>
        <span>打破企业间壁垒，提供便捷的接入方式，实现不企业，不同品牌、不同类型间的家电的数据互联互通和数据协同</span>
    </div>
</div>

<div class="card">
        <div class="card-image">
            <img src="http://www.loveo.cc/wp-content/uploads/2017/02/card-image.jpg"
            alt="Orange" />
        </div>
        <div class="card-body">
            <div class="card-date">
                <time>
                    20 Novembre 1992
                </time>
            </div>
            <div class="card-title">
                <h3>
                    Lorem Ipsum
                </h3>
            </div>
            <div class="card-exceprt">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam voluptatibus
                    autem consectetur voluptate facere at, omnis ab optio placeat officiis!
                    Animi modi harum enim quia veniam consectetur unde autem inventore.
                </p>
            </div>
        </div>
</div>