import "./App.css";
import Header from "./components/Header/Header";
// import Header2 from "./components/Header/Header2";
import Footer from "./components/Footer/Footer";
import LandingPage from "./screens/LandingPage/LandingPage";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./MyNotes/MyNotes";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/CreateNote/SingleNote";
import UserProfile from "./screens/UserProfile/UserProfile";
// function App() {
//   return <div className="App">Hello World</div>;
// }
const App = () => (
  <BrowserRouter>
    <Header />
    <main style={{ minHeight: "93vh" }}>
      <Routes>
        <Route path="/" Component={LandingPage} exact />
        <Route path="/login" Component={LoginScreen} exact />
        <Route path="/register" Component={RegisterScreen} exact />
        <Route path="/profile" Component={UserProfile} exact />
        <Route path="/mynotes/createnote" Component={CreateNote} exact />
        <Route path="/mynotes" Component={() => <MyNotes />} exact />
        <Route path="/note/:id" Component={SingleNote} exact />
      </Routes>
    </main>
    {/* <LandingPage /> */}
    {/* </LandingPage> */}
    <Footer />
  </BrowserRouter>
);

export default App;
