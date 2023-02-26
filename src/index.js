import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import AuthLayout from 'layouts/auth';
import AdminLayout from 'layouts/admin';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import { ThemeEditorProvider } from '@hypertheme-editor/chakra-ui';
import withAuth from 'hocs/AuthHOC';
import { AuthContext } from 'contexts/AuthContext';

const ROUTES = { auth: '/auth', admin: '/admin' };

const App = (props) => {
  const { loggedInUser } = useContext(AuthContext);
  console.log('In App', { loggedInUser, window, cond: !(window.location.pathname === ROUTES.signin) });
  if (!loggedInUser) {
    return (
        <ChakraProvider theme={theme}>
          <React.StrictMode>
            <ThemeEditorProvider>
              <BrowserRouter>
                <Switch>
                  <Route path={ROUTES.auth} component={AuthLayout} />
                  <Redirect to={ROUTES.auth} />
                </Switch>
              </BrowserRouter>
            </ThemeEditorProvider>
          </React.StrictMode>
        </ChakraProvider>
    );
  }
  return (
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <ThemeEditorProvider>
            <BrowserRouter>
              <Switch>
                <Route path={ROUTES.admin} component={AdminLayout} />
                <Redirect to={ROUTES.admin} />
              </Switch>
            </BrowserRouter>
          </ThemeEditorProvider>
        </React.StrictMode>
      </ChakraProvider>
  );
};

const AuthApp = withAuth(App);

ReactDOM.render(<AuthApp />, document.getElementById('root'));
