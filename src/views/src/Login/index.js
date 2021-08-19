import React from 'react';
import './style.scss';
import axios from 'axios';

const INITIAL_STATE = {
  login: '',
  password: '',
  error: ''
};

class Login extends React.Component {
  state = { ...INITIAL_STATE };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const { login, password } = this.state;

    if (login && password) {
      axios.post('/auth', { login, password })
        .then(response => {
          if (response.data && response.data?.status === 200)
            window.location.href = '/';
          else if (response.data?.error) {
            this.setState({ error: response.data.error });
          }
        });
    };
  }

  render() {
    const { login, password, error } = this.state;

    return (
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Sing in</h2>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <form className="login-form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <div className="icon d-flex align-items-center justify-content-center"><span className="fa fa-user"></span></div>
                    <input
                      className="form-control rounded-left"
                      placeholder="Username"
                      type="text"
                      name="login"
                      value={login}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <div className="icon d-flex align-items-center justify-content-center"><span className="fa fa-lock"></span></div>
                    <input
                      className="form-control rounded-left"
                      placeholder="Password"
                      required
                      type="password"
                      value={password}
                      onChange={this.handleChange}
                      name="password"
                    />
                  </div>
                  <div>
                    <p className="text-danger">{error}</p>
                  </div>
                  <div className="form-group d-flex align-items-center">
                    <div className="w-100 d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary rounded submit">Login</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
