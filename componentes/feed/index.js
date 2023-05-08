import { useEffect, useState } from "react";
import Postagem from "./Postagem";
import FeedServices from "../../services/FeedService";

const feedService = new FeedServices();

export function Feed({usuarioLogado}) {
    const [listaDePostagens, setListaDePostagens] = useState ([]);

    useEffect ( () => {
        async function carregarDados(){
            const { data } = await feedService.carregarPostagens();
        console.log(data);
        const postagensFormatadas = data.map((postagem) => (
            {
                id:postagem._id,
                usuario: {
                    id:postagem.userId,
                    nome: postagem.usuario.nome,
                    avatar: postagem.usuario.avatar
                },
                fotoDoPost: postagem.foto,
                descricao: postagem.descricao,
                curtidas: postagem.likes,
                comentarios : postagem.comentarios?.map(c =>({
                    nome: c.nome,
                    mensagem: c.comentario
                })),

            }
        ))

        setListaDePostagens(postagensFormatadas);
        }
        carregarDados()    
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