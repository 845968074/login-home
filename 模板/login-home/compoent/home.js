var txt = '{"data":[' +
    '{"balance": "0","deposit": "0","permissions": "0","reg_time": "2017-01-12 09:30:49.0","review_prog": "0","user_id": "34","user_name": "用户18392059576","user_phone": "18392059576"},' +
    '{"balance": "0","deposit": "0","permissions": "0","reg_time": "2017-01-12 09:30:49.0","review_prog": "1","user_id": "33","user_name": "用户18392059576","user_phone": "18392059576" }], "message": "查询成功","result_code": "102" }';
let list_usr = [];
function get_User_all({}, callback) {
    /* $.ajax({
     type: "GET",
     url: "http://www.yangjing1007.cn/BlueCar/manager/users/all",
     async: true,
     success: (data, textStatus) => {
     let string_data = data;
     let user_data = eval("(" + string_data + ")");
     return callback(user_data)
     }
     });
     return callback(null);*/
    let user_data = eval("(" + txt + ")");
    return callback(user_data)
}
class User_infotmation extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            user_info: [{
                balance: "",
                deposit: "",
                reg_time: "",
                review_prog: "",
                user_name: '',
                user_phone: "",
                permissions: '',
                user_id: '',
                status_review_prog: ''
            }]
        })
    }

    componentWillMount() {
        event.preventDefault();
        get_User_all({}, (user_data) => {
            if (user_data.message == "查询成功" && user_data != null) {
                _.map(user_data.data, function ({
                    balance, deposit, reg_time, review_prog,
                    user_name, user_phone, permissions, user_id
                }) {
                    alert("username: " + user_name);
                    let review = '', permission = '';
                    var is_status = true;
                    if (review_prog == -2) review = '待提交';
                    if (review_prog == 1) {
                        review = '待审核';
                        is_status = false;
                    }
                    if (review_prog == 0) {
                        review = '通过';
                    }
                    if (permissions == 0) permission = '普通用户';
                    if (permissions == 1) permission = '维修人员';
                    if (permissions == 2) permission = '管理员';
                    if (permissions == 3) permission = '高级管理员';
                    if (review_prog == -1) review = '未通过';
                    alert("first");
                    list_usr.push({
                        balance: balance,
                        deposit: deposit,
                        reg_time: reg_time,
                        review_prog: review,
                        user_name: user_name,
                        user_phone: user_phone,
                        permissions: permission,
                        user_id: user_id,
                        status_review_prog: is_status
                    });

                });
                this.setState({
                    user_info: list_usr
                });
                console.log(this.state.user_info);
            }
            else {
                alert("頁面錯誤");
            }

        });
    }

    render() {
        alert("second");
        let user_info = this.state.user_info;
        alert("user_info:" + user_info);
        const userList = _.map(user_info, ({
                balance, deposit, reg_time, review_prog, status_review_prog,
                user_name, user_phone, permissions, user_id
            }) =>
                <div key={user_id}>
                    <div className="input-group input-group-lg">
                        <input type="text" value={user_name} readOnly="true"
                               className="col-xs-1 input-group-sm1"/>
                        <input type="text" value={user_phone} readOnly="true"
                               className="col-xs-2 input-group-sm"/>
                        <input type="text" value={reg_time} readOnly="true" className="col-xs-3 input-group-sm"/>
                        <input type="text" value={deposit} readOnly="true" className="col-xs-1 input-group-sm"/>
                        <input type="text" value={balance} readOnly="true" className="col-xs-1  input-group-sm"/>
                        <a href={"review.html?" + "usr=" + encodeURI(user_id)}><input type="text"
                                                                                      value={review_prog}
                                                                                      readOnly="true"
                                                                                      className="col-xs-1  input-group-sm"/></a>
                        <input type="text" value={permissions} readOnly="true"
                               className="col-xs-2  input-group-sm"/>
                    </div>
                </div>
        );
        return <div className="container">
            <div className="row">
                <div className="col-xs-2" id="myScrollspy">
                    <ul className="nav nav-tabs nav-stacked" id="myNav">
                        <li className="active"><a href="home.html">所有用戶信息</a></li>
                        <li ><a href="pending_audit.html">用户审核</a></li>
                        <li><a href="power.html"> 设置权限</a></li>
                        <li><a href="cost.html">设置費用</a></li>
                        <li><a href="map.html">设置电子围栏</a></li>
                        <li><a href="data.html">数据汇总</a></li>
                        <li><a href="control_car.html">远程控制还车</a></li>
                        <li><a href="recharge_record.html">充值记录</a></li>
                        <li><a href="accidentt_car.html">意外还车</a></li>
                    </ul>
                </div>
                <div className="col-xs-10">
                    <div>
                        <form className=" form-container">
                            <input type="text" placeholder="姓名 电话" className="search-input"/>
                            <input className="search-button" type="image" src="../images/search-button.png"/>
                        </form>
                    </div>
                    <div className="list">
                        <h2 id="section-1">用户审核</h2>
                        <div>

                        </div>
                        <div className="table-responsive">
                            <table className="table  table-bordered">
                                <thead>
                                <tr>
                                    <th className="col-xs-1">姓名</th>
                                    <th className="col-xs-2">电话</th>
                                    <th className="col-xs-3">注册时间</th>
                                    <th className="col-xs-1">押金</th>
                                    <th className="col-xs-1">余额</th>
                                    <th className="col-xs-1">审核进度</th>
                                    <th className="col-xs-2">权限</th>
                                </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div>
                            {userList}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }
}

ReactDOM.render(
    <div>
        <User_infotmation/>
    </div>,
    document.getElementById("content")
)
;
