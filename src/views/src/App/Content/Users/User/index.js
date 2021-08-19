import axios from 'axios';
import React from 'react';

class User extends React.Component {
  state = { ...this.props, ...{ newPass: '' } };

  editRole(e) {
    this.setState({ role: e.target.value });

    axios.patch('/users/' + this.props.id, {
      role: e.target.value
    });
  };

  genNewPass() {
    if (!window.confirm(`Change pass for users ${this.props.id} ?`)) return false;
    const newPass = Math.random().toString(36).slice(-8);
    this.setState({ newPass });
    axios.patch('/users/' + this.props.id, {
      password: newPass
    });
  }

  delUser(e) {
    if (window.confirm(`Remove users by ${this.props.id} ?`))
      axios.delete('/users/' + this.props.id).then(data => {
        this.props.callbackDel(this.props.id);
      });
  }

  render() {
    const { id, login, role, newPass } = this.state;

    return (
      <>
        <tr>
          <td>{id}</td>
          <td>{login}</td>
          <td>
            <select value={role} onChange={this.editRole.bind(this)}>
              <option value="manager">manager</option>
              <option value="admin">admin</option>
            </select>
          </td>
          <td>
            <button type="button" onClick={this.genNewPass.bind(this)} className="btn btn-primary"><span class="fa fa-key"></span></button>
            <br />
            {newPass}
          </td>
          <td>
            <button type="button" onClick={this.delUser.bind(this)} className="btn btn-danger"><span class="fa fa-trash"></span></button>
          </td>
        </tr>
      </>
    )
  }
}

export default User;
