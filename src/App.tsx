import {Fragment} from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
// Switch => Routes변경
import BoardList from "./components/board/BoardList";
import BoardInsert from "./components/board/BoardInsert";
import BoardDetail from "./components/board/BoardDetail";
import BoardDelete from "./components/board/BoardDelete";
import BoardUpdate from "./components/board/BoardUpdate";
function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/board/list" element={<BoardList/>} />
          <Route path={"/board/insert"} element={<BoardInsert/>}/>
          <Route path={"/board/detail/:no"} element={<BoardDetail/>}/>
          <Route path={"/board/delete/:no"} element={<BoardDelete/>}/>
          <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
