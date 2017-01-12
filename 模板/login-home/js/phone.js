
// 获取模态窗口
var modal = document.getElementById('myModal');
// 获取图片模态框，alt 属性作为图片弹出中文本描述
var img = document.getElementsByClassName('myImg');
var modalImg = document.getElementById("img01");
for (let i of img) {
    i.onclick = function () {
        modal.style.display = "block";
        modalImg.src = this.src;
    };
}
// 获取 <span> 元素，设置关闭模态框按钮
var span = document.getElementsByClassName("close")[0];

// 点击 <span> 元素上的 (x), 关闭模态框
span.onclick = function () {
    modal.style.display = "none";
};
