import {Fragment} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
// Switch => Routes변경
import BoardList from "./components/board/BoardList";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/board/list" element={<BoardList/>} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
