import { useEffect, useState } from "react";
import Postagem from "./Postagem";


export function Feed({usuarioLogado}) {
    const [listaDePostagens, setListaDePostagens] = useState ([]);

    useEffect (() => {
        console.log('carregar o feed')
        setListaDePostagens([
            {
                 id:'1',
                 usuario: {
                    id:'1',
                    nome:'Toretto',
                    avatar : null
                    },
                fotoDoPost: 'https://i.pinimg.com/736x/40/7d/95/407d958257b6fbe8e1e34465720b0f7f.jpg',    
                descricao : ' SAUDADES MEU MANO See You Again, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry/s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                curtidas: [],
                comentarios: [
                    {
                        nome:'Fulano De Tal',
                        mensagem : 'Pague meu 5 Real'
                    },
                    {
                        nome:'Fulano Da Rua',
                        mensagem : 'Pague meu 5 Real'
                    },
                    {
                        nome:'Fulano Da Esquina',
                        mensagem : 'Pague meu 5 Real caloteiro'
                    },

                ]

            },
            {
                id:'2',
                usuario: {
                   id:'2',
                   nome:'Torettao',
                   avatar : null
                   },
               fotoDoPost: 'https://conteudo.imguol.com.br/c/entretenimento/13/2017/09/20/marcos-o-vin-diesel-brasileiro-1505924753054_v2_900x506.jpg',    
               descricao : 'tu ta me deveno Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry/s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived no',
               curtidas: [],
               comentarios: [
                   {
                       nome:'Cliclano',
                       mensagem : 'Pague meu 5 Real tbm'
                   }

               ]

           }
        ])
    }, [usuarioLogado]);

    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.map(dadosPostagem =>(
                <Postagem 
                    key={dadosPostagem.id} 
                    {...dadosPostagem}
                    usuarioLogado={usuarioLogado}

                    />
            ))}

        </div>
    )
}