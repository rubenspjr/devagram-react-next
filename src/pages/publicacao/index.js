import { useState } from "react"
import CabecalhoComAcoes from "../../../componentes/cabecalhoComAcoes"
import { UploadImagem } from "../../../componentes/uploadUImagem"
import imagemPublicacao from "../../../public/imagens/imagemPublicacao.svg"
import comAutorizacao from "../../../hoc/comAutorizacao"
import Botao from "../../../componentes/botao"

 function Publicacao(){
    const [imagem, setImagem]= useState();
    const [inputImagem, setInputImagem] = useState()
    return (
        <div className="paginaPublicacao largura30pctDesktop">
            <CabecalhoComAcoes
            textoEsquerda='Cancelar'
            elementoDireita={'Avaçar'}
            titulo='Nova publicação'

            />
            <div className="conteudoPaginaPublicacao">
                <div className="primeiraEtapa">
                <UploadImagem
                    setImagem={setImagem}
                    aoSetarAReferencia={setImagem}
                    imagemPreviewClassName={imagem ? 'previewImagemPublicacao' : ''}
                    imagemPreview={imagem?.preview ||  imagemPublicacao.src}
                />
                
                <span className="desktop textoDragAndDrop">Arraste sua foto aqui!</span>

                <Botao
                    texto='Selecionar uma imagem'
                    manipularClique={() =>console.log('clickou')}
                />
                </div>
            </div>
        </div>
    )
}
export default comAutorizacao(Publicacao)