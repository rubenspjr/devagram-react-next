import { useRouter } from "next/router"
import { UploadImagem } from "../../../componentes/uploadUImagem"
import { useRef, useState } from "react"
import CabecalhoComAcoes from "../../../componentes/cabecalhoComAcoes"
import comAutorizacao from "../../../hoc/comAutorizacao"
import imgAvatarPadrao from "../../../public/imagens/avatar.svg"
import imgLimpar from "../../../public/imagens/limpar.svg"
import Image from "next/image"

function EditarPerFil (){
    const [avatar, setAvatar] = useState();
    const [nome, setNome] = useState('')
    const [inputAvatar, setInputAvatar] = useState(null)
    const router = useRouter ()


    const aoCancelarEdicao = () =>{
        router.push ('/perfil/eu')
    }

    const abrirSeletorArquivos = () => {
        console.lof ('abir seletor')
    }

    return (
        <div className="paginaEditarPerfil largura30pctDesktop">
            <div className="conteudoPaginaEditarPerfil">
                <CabecalhoComAcoes
                    titulo={'Editar Perfil'}
                    aoClicarAcaoEsquerda={aoCancelarEdicao}
                    textoEsquerda='Cancelar'
                    elementoDireita={'Concluir'}
                    aoClicarElementoDireita={() => console.log('cliclou elemento')}
                />

            </div>

            <hr className="linhaDivisoria"></hr>

            <div className="edicaoAvatar">
                <UploadImagem
                    setImagem={setAvatar}              
                    imagemPreview={avatar?.preview || imgAvatarPadrao.src}
                    aoSetarAReferencia={setInputAvatar}
                />
                <span
                onClick={abrirSeletorArquivos} 
                >Alterar foto do perfil</span>
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
    )
}
export default comAutorizacao(EditarPerFil)