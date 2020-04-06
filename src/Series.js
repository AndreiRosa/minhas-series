import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'

const Series = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/series').then(res => {
      setData(res.data.data)
    })
  }, [])

  const deleteSeries = id => {
    axios
      .delete('/api/series/' + id)
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
          <button className='btn btn-danger' onClick={() => deleteSeries(record.id)}>Remover</button>
          <Link to={'/series/' + record.id} className='btn btn-warning'>Info</Link>
        </td>
     </tr>
    )
  }

  if (data.length === 0) {
    return(
      <div className='container '>
        <h1>Séries</h1>
        <div>
          <Link to='/series/novo' className='btn btn-primary'>Nova série</Link>
        </div>
        <div className='alert alert-warning' role='alert'>
          Você não possui séries criadas!
        </div>
      </div>
    )
  }

  return(
    <div className='container '>
      <h1>Séries</h1>
      <div>
        <Link to='/series/novo' className='btn btn-primary'>Nova série</Link>
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

export default Series
