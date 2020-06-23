import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

export default function Busca(){

const [es, setEs] = useState('');
const [mg, setmg] = useState('');
const [sp, setsp] = useState('');
const [rj, setrj] = useState('');
const history = useHistory();

async function handleSearching (e){
  var abc = e  
  const response = await api.post('busca', { abc });
 console.log('ola')
}

return (
    <div className="logo-container">
      <section className="form">
        
        <form onSubmit={handleSearching}>
          <h1>Faça seu logon</h1>
          <input type='radio'
            placeholder="Sua ID"
            value={es}
            onChange={e => setEs(e.target.value)}
          />
          <input type='radio'
            placeholder="Sua ID"
            value={sp}
            onChange={e => setsp(e.target.value)}
          />
          <input type='radio'
            placeholder="Sua ID"
            value={mg}
            onChange={e => setmg(e.target.value)}
          />
          <input type='radio'
            placeholder="Sua ID"
            value={rj}
            onChange={e => setrj(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          
        </form>
      </section>
      
    </div>
  );}