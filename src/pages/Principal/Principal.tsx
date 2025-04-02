import style from './Principal.module.css'

import NavBar from '../../components/NavBar/NavBar'
import Inputs from '../../components/Inputs/Inputs'
import Lista from '../../components/Lista/Lista';

import { Pais } from '../../types';
import { Card } from '../../types'

import React, { useEffect, useState } from 'react';


//Definição do componente (React Functional Component)
const Principal: React.FC = () => {
    
    //Estado para armazenar a lista de países
    const [paises, setPaises] = useState<Pais[]>([]);
    
    //Estado para o país selecionado
    const [paisSelecionado, setPaisSelecionado] = useState<Pais | null>(null);
    
    //Estado para armazenar o local da viagem
    const [local, setLocal] = useState('');

    //Estado para armazenar a meta da viagem
    const [meta, setMeta] = useState('');

    //Estado para armazenar as viagens(cards)
    const [cardViajem, setCardViajem] = useState<Card[]>([]);

    //Estado para o ID do item em edição
    const [editId, setEditId] = useState<number | null>(null);

    //Estado para controlar o próximo ID a ser usado
    const [newId, setNewId] = useState(1);

    
    //Define um efeito e dentro dele cria uma função assíncrona para buscar países da API restcountries,
    //Solicitando apenas os campos name, alpha2Code e flag.
    useEffect(() => {
        const fetchPaises = async () => {

            try {
                const response = await fetch('https://restcountries.com/v2/all?fields=name,alpha2Code,flag');

                //Verifica se a resposta HTTP foi OK
                if(!response.ok) {
                    throw new Error(`Erro ao buscar: ${response.status}`);
                }

                //Converte a resposta para JSON e atualiza o estado de países com os dados recebidos.
                const meta = await response.json();
                setPaises(meta);
            }
            catch (error) {

                console.error(error)
            }
        };
        fetchPaises();
    }, []);

    //Função para lidar com a mudança no select de países
    //Busca o país correspondente no array e atualiza o estado.
    const handlePaisChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const codigoPais = event.target.value;
        const pais = paises.find( c => c.alpha2Code === codigoPais) || null;
        setPaisSelecionado(pais);
    };

    //Função para atualizar o estado do local quando o usuário digitar.
    const handleLocalChange = (value: string) => {
        setLocal(value);
    };

    //Função para atualizar o estado da meta quando o usuário digitar.
    const handleMetaChange = (value: string) => {
        setMeta(value);
    };

    //Função para fazer o envio do formulário
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //Se estiver editando (editId não é null)
        //Então atualiza o card existente com os novos valores e limpa o modo de edição
        if(editId !== null ) {

            if(!local || !meta) {
                alert('Preencha todos os campos!')
                return;
            }
            
            setCardViajem(itens =>
                itens.map(item =>
                    item.id === editId ? { ...item, local, meta } :item
            )
        );
        setEditId(null)
        
        //Caso esteja inserindo nova viagem, verifica se todos os campos necessários estão preenchidos
        } else {
            
            if(!paisSelecionado || !local || !meta) {
                alert('Preencha todos os campos!')
                return;
            }

            //Cria uma nova viagem e adiciona à lista de cards, incrementando o contador de IDs.
            const novaViajem: Card = {
                id: newId,
                codigoPais: paisSelecionado.alpha2Code,
                pais: paisSelecionado,
                local,
                meta
            };
            setCardViajem(itens => [...itens, novaViajem]);
            setNewId(prevId => prevId + 1)
        }

        setPaisSelecionado(null);
        setLocal('');
        setMeta('');
    }

    //Função para lidar com a edição de um card, carregando os dados do item nos campos do formulário.
    const handleEdit = (id: number) => {
        const item = cardViajem.find(item => item.id === id);
        if(item) {
            setLocal(item.local);
            setMeta(item.meta);
            setEditId(item.id);
        }
    };

    //Função para excluir um card da lista.
    const handleDelete = (id: number) => {
        setCardViajem(itens => itens.filter(item => item.id !== id));
    }

    //Função para cancelar a edição
    const handleCancelEdit = () => {
        setPaisSelecionado(null);
        setLocal('');
        setMeta('');
        setEditId(null);
    }

    return (
        <div className={style.containerPrincipail}>
            <NavBar />
            
            <Inputs
                paises={paises}
                paisSelecionado={paisSelecionado}
                local={local}
                meta={meta}
                editId={editId}

                onPaisChange={handlePaisChange}
                onLocalChange={handleLocalChange}
                onMetaChange={handleMetaChange}
                onSubmit={handleSubmit}
                onCancelEdit={handleCancelEdit}
            />

            <Lista
                itens={cardViajem}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    )
}

export default Principal
