import style from './Inputs.module.css'

import { InputMask } from '@react-input/mask';

import { InputsProps } from '../../types/index'


// Definição do componente Inputs como um Componente Funcional que recebe as props do InputsProps
const Inputs: React.FC<InputsProps> = ({
  paises, // Array com a lista de países
  paisSelecionado, // Objeto contendo o país atualmente selecionado
  local,
  meta,
  editId, // ID do item em edição, ou null se não estiver editando
  
  onPaisChange,
  onLocalChange,
  onMetaChange,
  onSubmit,
  onCancelEdit

}) => {

  // Variável que indica se o componente está em modo de edição (verdadeiro quando editId não é null)
  const modoEditar = editId !== null
  
  return (

    <form onSubmit={onSubmit}>
      <div className={style.containerInputs}>
        
        <div className={style.inputSelect}>
          <label htmlFor='pais'> País </label>
          
          <select
            id='pais'
            value={paisSelecionado?.alpha2Code || ''}
            onChange={onPaisChange}
            disabled={modoEditar}  // Quando a variável modoEditar é igual a true, desabilita o select
          >
            <option value="" disabled> Selecione </option>
            
            {paises.map((pais) => (
              <option key={pais.alpha2Code} value={pais.alpha2Code}>
                {pais.name}
              </option>
            ))}

          </select>

        </div>

        <div className={style.inputLocal}>
          <label htmlFor='local'> Local </label>
          <input
            id='local'
            type="text"
            value={local}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onLocalChange(e.target.value)} // Chama onLocalChange com o novo valor quando alterado
            placeholder='Digite o local que deseja conhecer'
            />
        </div>

        <div className={style.inputMeta}>
          <label htmlFor='meta'> Meta </label>
          <InputMask
            id='meta'
            mask='mm/yyyy'                     // Define o formato da máscara (mês/ano)
            replacement={{ m: /\d/, y: /\d/ }} // Define que 'm' e 'y' na máscara devem ser substituídos por dígitos
            value={meta}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onMetaChange(e.target.value)}
            placeholder='mês/ano'
            />
        </div>

        {modoEditar ?
          // Se modoEditar for true, mostra dois botões (Cancelar e Salvar)
          <div className={style.containerButtonsEdit}>
            <button type='button' onClick={onCancelEdit}> Cancelar </button>
            <button type='submit'> Salvar </button>
          </div>
        :
          // Se for false, mostra o botão salvar
          <button type='submit'> Adicionar </button>
        }

      </div>
    </form>
  );
}

export default Inputs
