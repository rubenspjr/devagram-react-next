import imgSetaEsquerda from '../../public/imagens/setaEsquerda.svg'
import CabacalhoComAcoes from '../cabecalhoComAcoes'
import Avatar from '../avatar'
import Botao from '../botao'


export default function CabecalhoPerfil ({
    usuario,
}) {
    return (
        <div className='cabecalhoPerfil largura30pctDesktop'> 
            <CabacalhoComAcoes
            iconeEsquerda={imgSetaEsquerda}
            titulo={usuario.nome}
            />


            <div className='statusPerfil'>
                <Avatar src={usuario.avatar}/>
                <div className='informacoesPerfil'>
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>15</strong>
                            <span>Publications</span>
                        </div>
                        <div className='status'>
                            <strong>120</strong>
                            <span>Followers</span>
                        </div>
                        <div className='status'>
                            <strong>135</strong>
                            <span>Following</span>
                        </div>

                    </div>

                    <Botao
                        texto={'Following'}
                        cor='primaria'
                    />

                </div>
            </div>
        </div>
)
}