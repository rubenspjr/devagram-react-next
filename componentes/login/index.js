import { useState } from "react";
import Image from "next/legacy/image";
import Botao from "../botao";
import Link from "next/link";
import InputPublico from "../inputPublico";
import {validarEmail, validarSenha} from "../../utils/validadores";
import UsuarioService from "../../services/UsuarioService";

import imagemEnvelope from "../../public/imagens/envelope.svg";
import imagemChave from "../../public/imagens/chave.svg";
import imagemLogo from "../../public/imagens/logo.svg";

const usuarioService = new UsuarioService();

export default function Login (){
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [estaSubmentendo, setEstaSubmetendo] = useState (false);

    const validarFormulario = ()=> {
        return (
            validarEmail (email)
            && validarSenha (senha)
        )
    }
    const aoSubmeter = async (e) => {
        e.preventDefault ();
            if(!validarFormulario()) {
                return;
            }
            
            setEstaSubmetendo(true);

            try {
                await usuarioService.login({
                    login:email,
                    senha
                });
                //todo : redirecionar o usuario para home
            } catch (error) {
                alert(
                    "Erro ao realizar o login ." + error?.response?.data?.erro
                )
            }

    }   

    return (
        <section className={`paginaLogin paginaPublica`}>
            <div className="logoContainer">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O endereço informado é invalido"
                        exibirMensagemValidacao ={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor = {senha}
                        mensagemValidacao="Precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao = {senha && !validarSenha(senha)}
                    />

                    <Botao
                        texto="Login"
                        tipo="Submit"
                        desabilitado = {!validarFormulario() || estaSubmentendo}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Nao possui uma conta ?</p>
                    <Link href= '/cadastro'>Cadastre se agora </Link>
                </div>

            </div>
        </section>
    );
}