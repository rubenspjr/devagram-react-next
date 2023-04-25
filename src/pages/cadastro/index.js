import Link from "next/link";
import Image from "next/legacy/image";
import Botao from "../../../componentes/botao";
import InputPublico from "../../../componentes/inputPublico";
import { UploadImagem } from "../../../componentes/uploadUImagem";
import { useState } from "react";

import imagemLogo from "../../../public/imagens/logo.svg";
import imagemChave from "../../../public/imagens/chave.svg";
import imagemEnvelope from "../../../public/imagens/envelope.svg";
import imagemUsuarioAtivo from "../../../public/imagens/usuarioAtivo.svg";
import imagemUsuarioCinza from "../../../public/imagens/usuarioCinza.svg";


export default function cadastro () {
    const [imagem, setImagem] = useState(null);
    const [nome,setNome] = useState("");
    const [email, setEmail] =useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");

    return (
        <section className={`paginaCadastro paginaPublica`}>
            <div className="logoContainer desktop">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className ="logo"
                    
                />    
            </div>

            <div className="conteudoPaginaPublica">
                    <form>
                        <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || imagemUsuarioCinza.src}
                        setImagem={setImagem}

                        />
                        <InputPublico
                            imagem={imagemUsuarioAtivo}
                            texto="Nome Completo"
                            tipo="text"
                            aoAlterarValor={e => setNome(e.target.value)}
                             valor = {nome}
                        />
                        <InputPublico
                            imagem={imagemEnvelope}
                            texto="E mail"
                            tipo="email"
                            aoAlterarValor={e => setEmail(e.target.value)}
                            valor = {email}
                        />

                        <InputPublico
                            imagem={imagemChave}
                            texto="Senha"
                            tipo="password"
                            aoAlterarValor={e => setSenha(e.target.value)}
                            valor = {senha}
                         />  

                        <InputPublico
                            imagem={imagemChave}
                            texto="Confirme sua senha"
                            tipo="password"
                            aoAlterarValor={e => setConfirmacaoSenha(e.target.value)}
                            valor = {confirmacaoSenha}
                        />

                        <Botao
                            texto="Cadastrar"
                            tipo="Submit"
                            desabilitado = {false}
                    />
                    </form>

                    <div className="rodapePaginaPublica">
                        <p>Ja possui uma conta ?</p>
                        <Link href= '/cadastro'>Conecte se agora </Link>
                    </div>            
            </div>

        </section>
            
    );
}