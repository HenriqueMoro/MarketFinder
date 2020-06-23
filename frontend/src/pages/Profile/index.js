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
  const marketName = localStorage.getItem('marketName');

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

  async function handleDeleteProduct(id) {
    try {
      await api.delete(`product/${id}`, {
        headers: {
          Authorization: market_id,
        }
      });

      setProduct(product.filter(product => product.id !== id));

    } catch (err) {
      alert('Erro ao deletar caso, tente novamente');
    }
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/logon');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {marketName}</span>

        <Link className="button" to="/product/new">Cadastrar novo produto</Link>
        <button 
          onClick={handleLogout} 
          type="button"
        >
          <FiPower size={18} color="#E02041"/>
        </button>
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

            <button 
              onClick={() => handleDeleteProduct(product.id)}
              type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
        
      </ul>
    </div>
  );
}