import { useReducer } from "react";
import "./App.css";
import { Header } from "./components/header/header";
import { Home } from "./components/home/home";
import { Quiz } from "./components/quiz/quiz";
import { quizcontext } from "./state/quiz/quiz-context";
import { quizReducer } from "./state/quiz/quiz-reducer";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Statistics } from "./components/statistics/stats";

function App() {
  const [quizState, quizDispatch] = useReducer(quizReducer, {
    quizDetails: [],
  });
  return (
    <HashRouter>
      <Header />

      <quizcontext.Provider value={{ quizState, quizDispatch }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </quizcontext.Provider>
    </HashRouter>
  );
}

export default App;
