import React, {useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const ongName = localStorage.getItem('ongName'); //pega o nome da ong do localStorage.
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,  
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.')
        }
    }

    //REACT HOOK: Acessando o GET Profiles para coletar todos os casos.
    useEffect(() => {api.get('profile', {
        headers: {
            Authorization: ongId,
        } //Envia um get com um header para profile para conseguir todos os casos.
    }).then(respose => {
            setIncidents(respose.data); 
        })
    }, [ongId]);
    /* Toda vez que o valor dentro de [] alterar, 
        ele executa a função dnv, caso o array fique vazio 
        então ele vai executar apenas uma vez a função. */
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
               {incidents.map(incidents => (
                    <li key={incidents.id}>
                        <strong>CASO:</strong>
                        <p>{incidents.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incidents.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incidents.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />    
                        </ button>
                    </li>
               ))}
            </ul>

        </div>  
    );
}
