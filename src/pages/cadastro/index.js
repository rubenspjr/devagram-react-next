import Link from "next/link";
import Image from "next/legacy/image";
import Botao from "../../../componentes/botao";
import InputPublico from "../../../componentes/inputPublico";
import { UploadImagem } from "../../../componentes/uploadUImagem";
import { useState } from "react";
import {validarConfirmacaoSenha,validarEmail,validarNome,validarSenha} from "../../../utils/validadores";
import UsuarioService from "../../../services/UsuarioService";

import imagemLogo from "../../../public/imagens/logo.svg";
import imagemChave from "../../../public/imagens/chave.svg";
import imagemEnvelope from "../../../public/imagens/envelope.svg";
import imagemUsuarioAtivo from "../../../public/imagens/usuarioAtivo.svg";
import imagemAvatar from "../../../public/imagens/avatar.svg";
import { useRouter } from "next/router";

const usuarioService = new UsuarioService();

export default function cadastro () {
    const [imagem, setImagem] = useState(null);
    const [nome,setNome] = useState("");
    const [email, setEmail] =useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [estaSubmentendo, setEstaSubmetendo] = useState (false)
    const router = useRouter();

    const validarFormulario = () => {
        return (
            validarNome (nome)
            && validarEmail(email)
            && validarSenha (senha)
            && validarConfirmacaoSenha(senha, confirmacaoSenha)
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault ();
        if (!validarFormulario()) {
            return;
        }

        setEstaSubmetendo(true);

        try {
            const corpoReqCadastro = new FormData();
            corpoReqCadastro.append("nome", nome);
            corpoReqCadastro.append("email", email);
            corpoReqCadastro.append("senha", senha);

            if (imagem?.arquivo){
                corpoReqCadastro.append("file", imagem.arquivo);

            }

            await usuarioService.cadastro(corpoReqCadastro);
            await usuarioService.login({
                login : email,
                senha
            });
            router.push('/');
        } catch (error) {
            alert(
                "Erro ao cadastrar usuario." + error?.response?.data?.erro
            )
        }
        setEstaSubmetendo(false);
    }

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
                    <form onSubmit={aoSubmeter}>
                        <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || imagemAvatar.src}
                        setImagem={setImagem}

                        />
                        <InputPublico
                            imagem={imagemUsuarioAtivo}
                            texto="Nome Completo"
                            tipo="text"
                            aoAlterarValor={e => setNome(e.target.value)}
                             valor = {nome}
                             mensagemValidacao="O nome precisa de pelo menos 2 caracteres"
                             exibirMensagemValidacao = {nome && !validarNome(nome)}
                        />
                        <InputPublico
                            imagem={imagemEnvelope}
                            texto="E mail"
                            tipo="email"
                            aoAlterarValor={e => setEmail(e.target.value)}
                            valor = {email}
                            mensagemValidacao="O E mail informado é invalido"
                            exibirMensagemValidacao = {email && !validarEmail(email)}
                        />

                        <InputPublico
                            imagem={imagemChave}
                            texto="Senha"
                            tipo="password"
                            aoAlterarValor={e => setSenha(e.target.value)}
                            valor = {senha}
                            mensagemValidacao="A senha precisa de pelo menos 3 caracteres"
                            exibirMensagemValidacao = {senha && !validarSenha(senha)}
                         />  

                        <InputPublico
                            imagem={imagemChave}
                            texto="Confirme sua senha"
                            tipo="password"
                            aoAlterarValor={e => setConfirmacaoSenha(e.target.value)}
                            valor = {confirmacaoSenha}
                            mensagemValidacao="As senhas precisam ser iguais"
                            exibirMensagemValidacao = {confirmacaoSenha && !validarConfirmacaoSenha(senha,confirmacaoSenha)}
                        />

                        <Botao
                            texto="Cadastrar"
                            tipo="Submit"
                            desabilitado = {!validarFormulario() || estaSubmentendo}
                    />
                    </form>

                    <div className="rodapePaginaPublica">
                        <p>Ja possui uma conta ?</p>
                        <Link href= '/'>Conecte se agora </Link>
                    </div>            
            </div>

        </section>
            
    );
}