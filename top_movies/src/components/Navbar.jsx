import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiCameraMovie, BiSearchAlt2 } from "react-icons/bi";

import "./Navbar.css";

const Navbar = () => {
  // Define um estado para armazenar o valor da pesquisa
  const [search, setSearch] = useState("");
  // Obtém a função de navegação do React Router DOM
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário de pesquisa
  const handleSubmit = (e) => {
    // Impede o comportamento padrão de envio do formulário
    e.preventDefault();

    // Se o campo de pesquisa estiver vazio, retorna sem fazer nada
    if (!search) return;

    // Navega para a rota de pesquisa com o termo de pesquisa como parâmetro
    navigate(`/search?q=${search}`, { replace: true });
    // Limpa o campo de pesquisa após o envio do formulário
    setSearch("");
  };

  return (
    // Barra de navegação
    <nav id="navbar">
      {/* Logo e link para a página inicial */}
      <h2>
        <Link to="/">
          <BiCameraMovie /> TopMovies
        </Link>
      </h2>
      {/* Formulário de pesquisa */}
      <form onSubmit={handleSubmit}>
        {/* Campo de entrada para a pesquisa */}
        <input
          type="text"
          placeholder="Pesquisar filme"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        {/* Botão de envio do formulário de pesquisa */}
        <button type="submit">
          <BiSearchAlt2 />
        </button>
      </form>
    </nav>
  );
};

export default Navbar;
