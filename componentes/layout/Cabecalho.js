import Image from "next/legacy/image";
import logoHorizontalImg from "../../public/imagens/logoHorizontal.svg";
import imagemLupa from "../../public/imagens/lupa.svg";
import Navegacao from "./Navegacao";
import { useState } from "react";
import ResultadoPesquisa from "./ResultadoPesquisa";


export default function Cabecalho( ) {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState([]);

    const aoPesquisasr = (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);

        if (termoPesquisado.length <3) {
            return;
        }

        setResultadoPesquisa([
            {
                avatar: '',
                nome: 'toretto',
                email: 'toretto@toretto.com',
                _id : '12345'

            },

            {
                avatar: '',
                nome: 'Toretta',
                email: 'toretta@toretto.com',
                _id : '2655565',

            },

            {
                avatar: '',
                nome: 'torettao',
                email: 'torettao@toretto.com',
                _id : '18888885',

            }
        ])
    }

    const aoClicarResultadoPesquisa = () => {
        console.log('aoClicarResultadoPesquisa', {id});
    }

    return (
        <header className="cabecalhoPrincipal">
            <div className="conteudoCabecalhoPrincipal">
                <div className="logoCabecalhoPrincipal">
                    <Image
                        src={logoHorizontalImg}
                        alt='logo devagram'
                        layout="fill"
                     />
                </div>

                <div className="barraPesquisa">
                    <div className="containerImagemLupa">
                        <Image
                            src={imagemLupa}
                            alt = 'imagemLupa'
                            layout="fill"
                        />    
                    </div>
                <input
                    type="text"    
                    placeholder="Pesquisar"
                    value={termoPesquisado}
                    onChange={aoPesquisasr}
                />    
                </div>

                <Navegacao className="desktop" />
            </div>

            {resultadoPesquisa.length > 0 && (
                <div className="resultadoPesquisaContainer">
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa
                            avatar= {r.avatar}
                            nome= {r.nome}
                            email= {r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                     ))}

            </div>
            )};


        </header>
    );
}