import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css";

// Obtém a URL da API de filmes e a chave de API das variáveis de ambiente
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
  // Define um estado para armazenar os filmes mais bem avaliados
  const [topMovies, setTopMovies] = useState([]);

  // Função assíncrona para obter os filmes mais bem avaliados da API
  const getTopRatedMovies = async (url) => {
    // Faz uma solicitação à URL fornecida
    const res = await fetch(url);
    // Converte a resposta em formato JSON
    const data = await res.json();
    // Atualiza o estado com os resultados recebidos da API
    setTopMovies(data.results);
  };

  // Efeito que é executado quando o componente é montado
  useEffect(() => {
    // Monta a URL completa para os filmes mais bem avaliados
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    // Exibe a URL montada no console (apenas para fins de depuração)
    console.log(topRatedUrl);
    // Chama a função para obter os filmes mais bem avaliados
    getTopRatedMovies(topRatedUrl);
  }, []);

  // Exibe os filmes mais bem avaliados na interface do usuário
  return (
    <div className="container">
      <h2 className="title">Filmes Mais Bem Avaliados</h2>
      <div className="movies-container">
        {/* Mapeia os filmes e renderiza um componente MovieCard para cada um */}
        {topMovies.length > 0 &&
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
