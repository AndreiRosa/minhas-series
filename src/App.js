import React from 'react';
import Header from './Header'
import Genres from './Genres'
import NewGenre from './NewGenre'
import EditGenre from './EditGenre'
import Series from './Series'
import NewSeries from './NewSeries'
import SeriesInfo from './SeriesInfo'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

const Home = () => {
  return(
    <h1>Home</h1>
  )
}



function App() {
  return (
    <Router>
      <div>
        <Header />
          <Switch>
            <Route path ='/' exact component={Home} />
            <Route path ='/generos' exact component={Genres} />
            <Route path ='/generos/novo' exact component={NewGenre} />
            <Route path ='/generos/:id' exact component={EditGenre} />
            <Route path ='/series' exact component={Series} />
            <Route path ='/series/novo' exact component={NewSeries} />
            <Route path ='/series/:id' exact component={SeriesInfo} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
