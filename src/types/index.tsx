// Interface País que representa a estrutura de um país
export interface Pais {
    
    alpha2Code: string; // Código do país
    name: string;       // Nome do país
    flag: string;       // URL pra bandeira do país
}


// Interface InputsProps que representa as props recebidas pelo componente Inputs
export interface InputsProps {
    paises: Pais[];                 // Array de países disponíveis para seleção
    paisSelecionado: Pais | null;   // País atualmente selecionado ou null se nenhum selecionado
    local: string;                  // Valor atual do campo de local
    meta: string;                   // Valor atual do campo de meta (data
    editId: number | null;          // ID do item em edição ou null se não estiver editando
    
    
    // Função chamada quando o usuário muda a seleção de país
    onPaisChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;

    // Função chamada quando o usuário altera o valor do input Local
    onLocalChange: (value: string) => void;

    // Função chamada quando o usuário altera o valor do input Meta
    onMetaChange: (value: string) => void;

    // Função chamada quando o formulário é submetido
    onSubmit: (e: React.FormEvent) => void;

    // Função chamada quando o usuário cancela uma edição
    onCancelEdit: () => void;
}


// Interface Card que representa a estrutura de um card de viagem
export interface Card {
    id: number;             // Identificador único do card de viagem
    codigoPais: string;     // Código do país (alpha2Code)
    pais: Pais;             // Objeto com os dados completos do país
    local: string;          // Local da viagem
    meta: string;           // Data da viagem
}


// Interface ListaViagem que representa as props recebidas pelo componente Lista
export interface ListaViagem {
    itens: Card[];                   // Array com os cards de viagem a serem exibidos
    onEdit: (id: number) => void;    // Função para lidar com a edição de um item
    onDelete: (id: number) => void;  // Função para lidar com a exclusão de um item
}
