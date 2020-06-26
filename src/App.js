import React, { useState , useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories , setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((res)=> {
      setRepositories(res.data);
    })
  },[]);

  async function handleAddRepository() {

    const repo =  {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };
    const res =   await api.post("repositories",repo);

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newRep =  repositories.filter(repo => repo.id !== id);

    setRepositories(newRep);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
