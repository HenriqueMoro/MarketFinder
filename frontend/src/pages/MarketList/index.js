import React, { useState, useEffect } from 'react'
import { Link, useHistory, Redirect } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function MarketList() {
  const [market, setMarket] = useState([]);
  const history = useHistory();



  // useEffect, param[0], {} o que executar
  // useEffect, param[1], [] quando o que mudar deve executar
  useEffect(() => {
    api.get('market').then(response => {
      setMarket(response.data);
    })
  }, [market]);

  function handleLink() {
    /*localStorage.clear();
    const id = market.map(user => (user.id))
    localStorage.setItem('market_id', id );
    

    history.push('/product/list');*/
  }
  function moves(){}

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vindo</span>

        
       
      </header>

      <h1>Supermercados disponiveis</h1>
      
      <ul onClick={handleLink} onMouseOver={moves} id='click'>
        {market.map(market => (
          <li key={market.id}>
            <strong>SUPERMERCADO: </strong>
            <p>{market.nome}</p>

            <strong>LOCAL:</strong>
        <p>{market.city} | {market.uf}</p>

            

        
          </li>
        ))}
        
      </ul>
    </div>
  );
}