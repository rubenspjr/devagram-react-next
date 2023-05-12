import { useEffect, useState } from "react";
import Postagem from "./Postagem";
import FeedServices from "../../services/FeedService";

const feedService = new FeedServices();

export  default function Feed({usuarioLogado, idUsuario}) {
    const [listaDePostagens, setListaDePostagens] = useState ([]);

    useEffect (() => {
          async function carregarDados ()  {
            setListaDePostagens([])
            const { data } = await feedService.carregarPostagens(idUsuario);
         if (data.length> 0) {
        const postagensFormatadas = data.map((postagem) => (
            {
                id: postagem._id,
                usuario: {
                    id: postagem.userId,
                    nome: postagem?.usuario?.nome,
                    avatar: postagem?.usuario?.avatar
                },
                fotoDoPost: postagem.foto,
                descricao: postagem.descricao,
                curtidas: postagem.likes,
                comentarios : postagem.comentario.map((c) =>({
                    nome: c.nome,
                    mensagem: c.comentario
                })),
            }));

                setListaDePostagens(postagensFormatadas);
            } else {
                setListaDePostagens([]);
            }
        }
         
        carregarDados()    
    }, [usuarioLogado, idUsuario]);

        if(!setListaDePostagens.length ===0 ){
            return null
        }
    

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