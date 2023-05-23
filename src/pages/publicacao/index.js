import { useState } from "react"
import { useRouter } from "next/router"
import { UploadImagem } from "../../../componentes/uploadUImagem"
import CabecalhoComAcoes from "../../../componentes/cabecalhoComAcoes"
import comAutorizacao from "../../../hoc/comAutorizacao"
import Botao from "../../../componentes/botao"
import FeedServices from "../../../services/FeedService"
import imagemPublicacao from "../../../public/imagens/imagemPublicacao.svg"
import imagemSetaEsquerda from "../../../public/imagens/setaEsquerda.svg"

 const limiteDaDescricao = 255
 const descricaoMinima = 3
 const feedService = new FeedServices


 function Publicacao(){
    const [imagem, setImagem]= useState();
    const [inputImagem, setInputImagem] = useState()
    const [etapaAtual, setEtapaAtual] = useState (1)
    const [descricao, setDescricao] = useState('')
    const router = useRouter()

    const estaNaEtapaUm = () => etapaAtual === 1
    
    const obterTextoEsquerdaCabecalho = () => {

        if (estaNaEtapaUm() && imagem){
            return 'Cancelar'
        }

        return ''
    }

    const obterTextoDireitaCabecalho = () => {
        if (!imagem){
            return''
        }
        if (estaNaEtapaUm()) {
            return 'Avançar'
        }
        return 'Compartilhar'
    }

    const aoClicarAcaoEsquerdaCabecalho = () => {
        if (estaNaEtapaUm()) {
            inputImagem.value=null
            setImagem(null)
            return;
        }
        setEtapaAtual(1)
    }
    
    const aoClicarAcaoDireitaCabecalho = () => {
        if(estaNaEtapaUm()){
            setEtapaAtual(2)
        return;
        }
        publicar()
    }

    const escreverDescricao = (e) => {
        const valorAtual = e.target.value;
        if (valorAtual.length >= limiteDaDescricao) {
            return;
        }

        setDescricao(valorAtual);
    }

    const obterClassNameCabecalho = ()=> {
        if (estaNaEtapaUm()){
            return 'primeiraEtapa'
        }
        return 'segundaEtapa'
    }

    const publicar = async () => {
        try {
            if (!validarFormulario()) {
                alert ('A descrição precisa de pelo menos 3 caracteres e a imagem precisa estar selecionada')
                return;
            }
            const corpoPublicacao = new FormData();
            corpoPublicacao.append('descricao', descricao);
            corpoPublicacao.append('file', imagem.arquivo);

        await feedService.fazerPublicacao(corpoPublicacao)
        router.push('/');
        } catch (erro) {
            alert('Erro ao salvar publicação')
        }
    }

    const validarFormulario = () => {
       

        return (
            descricao.length >= descricaoMinima
            && imagem?.arquivo
        )
    }

    return (
        <div className="paginaPublicacao largura30pctDesktop">
            
            <CabecalhoComAcoes
                className={obterClassNameCabecalho()}
                iconeEsquerda={estaNaEtapaUm() ? null : imagemSetaEsquerda}
                aoClicarAcaoEsquerda={aoClicarAcaoEsquerdaCabecalho}
                aoClicarElementoDireita={aoClicarAcaoDireitaCabecalho} 
                textoEsquerda={obterTextoEsquerdaCabecalho ()}
                elementoDireita={obterTextoDireitaCabecalho()}
                titulo='Nova publicação'

            />
            
            <hr className="linhaDivisoria"></hr>

            <div className="conteudoPaginaPublicacao">
                {estaNaEtapaUm()
                ?(
                    <div className="primeiraEtapa">
                    <UploadImagem
                        setImagem={setImagem}
                        aoSetarAReferencia={setInputImagem}
                        imagemPreviewClassName={imagem ? 'previewImagemPublicacao' : ''}
                        imagemPreview={imagem?.preview ||  imagemPublicacao.src}
                    />
                    
                    <span className="desktop textoDragAndDrop">Arraste sua foto aqui!</span>

                    <Botao
                        texto='Selecionar uma imagem'
                        manipularClique={() =>inputImagem?.click()}
                    />
                    </div>
                ) : (
                        <>
                            <div className="segundaEtapa">
                                <UploadImagem
                                    setImagem={setImagem}
                                    imagemPreview={imagem?.preview}
                                />

                                <textarea
                                    rows={5}
                                    value={descricao}
                                    placeholder="Escreva um lengenda..."
                                    onChange={escreverDescricao}
                                ></textarea>
                            </div>
                            <hr className="linhaDivisoria"></hr>
                        </>
                )}
            </div>
        </div>
    )
}
export default comAutorizacao(Publicacao)