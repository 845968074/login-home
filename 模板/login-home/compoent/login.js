/**
 * Created by anfen on 17-1-12.
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
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            user_phone: '',
            password: ''
        })
    }
    _onSubmit(event) {
        event.preventDefault();
        if ((validatePhone(this.state.user_phone) !== false) && (this.state.password == '111111')) {
            console.log("into post_Login");
          //  window.location="home.html";
            $.ajax({
                type: "POST",
                url: "http://www.yangjing1007.cn/BlueCar/user/login",
                async: true,
                data: {user_phone: this.state.user_phone, password: this.state.password},
                complete: function (XMLHttpRequest, textStatus) {
                   window.location.href="home.html";
                },
                success: function (data, textStatus) {
                   window.location.href="home.html";
                }
            });
    }
    else {alert("輸入格式不對")}
    }
    onChangeUserId(event) {
        this.setState({
            user_phone: event.target.value
        })
    }
    onChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }
    render() {

        return <div className="container">
            <div className="app-location">
                <h2>Welcome to Us</h2>
                <div className="location"><img src="../images/location.png" className="img-responsive" alt=""/></div>
                <form action="home.html" method="post" onSubmit={this._onSubmit.bind(this)}>
                    <div>
                        <img src="../images/people.png" width="50px"/>
                        <input name="user_phone" placeholder="user Phone" type="text" className="text"
                               value={this.state.user_phone} onChange={this.onChangeUserId.bind(this)}/>
                    </div>
                    <div>
                        <img src="../images/lock.png" width="50px"/>
                        <input name="password" placeholder="password" type="password" value={this.state.password}
                               onChange={this.onChangePassword.bind(this)}/>
                    </div>
                    <div className="submit">
                        <button className="btn btn-success" role="button" id="button1"> Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>

    }
}

ReactDOM.render(
    <div>
        <Login/>
    </div>,
    document.getElementById("login")
)
;