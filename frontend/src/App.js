import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
// function App() {
//   return <div className="App">Hello World</div>;
// }
const App = () => (
  <>
    <Header />
    {/* <main style={{ minHeight: "93vh" }}></main> */}
    <LandingPage />
    {/* </LandingPage> */}
    <Footer />
  </>
);

export default App;
