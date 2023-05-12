import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CabacalhoComAcoes from "../../../../componentes/cabecalhoComAcoes";
import  Feed  from "../../../../componentes/feed";
import comAutorizacao from "../../../../hoc/comAutorizacao";
import CabecalhoPerfil from "../../../../componentes/cabecalhoPerfil";
import UsuarioService from "../../../../services/UsuarioService";

const usuarioService = new UsuarioService

 function Perfil({usuarioLogado}) {
    const [usuario,setUsuario] = useState ({})
    const router = useRouter();

    const obterPerfil = async (idUsuario) => {
        try {
            const { data } = await usuarioService.obterPerfil(idUsuario)
            return data
        } catch (error) {
            alert (`Erro ao obter o perfil do usuario`)
        }
    }

    useEffect (() => {
        if(!router.query.id) {
            return;
        }
        const tituloHeader = async () =>{
            const dadosPerfil = await obterPerfil(router.query.id);
            setUsuario(dadosPerfil)
        }
    tituloHeader()
    },[usuarioLogado,router.query.id])


        
    return (
        <header className="paginaPerfil">
            <CabecalhoPerfil
               usuarioLogado={usuarioLogado} 
               usuario={usuario}
            />
            <Feed usuarioLogado = {usuarioLogado}
                  idUsuario = {usuario?._id}

            />
        </header>
    );
}

export default comAutorizacao(Perfil);