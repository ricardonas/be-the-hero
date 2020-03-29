import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

//Styles
import './styles.css';

//Images
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch (e) {
            alert(e);
        }
        
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo" />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input 
                        placeholder="Sua ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button type="submit" className="button">
                        Entrar
                    </button>

                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041" />
                       Não tenho cadastro
                    </Link>
                </form>
            
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}
