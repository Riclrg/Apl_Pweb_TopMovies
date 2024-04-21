import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

// Obtém a URL de pesquisa da API e a chave de API das variáveis de ambiente
const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";

const Search = () => {
  // Obtém os parâmetros de pesquisa da URL
  const [searchParams] = useSearchParams();

  // Define um estado para armazenar os filmes pesquisados
  const [movies, setMovies] = useState([]);

  // Obtém o valor do parâmetro de pesquisa "q"
  const query = searchParams.get("q");

  // Função assíncrona para obter os filmes pesquisados
  const getSearchedMovies = async (url) => {
    // Faz uma solicitação à URL fornecida
    const res = await fetch(url);
    // Converte a resposta em formato JSON
    const data = await res.json();
    // Define o estado com os resultados da pesquisa recebidos da API
    setMovies(data.results);
  };

  // Efeito que é executado sempre que o valor do parâmetro de pesquisa "q" muda
  useEffect(() => {
    // Monta a URL completa para a pesquisa com o valor do parâmetro "q"
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;
    // Chama a função para obter os filmes pesquisados
    getSearchedMovies(searchWithQueryURL);
  }, [query]);

  // Renderiza os resultados da pesquisa na página
  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {/* Mapeia os filmes pesquisados e renderiza um componente MovieCard para cada um */}
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

export default Search;
