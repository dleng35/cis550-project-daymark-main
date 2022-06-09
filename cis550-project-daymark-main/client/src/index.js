import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import BookPage from './pages/BookPage';
import SearchPage from './pages/SearchPage'
import Authors from './pages/Author'
import SimilarAuthor from './pages/SimilarAuthor';
import BookDetail from './pages/BookDetailsPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact path="/" render={() => (<HomePage />)} />
        <Route exact path="/book" render={() => (<BookPage />)} />
        <Route exact path="/book/search" render={() => (<SearchPage />)} />
        <Route exact path="/author/top" render={() => (<Authors />)} />
        <Route exact path="/author/similar/:id" render={() => (<SimilarAuthor />)} />
        <Route exact path="/book/:id" render={() => (<BookDetail />)} />
        <Route exact path="/book/simlar/:id" render={() => (<BookDetail />)} />
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);
