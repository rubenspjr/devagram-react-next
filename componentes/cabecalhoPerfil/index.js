import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import UsuarioService from '../../services/UsuarioService'
import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg'
import imgLogout from '../../public/imagens/logout.svg'
import CabecalhoComAcoes from '../cabecalhoComAcoes'
import Image from 'next/image'
import Avatar from '../avatar'
import Botao from '../botao'

const usuarioService = new UsuarioService()

export default function CabecalhoPerfil ({
    usuario,
    estaNoPerfilPessoal
    
}) {
    const router = useRouter()
    const [estaSeguindoUsuario, setEstaSeguindoUsuario]= useState (false);
    const [quantidadeSeguidores, setQuantidadeSeguidores]= useState (0);

    useEffect (() =>{
        if(!usuario){
            return;
        }
    
        setEstaSeguindoUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores);
    },[usuario])

    const obterTextoBotao = () => {
        if(estaNoPerfilPessoal){
            return 'Editar perfil';
        }
        if (estaSeguindoUsuario) {
            return'Deixar de seguir';
        }
        return 'Seguir'
    }

    const obterCorBotaoSeguir = () => {
        if(estaSeguindoUsuario || estaNoPerfilPessoal) {
            return 'primaria'
        }
        return 'invertido'
    }

    const manipularCliqueBotaoPrincipal = async () => {
        if(estaNoPerfilPessoal){
           return router.push('/perfil/editar')
        }

        try {
            await usuarioService.alternarSeguir(usuario._id);
            setEstaSeguindoUsuario(
                estaSeguindoUsuario
                ? (quantidadeSeguidores - 1)
                : (quantidadeSeguidores + 1)
            );

            setEstaSeguindoUsuario(!estaSeguindoUsuario)
            
        } catch (error) {
            alert(`Erro ao seguir/deixar de seguir !`)
        }

    }

    const aoClicarSetaEsquerda = () => {
        router.back();
    }

    const logout = () => {
        usuarioService.logout();
        router.push('/')
    }

    const obterElementoDireitaCabecalho = () => {
        if (estaNoPerfilPessoal) {
            return (
                <Image
                    src={imgLogout}
                    alt='icone logout'
                    onClick={logout}
                    width={23}
                    height={23}
                />
            )
        }

        return null;
    }
   
    return (
        <div className='cabecalhoPerfil largura30pctDesktop'> 
        
            <CabecalhoComAcoes
            iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
            aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
            titulo={usuario.nome}
            elementoDireita={obterElementoDireitaCabecalho()}
            />

            <hr className='linhaDivisoria'/>


            <div className='statusPerfil'>
                <Avatar src={usuario.avatar}/>
                <div className='informacoesPerfil'>
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>{usuario.publicacoes}</strong>
                            <span>Publicação</span>
                        </div>
                        <div className='status'>
                            <strong>{quantidadeSeguidores}</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className='status'>
                            <strong>{usuario.seguindo}</strong>
                            <span>Seguindo</span>
                        </div>

                    </div>

                    <Botao
                        texto={obterTextoBotao()}
                        cor={obterCorBotaoSeguir()}
                        manipularClique={manipularCliqueBotaoPrincipal}
                    />

                </div>
            </div>
        </div>
)
}