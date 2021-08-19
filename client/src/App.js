import './App.css';
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import VideogameCreation from './components/VideogameCreation/VideogameCreation';
import Detail from './components/Detail/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route path='/creation' component={VideogameCreation}/>
          <Route path='/home/:id' component={Detail}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
