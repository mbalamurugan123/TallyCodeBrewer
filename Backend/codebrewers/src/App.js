// import React from 'react'
// import Landing from './components/Landing';
// import Footer from './components/Footer';
// import ProblemSet from './components/problemset';
// import { BrowserRouter, Route,Routes} from 'react-router-dom';

// function App() {
//   return (
//     <>
//       <BrowserRouter>
//       <Routes>
//       <Route path='/'><Landing /></Route>
//       {/* <Route path=''><Footer /></Route> */}
//       <Route path='/coding-arena'><ProblemSet/></Route>
//       </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Footer from './components/Footer';
import ProblemSet from './components/problemset';
// import ContestCreationForm from './components/ContestCF';
// import ContestDashboard from './components/ContestDashboard';
import CodingBattlefield from './components/CodingBattelfield';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* <Route path="/footer" element={<Footer />} /> */}
        <Route path="/coding-arena" element={<ProblemSet />} />
        <Route path="/coding-battlefield" element={<CodingBattlefield/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
