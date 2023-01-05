import IFilme from "interfaces/IFilme";
import { useState } from "react";
import { useEffect } from "react";
import api from "services/api";
import { Link } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {

    const [filmes, setFilmes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "635d7bb326f6496e4d097671bf2244e1",
                    language: "pt-BR",
                    page: 1,
                }
            })

            console.log(response.data.results)
            setFilmes(response.data.results.slice(0, 10));
            setLoading(false);
        }

        loadFilmes();

    }, []);

    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <h1>Lançamentos em Cartaz</h1>
            <div className="lista-filmes">
                {filmes.map((filme: IFilme) => (
                    <article key={filme.id}>
                        <strong>{filme.title}</strong>
                        <img 
                            src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} 
                            alt={filme.title} 
                        />
                        <Link to={`/filme/${filme.id}`}>Acessar</Link>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Home;