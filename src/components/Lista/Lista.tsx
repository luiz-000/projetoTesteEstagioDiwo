import style from './Lista.module.css';

import { ListaViagem } from '../../types/index';

import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';


// Definição do componente Cards como um componente Funcional que recebe as props da ListaViagem
const Lista: React.FC<ListaViagem> = ({
    itens, //Array com as informações da viagem
    onEdit,
    onDelete

}) => {

    // Se não houver viagens cadastradas, exibe uma mensagem informativa
    if(itens.length === 0) {
        return <h1 style={{ fontFamily: 'Roboto' , textAlign: 'center'}}> Nenhuma viagem marcada! </h1>
    }

    return (
        <div className={style.container}>
            <ul>
                <div className={style.containerCard}>

                    {itens.map((item) => (
                        
                        <div className={style.cards}>
                            <li key={item.id}>
                            {/* Item da lista com key única baseada no ID do item */}

                                <div className={style.infoTopo}>

                                    <div className={style.esquerdo}>
                                        {/* Mostra a bandeira e o nome do pais */}
                                        {item.pais.flag && ( <img src={item.pais.flag}/> )}
                                        <p> {item.pais.name.toUpperCase()} </p>
                                    </div>
                                
                                    {/* Mostra os buttons para editar ou deleter o card, e passa o ID do item para a função */}
                                    <div className={style.direito}>
                                        <button className={style.buttonEdit} onClick={() => onEdit(item.id)}> <EditIcon /> </button>
                                        <button className={style.buttonDelete} onClick={() => onDelete(item.id)}> <ClearIcon /> </button>
                                    </div>
                                </div>

                                {/* Mostra o local e a meta da viagem */}
                                <div className={style.dadosPais}>
                                    <p> Local: {item.local} </p>
                                    <p> Meta: {(item.meta)} </p>
                                </div>
                            </li>
                        </div>
                        
                    ))}
                    
                </div>
            </ul>
        </div>
    )
}

export default Lista
