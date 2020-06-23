import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewProduct from './pages/NewProduct'
import MarketList from './pages/MarketList'
import ProductsList from './pages/ProductsList'
import Busca from './pages/Register/pesquisa'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/logon"  component={Logon}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/product/new" component={NewProduct}></Route>
        <Route path='/' exact component={MarketList}></Route>
        <Route path='/product/list' component={ProductsList}></Route>
        <Route path='/busca' component={Busca}></Route>
      </Switch>
    </BrowserRouter>
  );
}