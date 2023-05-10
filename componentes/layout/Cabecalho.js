import Image from "next/legacy/image";
import logoHorizontalImg from "../../public/imagens/logoHorizontal.svg";
import imagemLupa from "../../public/imagens/lupa.svg";
import Navegacao from "./Navegacao";
import { useState } from "react";
import ResultadoPesquisa from "./ResultadoPesquisa";
import UsuarioService from "../../services/UsuarioService";
import { useRouter } from "next/router";

const usuarioService = new UsuarioService();

export default function Cabecalho( ) {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState('');
    const router = useRouter();

    let cabecalhoClassName = ''
        if (window && window.location.pathname !== '/'){
            cabecalhoClassName = 'desktop';
        }

    const aoPesquisasr = async (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);

        if (termoPesquisado.length <3) {
            return;
        }

        try {
            const { data } = await usuarioService.pesquisar(termoPesquisado);
            setResultadoPesquisa(data);
        } catch (error) {
            alert('Erro ao pesquisar usuario.' + error?.response?.data?.erro);
        }

        
    }

    const aoClicarResultadoPesquisa = (id) => {
        setResultadoPesquisa([]);
        setTermoPesquisado('');
        router.push(`/perfil/${id}`)
    }

    const redirecionarParaHome = () => {
        router.push('/');
    }

    return (
        <header className={`cabecalhoPrincipal ${cabecalhoClassName}`}>
            <div className="conteudoCabecalhoPrincipal">
                <div className="logoCabecalhoPrincipal">
                    <Image
                        onClick={redirecionarParaHome}
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
            )}


        </header>
    );
}