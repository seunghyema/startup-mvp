import { CalendarDays, PlaneTakeoff } from "lucide-react";

export default function Home({
  country,
  countries,
  countryKeys,
  selectedKey,
  onSelectCountry,
  date,
  setDate,
  dday,
  onStart
}) {
  return (
    <main className="app">
      <section className="phone home-screen">
        <header className="home-hero" style={{ background: country.color }}>
          <div className="home-flag">{country.flag}</div>
          <p className="eyebrow">Travelingo</p>
          <h1>{country.name} 여행 준비</h1>
          <p>{country.subtitle}</p>
        </header>

        <section className="home-content">
          <section className="home-country-card">
            <strong>어느 나라로 떠나나요?</strong>

            <div className="home-country-grid">
              {countryKeys.map((key) => (
                <button
                  key={key}
                  className={selectedKey === key ? "home-country active" : "home-country"}
                  onClick={() => onSelectCountry(key)}
                >
                  <span>{countries[key].flag}</span>
                  {countries[key].name}
                </button>
              ))}
            </div>
          </section>

          <div className="home-dday-card">
            <div className="home-card-title">
              <CalendarDays size={24} />
              <strong>여행까지 남은 시간</strong>
            </div>

            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />

            <p className="home-dday">
              {dday === null && "여행 날짜를 선택해 주세요"}
              {dday > 0 && `D-${dday}`}
              {dday === 0 && "D-Day"}
              {dday < 0 && "이미 지난 날짜예요"}
            </p>
          </div>

          <button className="start-learning-button" onClick={onStart}>
            <PlaneTakeoff size={22} />
            학습 시작하기
          </button>
        </section>
      </section>
    </main>
  );
}