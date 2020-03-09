import React from 'react';
import './App.css';
import { ProductList, Product } from './components';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () =>
  <BrowserRouter>
    <Container>
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route exact path='/product/:slug' component={Product} />
      </Switch>
    </Container>
  </BrowserRouter>
;

export default App;
