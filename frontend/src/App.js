import "./App.css";
import Header from "./components/Header/Header";
import Header2 from "./components/Header/Header2";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./MyNotes/MyNotes";
// function App() {
//   return <div className="App">Hello World</div>;
// }
const App = () => (
  <BrowserRouter>
    <Header />
    <main style={{ minHeight: "93vh" }}>
      <Routes>
        <Route path="/" Component={LandingPage} exact />
        <Route path="/mynotes" Component={() => <MyNotes />} />
      </Routes>
    </main>
    {/* <LandingPage /> */}
    {/* </LandingPage> */}
    <Footer />
  </BrowserRouter>
);

export default App;
