import "./App.css";


import Nav from "./Nav";

import Contentpage from "./Contentpage";
import Example from "./Example";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex flex-col">
          <div className="w-[100%] position-fixed flex-wrap  ">
            <Nav />
          </div>
          <div className="flex flex-row h-[100vh]  mt-16 ">
            {/* <div className="lg:w-[150px] md:w-[120px] h-[100vh] sm:w-[120px] bg-light position-fixed ">
              <Side/>
            </div> */}
            <div className="w-[100%] h-[100vh] ">
              <Routes>
                <Route path="/" element={<Contentpage />} />
                <Route path="/:subtitle/:id" element={<Contentpage />} />

                <Route path="/:title/:subtitle/:id" element={<Contentpage />} />
                <Route path="/example" element={<Example/>}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
