import { useRouter } from "next/router"
import { UploadImagem } from "../../../componentes/uploadUImagem"
import { useEffect, useState } from "react"
import CabecalhoComAcoes from "../../../componentes/cabecalhoComAcoes"
import comAutorizacao from "../../../hoc/comAutorizacao"
import UsuarioService from "../../../services/UsuarioService"
import imgAvatarPadrao from "../../../public/imagens/avatar.svg"
import imgLimpar from "../../../public/imagens/limpar.svg"
import Image from "next/image"
import { validarNome } from "../../../utils/validadores"

const usuarioService = new UsuarioService()

function EditarPerFil ({usuarioLogado}){
    const [avatar, setAvatar] = useState();
    const [nome, setNome] = useState('')
    const [inputAvatar, setInputAvatar] = useState(null)
    const router = useRouter ()


    useEffect(() => {
        if(!usuarioLogado){
            return;
        }
        setNome(usuarioLogado.nome)
        setAvatar({
            preview: usuarioLogado.avatar
        })
    },[]);

    const atualizarPerfil = async () => {
        try {
            if (!validarNome(nome)){
                alert('Nome precisa de pelo menos 2 caracteres!')
                return;
            }

            const corporRequisiçao = new FormData();
            corporRequisiçao.append('nome',nome);

            if(avatar.arquivo) {
                corporRequisiçao.append('file',avatar.arquivo)
            }

            await usuarioService.alterarPerfil(corporRequisiçao)
            localStorage.setItem('nome', nome)

            if (avatar.arquivo){
                localStorage.setItem('avatar', avatar.preview)
            }

            router.push('/perfil/eu')
        } catch (error) {
            alert(`Erro ao editar perfil!`)
        }
    }

    const aoCancelarEdicao = () =>{
        router.push('/perfil/eu')
    }
    const abrirSeletorArquivos = () => {
        inputAvatar?.click();
    }

    return (
        <div className="paginaEditarPerfil largura30pctDesktop">
            <div className="conteudoPaginaEditarPerfil">
                <CabecalhoComAcoes
                    titulo={'Editar Perfil'}
                    aoClicarAcaoEsquerda={aoCancelarEdicao}
                    textoEsquerda='Cancelar'
                    elementoDireita={'Concluir'}
                    aoClicarElementoDireita={atualizarPerfil}
                />

                <hr className="linhaDivisoria"></hr>

                                
                <div className="edicaoAvatar">
                    <UploadImagem
                        setImagem={setAvatar}              
                        imagemPreview={avatar?.preview || imgAvatarPadrao.src}
                        imagemPreviewClassName="avatar"
                        aoSetarAReferencia={setInputAvatar}
                    />
                    <span onClick={abrirSeletorArquivos} >Alterar foto do perfil </span>
                </div>

                    <hr className="linhaDivisoria"></hr>

                    <div className="edicaoNome">
                        <label>Nome</label>

                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <Image
                            src={imgLimpar}
                            alt='icone limpar'
                            width={16}
                            height={16}
                            onClick={()=> setNome('')}
                        />
                    
                    </div>
                    <hr className="linhaDivisoria"></hr>
            </div>
        </div>
    )
}
export default comAutorizacao(EditarPerFil)