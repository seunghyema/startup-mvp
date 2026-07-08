// src/App.jsx
import Home from "./Home.jsx";
import { useMemo, useState } from "react";
import {
  Heart,
  Flame,
  Trophy,
  MapPin,
  RotateCcw,
} from "lucide-react";
import { countries } from "./data";

const countryKeys = Object.keys(countries);

export default function App() {
  const [selectedKey, setSelectedKey] = useState("japan");
  const [date, setDate] = useState("");
  const [lessonIndex, setLessonIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [screen, setScreen] = useState("home");

  const country = countries[selectedKey];
  const lesson = country.lessons[lessonIndex];

  const dday = useMemo(() => {
    if (!date) return null;
    const today = new Date();
    const target = new Date(date);
    today.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  }, [date]);

 if (screen === "home") {
  return (
    <Home
      country={country}
      countries={countries}
      countryKeys={countryKeys}
      selectedKey={selectedKey}
      onSelectCountry={chooseCountry}
      date={date}
      setDate={setDate}
      dday={dday}
      onStart={() => setScreen("learn")}
    />
  );
}


  const isCorrect = selectedAnswer === lesson.answer;

  function chooseCountry(key) {
    setSelectedKey(key);
    setLessonIndex(0);
    setSelectedAnswer(null);
    setScore(0);
  }

  function chooseAnswer(index) {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    if (index === lesson.answer) setScore((prev) => prev + 10);
  }

  function nextLesson() {
    if (lessonIndex === country.lessons.length - 1) {
      setLessonIndex(0);
      setSelectedAnswer(null);
      return;
    }

    setLessonIndex((prev) => prev + 1);
    setSelectedAnswer(null);
  }

  function reset() {
    setLessonIndex(0);
    setSelectedAnswer(null);
    setScore(0);
  }

  return (
    <main className="app">
      <section className="phone">
        <header className="top-bar">
          <span className="flag">{country.flag}</span>
          <Status icon={<Flame size={18} />} value={score} />
          <Status icon={<Trophy size={18} />} value={lessonIndex + 1} />
          <Status icon={<Heart size={18} />} value="5" />
        </header>

        <section className="hero" style={{ background: country.color }}>
          <div>
            <p className="eyebrow">Travel Unit</p>
            <h1>{country.name} 여행 준비</h1>
            <p>{country.subtitle}</p>
          </div>
          <button
            className="icon-button"
            onClick={reset}
            aria-label="다시 시작"
          >
            <RotateCcw size={20} />
          </button>
        </section>

        

        
        <section className="path">
          {country.lessons.map((item, index) => (
            <button
              key={item.title}
              className={
                index === lessonIndex
                  ? "node current"
                  : index < lessonIndex
                    ? "node done"
                    : "node locked"
              }
              onClick={() => {
                setLessonIndex(index);
                setSelectedAnswer(null);
              }}
            >
              {index < lessonIndex ? "✓" : index + 1}
            </button>
          ))}
        </section>

        <section className="quiz-card">
          <div className="lesson-type">
            <MapPin size={18} />
            <span>{lesson.type}</span>
          </div>

          <h2>{lesson.title}</h2>
          <p className="fact">{lesson.fact}</p>

          <h3>{lesson.question}</h3>

          <div className="answers">
            {lesson.options.map((option, index) => (
              <button
                key={option}
                className={getAnswerClass(selectedAnswer, index, lesson.answer)}
                onClick={() => chooseAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>

          {selectedAnswer !== null && (
            <div className={isCorrect ? "result correct" : "result wrong"}>
              {isCorrect ? "정답이에요!" : "아쉬워요. 다시 기억해봐요."}
            </div>
          )}

          <button
            className="next-button"
            disabled={selectedAnswer === null}
            onClick={nextLesson}
          >
            다음
          </button>
        </section>

        <footer className="bottom-info">
          <strong>응급 번호</strong>
          <span>{country.emergency}</span>
        </footer>
      </section>
    </main>
  );
}

function Status({ icon, value }) {
  return (
    <div className="status">
      {icon}
      <strong>{value}</strong>
    </div>
  );
}

function getAnswerClass(selectedAnswer, index, answer) {
  if (selectedAnswer === null) return "answer";
  if (index === answer) return "answer correct-answer";
  if (index === selectedAnswer) return "answer wrong-answer";
  return "answer muted";
}
