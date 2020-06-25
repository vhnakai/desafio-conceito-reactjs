import React from "react";
import api from './services/api';

import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

function App() {

  const [repositories , setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((res)=> {
      setRepositories(res.data);
    })
  },[]);

  async function handleAddRepository() {
    const res =   await api.post("repositories", {
      id,
      title,
      url,
      techs
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
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
