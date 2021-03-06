import React from 'react'
import axios from 'axios'
import './Login.css'
import bk from './images/background.svg'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor() {
      super();
      this.state = {
        username: '',
        password: '',
        isAuthorized: false,
        token: ''
      };
    }
    onChange = (e) => {
      this.setState({ [e.target.name]: e.target.value});
    }
    onSubmit = (e) => {
      e.preventDefault();
      const { username, password } = this.state;
      const tokenuser = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');
      axios.post('http://api.math.silaeder.ru/users/login', {} ,{
                  headers: {
                      "Access-Control-Allow-Origin": "*",
                      "Content-Type": "application/x-www-form-urlencoded",
                      'Authorization': `Basic ${tokenuser}`
                  }
      })
      .then((res) => {
          console.log(res);
          this.setState({ username, password, isAuthorized:true, token:tokenuser });
      });
    }
    render() {
      const { username, password, token } = this.state;
      if (this.state.isAuthorized == true) {
         return <Redirect to={{
          pathname: '/chats',
          state: {
            token: {token}
          }
        }}/>
      } return (
        <div className="login">
          <img src={ bk } className="bk_img"/>
          <div className="field">
            <p className="field__label">MathBattle</p>
            <p className="field__enter_p">Вход</p>
            <form>
              <div className="form__nickname">
                  <input className="form__nickname_p" placeholder="Никнейм" name="username" onChange={this.onChange}/>
              </div>
              <div className="form__password">
                  <input className="form__password_p" placeholder="Пароль" name="password" onChange={this.onChange}/>
              </div>
              <a href="/signup" classname="register_p">Нет аккаунта? <u>Создайте!</u></a>
              <button onClick={this.onSubmit} className="form_submit form_submit_p">Вход</button>
            </form>
          </div>
        </div>
      );
    }
}
export default Login;
