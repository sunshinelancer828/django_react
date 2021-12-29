import React from 'react';
import { Login, MainLayout } from './pages';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import ProtectedRoute from './routes/protectedRouter';

const App = () => {
  return (
    <Router>
      <Redirect from="/" to="/login" />
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/main" component={MainLayout} />
    </Router>
  );
}

export default App;
