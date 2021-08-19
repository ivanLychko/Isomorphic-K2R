import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';
import routes from '../../routes';

class Menu extends React.Component {
  state = {};

  handlerClick(e) {
    axios.get('/auth/logout')
      .then(() => window.location.href = '/');
  }

  componentDidMount(e) {
    axios.get('/auth/get')
      .then(data => {
        this.setState({role: data.data.role});
      });
  }

  render() {
    const { role } = this.state;

    return (
      <div className="menu">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              {routes.map(item => {
                if (item.isShow && item.role.includes(role))
                  return (
                    <li className="nav-item ">
                      <NavLink className="nav-link" to={item.path}>{item.nameLink}</NavLink>
                    </li>
                  )
              }
              )}
            </ul>
          </div>
          <button className="btn btn-secondary" onClick={this.handlerClick} type="button">Exit</button>
        </nav>
      </div>
    )
  };
}

export default Menu;
