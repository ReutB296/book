import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Home from './home/home';
import Search from "./search/Search";
import BookPage from './bookPage/BookPage.js';


function App() {
  return (
 <>
      <Router>
        <Switch>

          

          <Route path="/" exact>
              <Home/>
          </Route>

          <Route path="/search">
            <Search/>
          </Route>

          <Route path="/:title">
            <BookPage/>
          </Route>


        </Switch>
      </Router>
      
  </>
  );
}

export default App;
