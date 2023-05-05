import { useState } from "react";
import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/image";

import ImgCurtir from "../../public/imagens/curtir.svg";
import ImgCurtido from "../../public/imagens/curtido.svg";
import ImgComentarioAtivo from "../../public/imagens/comentarioAtivo.svg";
import ImgComentariocinza from "../../public/imagens/comentarioCinza.svg";
import { FazerComentario } from "./FazerComentario";

const tamanhoLimiteDescricao = 90;

export default function Postagem ({
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado
}){
    const [deveExibirSecaoParaComentar,setDeveExibirSecaoParaComentar] = useState(false);
    const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState (
        tamanhoLimiteDescricao
    );
        const exibirDescricaoCompleta = () => {
            //max number.max_dafe_integer  pega o maior numero possivel
            setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER)
        }

        const exibirDescricaoMenor = () => {
            setTamanhoAtualDaDescricao (tamanhoLimiteDescricao,0)
        }

    const descricaoMaiorQueLimite = () => {
        return descricao.length > tamanhoAtualDaDescricao;
    }

    const descricaoMenorQuelimite = () => {
        return descricao.length < tamanhoAtualDaDescricao
        
    }
    
    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDaDescricao);
            if (descricaoMaiorQueLimite()) {
                mensagem += '...'
            }
            else{
                (descricaoMenorQuelimite()) 
                    mensagem
                
            }

        return mensagem;

    }

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
                            onClick={()=> setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                        />

                        <span className="quantidadeCurtidas">
                            Curtido por <strong>32 Pessoas</strong>
                        </span>

                    </div>

                    <div className="descricaoDaPostagem">
                        <strong className="nomeUsuario">{usuario.nome}</strong>
                        <p className="descricao">
                            {obterDescricao()}
                            {descricaoMaiorQueLimite () && (
                                <span 
                                onClick={exibirDescricaoCompleta}
                                className="exibirDescricaoCompleta">
                                    mais
                                </span>
                            )}
                            {descricaoMenorQuelimite() && (
                                <span
                                onClick={exibirDescricaoMenor}
                                className="exibirDescricaoMenor"
                                >
                                    menos
                                </span>
                            )}
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

            {deveExibirSecaoParaComentar &&
                <FazerComentario 
                usuarioLogado={usuarioLogado}
                />
            }
        </div>
    );
}
