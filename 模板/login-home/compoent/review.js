/**
 * Created by anfen on 17-1-12.
 */

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
function getUser_id() {
    let loc = location.href;
    let n1 = loc.length;//地址的总长度
    let n2 = loc.indexOf("=");//取得=号的位置
    let id = decodeURI(loc.substr(n2 + 1, n1 - n2));//从=号后面的内容
    return id;
}
function getPhoto(callback) {
    let id = getUser_id();
     $.ajax({
     type: "GET",
     url: "http://http://www.yangjing1007.cn/BlueCar/manager/" + id + "/" + "id_card.jpg-stu_card.jpg",
     async: true,
     date: {user_id: id, type: "id_card.jpg-stu_card.jpg"},
     success: (data, textStatus) => {
     let photo = eval("(" + data + ")");
     console.log("id_card.jpg-stu_card.jpg: "+data);
     return callback(photo)
     }
     });
}
function show_Image() {
    getPhoto(function (photo) {
        alert("get imag :"+photo);
        let p = document.getElementById("photo");
        if ((photo == null) || (photo=='')||(photo==undefined))
        {
            p.src = "../images/2.png";
        }
        else
        p.src = {photo};
    });
    /*let p = document.getElementById("photo");
     p.src = '../images/3.jpg';*/
}
function Pass(callback) {
    let id = getUser_id();
    alert("into pass");
    $.ajax({
        type: "POST",
        url: "http://www.yangjing1007.cn/BlueCar/manager/users/" + {id},
        async: true,
        data: 'yes',
        success: (data, textStatus) => {
            let pass = eval("(" + data + ")");
            return callback(pass)
        }
    })
}
function review_Pass() {
    Pass(function (pass) {
        if (pass.message == '操作成功') {
            alert("通過成功");
        }
    })

}
function pass_NO(callback) {
    let id = getUser_id();
    alert("into not pass");
    $.ajax({
        type: "POST",
        url: "http://www.yangjing1007.cn/BlueCar/manager/users/" + {id},
        async: true,
        data: 'no',
        success: (data, textStatus) => {
            let pass_not = eval("(" + data + ")");
            return callback(pass_not)
        }
    })
}
function review_Not() {
    pass_NO(function (pass_not) {
        if (pass_not.message == '操作成功') {
            alert("不通過成功");
        }
    })

}
window.onload = show_Image;
