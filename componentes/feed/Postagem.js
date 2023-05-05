import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/image";

import ImgCurtir from "../../public/imagens/curtir.svg";
import ImgCurtido from "../../public/imagens/curtido.svg";
import ImgComentarioAtivo from "../../public/imagens/comentarioAtivo.svg";
import ImgComentariocinza from "../../public/imagens/comentarioCinza.svg";



export default function Postagem ({
    usuario,
    fotoDoPost,
    descricao,
    comentarios
}){
    return (
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className="cabecalhoPostagem">
                    <Avatar src={usuario.avatar}/>
                    <strong>{usuario.nome}</strong>

                </section>

            </Link>

            <div className="fotoDaPostagem">
                <img src = {fotoDoPost} alt='foto da postagem'/>
            </div>

            <div className="rodapeDaPostagem">
                    <div className="acoesDaPostagem">
                        <Image
                            src={ImgCurtir}
                            alt="icone curtir"
                            width={20}
                            height={20}
                            onClick={()=> console.log('curttiu')}
                        />

                        <Image
                            src={ImgComentariocinza}
                            alt="icone comentario"
                            width={20}
                            height={20}
                            onClick={()=> console.log('comentou')}
                        />

                        <span className="quantidadeCurtidas">
                            Curtido por <strong>32 Pessoas</strong>
                        </span>

                    </div>

                    <div className="descricaoDaPostagem">
                        <strong className="nomeUsuario">{usuario.nome}</strong>
                        <p className="descricao">
                            {descricao}
                        </p>

                    </div>

                    <div className="comentariosDaPublicacao">
                        {comentarios.map((comentario, i )=> (
                            <div className="comentario" key= {i}>
                                <strong className="nomeUsuario">{comentario.nome}</strong>
                                <p className="descricao">{comentario.mensagem}</p>
                            </div>
                        ))}
                    </div>

            </div>

        </div>
    );
}
