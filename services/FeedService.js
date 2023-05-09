import HttpServices from "./HttpServices";

export default class FeedServices extends HttpServices {
   async carregarPostagens(idUsuario){
        let url = '/feed';
        if(idUsuario){
            url += `?id=${idUsuario}`;
        }
        return this.get(url);

    }

    async adicionarComentario (idPostagem, comentario) {
        return this.put(`/comentario?id=${idPostagem}`,{
            comentario
        });
    }

    async alterarCurtida(idPostagem) {
        return this.put (`/like?id=${idPostagem}`);
    }
}