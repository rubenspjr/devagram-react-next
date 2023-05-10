import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabacalhoComAcoes from "../../../../componentes/cabecalhoComAcoes";
import  Feed  from "../../../../componentes/feed";
import comAutorizacao from "../../../../hoc/comAutorizacao";
import CabecalhoPerfil from "../../../../componentes/cabecalhoPerfil";


 function Perfil({usuarioLogado}) {
    const [usuario,setUsuario] = useState ({})
    const router = useRouter();

    useEffect (() => {

        const tituloHeader = async () =>{
            setUsuario({
               nome: 'Rubens Toretto' 
            })
        }
    tituloHeader()
    },[router.query.id])


        
    return (
        <header className="paginaPerfil">
            <CabecalhoPerfil
               usuarioLogado={usuarioLogado} 
               usuario={usuario}
            />
            <Feed usuarioLogado = {usuarioLogado}/>
        </header>
    );
}

export default comAutorizacao(Perfil);