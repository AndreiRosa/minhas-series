import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import {Badge} from 'reactstrap'

const SeriesInfo = ({match}) => {
  const [form, setForm] = useState({
    name: ''
  })
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState({})
  const [mode, setMode] = useState('INFO')
  const [genres, setGenres] = useState([])
  const [genreId, setGenreId] = useState('')

  useEffect(() => {
    axios
      .get('/api/series/' + match.params.id)
      .then(res => { 
        setData(res.data)
        setForm(res.data)
      })
  }, [match.params.id])

  const masterHeader = {
    height: '50vh',
    minHeight: '500px',
    backgroundImage: `url('${data.background}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } 

  useEffect(() => {
    axios
    .get('/api/genres')
    .then(res => {
      setGenres(res.data.data)
      const genres = res.data.data
      const found = genres.find(value => data.genre === value.name)
      if(found) setGenreId(found.id)
    })
  }, [data])

  const onChangeGenre = evt => {
    setGenreId(evt.target.value)
  }

  const onChange = field => evt => {
    setForm({
      ...form,
      [field]: evt.target.value
    })
  }
  const save = () => {
    axios
      .put('/api/series/' + match.params.id, {
        ...form,
        genre_id: genreId
      })
      .then(res => {
        setSuccess(true)
      })
  }

  const selectW = value => () => {
    setForm({
      ...form,
      status: value
    })
  }

  if(success){
    return <Redirect to='/series' />
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className='h-100' style={{background: 'rgba(0,0,0,0.7)'}}>
          <div className='h-100 container'>
            <div className='row h-100 align-items-center'>
              <div className='col-8'>
                <h1 className='font-weight-light text-white'>{data.name}</h1>
                <div className='lead text-white'>
                  { data.status==='watched' &&
                    <Badge color='success'>Assistido</Badge>
                  }
                  { data.status==='towatch' &&
                    <Badge color='warning'>Para assistir</Badge>
                  }
                  Gênero: {data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className='container'>
        <button onClick={() => setMode('EDIT')} className='btn btn-primary'>Editar</button>
      </div>
      {
        mode === 'EDIT' &&
        <div className='container '>
          <h1>Editar Série</h1>
          <button onClick={() => setMode('INFO')} className='btn btn-primary'>Cancelar Edição</button>
          <form>
            <div className='form-group'>
              <label htmlFor='name'>Nome</label>
              <input type='text' value={form.name} onChange={onChange('name')} className='form-control' id='name' placeholder='Nome da série'/>
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Comentários</label>
              <input type='text' value={form.comments} onChange={onChange('comments')} className='form-control' id='comments' placeholder='Comentários'/>
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Gênero</label>
              <select className='form-control' value={genreId} onChange={onChangeGenre}> 
                { genres.map(genre => <option value={genre.id} key={genre.id}>{genre.name}</option>) }
              </select>
            </div>
            <div className='form-check'>
              <input className='form-check-input' checked={form.status==='watched'} type='radio' name='status' id='watched' value='watched' onChange={selectW('watched')} />
              <label className='form-check-label' htmlFor='watched'>
                Assistido
              </label>
            </div>
            <div className='form-check'>
              <input className='form-check-input' checked={form.status==='towatch'} type='radio' name='status' id='towatch' value='towatch' onChange={selectW('towatch')} />
              <label className='form-check-label' htmlFor='towatch'>
                Para Assistir
              </label>
            </div>
            <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
          </form>
        </div>
      }
     
    </div>
  )
}

export default SeriesInfo