import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route exact path="general" element={
           <News pageSize={5} country="us" category="general"/>
          }/>
          <Route path="business" element={
           <News pageSize={5} country="in" category="business"/>
          }/>
          <Route path="entertainment" element={
            <News pageSize={5} country="in" category="entertainment"/>
          }/>
          <Route path="health" element={
           <News pageSize={5} country="in" category="health"/>
          }/>
          <Route path="science" element={
            <News pageSize={5} country="in" category="science"/>
          }/>
          <Route path="sports" element={
            <News pageSize={5} country="in" category="sports"/>
          }/>
          <Route path="technology" element={
           <News pageSize={5} country="in" category="technology"/>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
