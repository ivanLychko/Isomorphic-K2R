import React from 'react';
import './style.scss';
import User from './User';
import axios from 'axios';

const newUserDef = {
  role: 'manager',
  tgId: '',
  login: ''
};

class Users extends React.Component {

  state = {
    users: [],
    newUser: { ...newUserDef }
  };

  componentDidMount() {
    axios.get('/users/all').then(data => {
      this.setState({ users: data.data });
    });
  }

  createUser(e) {
    e.preventDefault();

    if (this.state.newUser.login.length >= 4)
      axios.post('/users', { ...this.state.newUser })
        .then(data => axios.get('/users/all')).then(data => {
          this.setState({
            users: data.data,
            newUser: { ...newUserDef }
          });
        });
  }

  changeLogin(e) {
    this.setState({ newUser: { ...this.state.newUser, login: e.target.value } });
  }
  changeTGId(e) {
    this.setState({ newUser: { ...this.state.newUser } });
  }
  changeRole(e) {
    this.setState({ newUser: { ...this.state.newUser, rol: e.target.value } });
  }
  callbackDel(id) {
    const users = this.state.users.filter(item => +item.id !== +id);
    this.setState({ users });
  }

  render() {

    const { users } = this.state;
    const { role, login, } = this.state.newUser;

    return (
      <>
        <div className="btn-toolbar">
          <form className="creater-user" onSubmit={this.createUser.bind(this)}>
            Login: <input value={login} onChange={this.changeLogin.bind(this)} name="login" type="text" />
            role:
            <select value={role} onChange={this.changeRole.bind(this)}>
              <option value="manager">manager</option>
              <option value="admin">admin</option>
            </select>

            <button className="btn btn-success float-right" >Add user</button>
          </form>
        </div>

        <table class="table table-borderless">
          <thead>
            <tr>
              <th>ID</th>
              <th>Login</th>
              <th>Role</th>
              <th rowSpan="2"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(item => (<User callbackDel={this.callbackDel.bind(this)} id={item.id} login={item.login} role={item.role} tgId={item.tgId} />))}
          </tbody>
        </table>

      </>
    );
  }
}

export default Users;
