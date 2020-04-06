import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const Genres = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/genres').then(res => {
      setData(res.data.data)
    })
  }, [])

  const deleteGenre = id => {
    axios
      .delete('/api/genres/' + id)
      .then(res => {
        const filtered = data.filter(item => item.id !== id)
        setData(filtered)
      })
  }

  const rend = record => {
    return(
      <tr key={record.id}>

        <td>{record.name}</td>
        <td>
          <button className='btn btn-danger' onClick={() => deleteGenre(record.id)}>Remover</button>
          <Link to={'/generos/' + record.id} className='btn btn-warning'>Editar</Link>
        </td>
     </tr>
    )
  }

  if (data.length === 0) {
    return(
      <div className='container '>
        <h1>Gêneros</h1>
        <div>
          <Link to='/generos/novo' className='btn btn-primary'>Novo gênero</Link>
        </div>
        <div className='alert alert-warning' role='alert'>
          Você não possui gêneros criados!
        </div>
      </div>
    )
  }

  return(
    <div className='container '>
      <h1>Gêneros</h1>
      <div>
        <Link to='/generos/novo' className='btn btn-primary'>Novo gênero</Link>
      </div>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map(rend)}
        </tbody>
      </table>
    </div>
  )
}

export default Genres
