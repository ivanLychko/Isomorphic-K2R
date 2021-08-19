import React from 'react';
import Header from './Header';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="content">
          <Switch>
            {routes.map(({ path, component }, key) => <Route exact path={path} component={component} key={key} />)}
          </Switch>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
