/**
 * Created by anfen on 17-1-13.
 */
let txt = '{"data":[' +
    '{"balance": "0","deposit": "0","permissions": "0","reg_time": "2017-01-12 09:30:49.0","review_prog": "1","user_id": "34","user_name": "用户18392059576","user_phone": "18392059576"},' +
    '{"balance": "0","deposit": "0","permissions": "0","reg_time": "2017-01-12 09:30:49.0","review_prog": "1","user_id": "37","user_name": "anfen","user_phone": "18392059576" }, ' +
    '{"balance": "0","deposit": "0","permissions": "0","reg_time": "2017-01-12 09:30:49.0","review_prog": "1","user_id": "35","user_name": "zhang","user_phone": "18392059576"}],' + '"message": "查询成功","result_code": "102" }';


function get_Pending_user(callback) {
     $.ajax({
     type: "GET",
     url: "http://www.yangjing1007.cn/BlueCar/manager/users/review",
     async: true,
     success: function (data, textStatus) {
     let user = data;
     console.log("manager/users/review： "+data);
     let user_data = eval("(" + user + ")");
     return callback(user_data)
     }
     });
    /*let user_data = eval("(" + txt + ")");
    return callback(user_data)*/
}
function set_Tbody(user_data) {

    _.map(user_data.data, function ({balance, deposit, reg_time, review_prog,
        user_name, user_phone, permissions, user_id}) {
        console.log("users/review set_Tbody: "+user_phone+user_name);
        let  a_herf = document.createElement("a");
        // 为 id = tab 的控件添加一行 <tr></tr>
        let row = tab.insertRow(-1);
        // 创建 th 列
        let cell_0 = document.createElement("th");
        let cell_1 = document.createElement("th");
        let cell_2 = document.createElement("th");
        let cell_3 = document.createElement("th");
        let cell_4 = document.createElement("th");
        let cell_5 = document.createElement("th");
        let cell_6 = document.createElement("th");
        // 设置他的 scope 属性为 row，设置他的 innerHTML 为 title
        cell_0.setAttribute("class", "col-xs-2");
        cell_1.setAttribute("class", "col-xs-2");
        cell_2.setAttribute("class", "col-xs-3");
        cell_3.setAttribute("class", "col-xs-1");
        cell_4.setAttribute("class", "col-xs-1");
        cell_5.setAttribute("class", "col-xs-1");
        cell_6.setAttribute("class", "col-xs-2");
        a_herf.setAttribute("href", "review.html?" + "usr=" + encodeURI(user_id));
        let Review, permission;
        if (review_prog == -2) Review = '待提交';
        if (review_prog == 1) Review = '待审核';
        if (review_prog == 0) Review = '通过';
        if (review_prog == -1) Review = '未通过';
        if (permissions == 0) permission = '普通用户';
        if (permissions == 1) permission = '维修人员';
        if (permissions == 2) permission = '管理员';
        if (permissions == 3) permission = '高级管理员';
        cell_0.innerHTML = user_name;
        cell_1.innerHTML=user_phone;
        cell_2.innerHTML=reg_time;
        cell_3.innerHTML=deposit;
        cell_4.innerHTML=balance;
        a_herf.innerHTML=Review;
        cell_6.innerHTML=permission;
        // 把创建好的 cell_0 和 cell_1 添加到 行中
        row.appendChild(cell_0);
        row.appendChild(cell_1);
        row.appendChild(cell_2);
        row.appendChild(cell_3);
        row.appendChild(cell_4);
        row.appendChild(cell_5);
        row.appendChild(cell_6);
        cell_5.appendChild(a_herf);
    });

}
function show_Review() {
    get_Pending_user(function (user_data) {
        console.log("users/review get_Pending_user "+user_data.data);
        if ((user_data.message == '查询成功') && (user_data != null)) {
         set_Tbody(user_data)
        }
    })
}

window.onload = show_Review;