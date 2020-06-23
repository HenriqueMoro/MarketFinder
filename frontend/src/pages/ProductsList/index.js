import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api';
import './style.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [product, setProduct] = useState([]);
  const history = useHistory();

  const market_id = localStorage.getItem('market_id');
  

  // useEffect, param[0], {} o que executar
  // useEffect, param[1], [] quando o que mudar deve executar
  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: market_id,
      }
    }).then(response => {
      setProduct(response.data);
    })
  }, [market_id]);

  

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="" />
        <span>{market_id.value}</span>

        
      </header>

      <h1>Produtos cadastrados</h1>
      
      
      <ul>
        {product.map(product => (
          <li key={product.id}>
            <strong>PRODUTO: {product.id}</strong>
            <p>{product.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{product.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(product.value)}</p>

            
          </li>
        ))}
        
      </ul>
    </div>
  );
}