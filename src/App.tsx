import React from 'react';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import Quiz from '../src/containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import AppLoader from './hoc/AppLoader/AppLoader';
import { useSelector } from "react-redux";
import { getAuthToken } from './store/auth';
import Logout from './components/Logout/Logout';

function App() {
  const isAuthenticated = useSelector(getAuthToken());

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth}/>
      <Route path='/quiz/:quizId' component={Quiz}/>
      <Route path='/' exact component={QuizList}/>
      <Redirect to="/" />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/quiz-creator' component={QuizCreator}/>
        <Route path='/quiz/:quizId' component={Quiz}/>
        <Route path='/logout' component={Logout}/>
        <Route path='/' exact component={QuizList}/>
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <AppLoader>
      <Layout>
        { routes }
      </Layout>
    </AppLoader>
  );
}

export default App;
