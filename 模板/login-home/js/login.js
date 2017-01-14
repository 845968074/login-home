/**
 * Created by anfen on 17-1-9.
 */
addEventListener("load", function () {
    setTimeout(hideURLbar, 0);
}, false);
function hideURLbar() {
    window.scrollTo(0, 1);
}
function validatePhone(data) {
    const regPhone = /^(\+86)?(1[0-9]{10})$/;
    return regPhone.test(data);
}
function post_Login({user_phone, password}, callback) {
    console.log("ddddddddddd" + user_phone + password);
    $.ajax({
        type: "POST",
        url: "http://www.yangjing1007.cn/BlueCar/user/login",
        async: true,
        data: {user_phone: user_phone, password: password},
        complete: function (XMLHttpRequest, textStatus) {
            return callback(false, null);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            return callback('請求錯誤', null);
        },
        success: function (data, textStatus) {
            if (data.message == "登录成功") return callback(true, data);
            else  return callback(false, null)
        }
    });
}
function validate_form() {
    let user_phone = $('#user_phone').val();
    let password = $('#password').val();
    if ((validatePhone(user_phone) !== false) && (password == '111111')) {
        console.log("into post_Login");
        post_Login({user_phone, password}, function (is_true, data) {
            console.log("is_true: " + is_true);
            if (is_true === true) return true;
            else if (is_true == '請求錯誤') {
                alert("請求錯誤");
                return false;
            }
            else {
                return false
            }
        })
    }
    else {
        alert("輸入格式不對");
        return false;
    }
}