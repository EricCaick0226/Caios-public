import { useState } from 'react'
import heroImage from './assets/hero.png'
import { exploreCards, modeQuestions, quizQuestions } from './data'

function App() {
  const [selectedCard, setSelectedCard] = useState(exploreCards[0])
  const [selectedMode, setSelectedMode] = useState(modeQuestions[0])
  const [selectedQuestion, setSelectedQuestion] = useState(modeQuestions[0].questions[0])
  const [visitorName, setVisitorName] = useState('')
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]

  function chooseMode(mode) {
    setSelectedMode(mode)
    setSelectedQuestion(mode.questions[0])
  }

  function getQuizResult(finalScore) {
    if (finalScore <= 3) {
      return {
        title: 'CaiOS Visitor',
        description: 'You just entered the system. There is still a lot to discover.',
      }
    }

    if (finalScore <= 6) {
      return {
        title: 'CaiOS Observer',
        description: 'You know a few things about Chengkai, but the system has more layers.',
      }
    }

    if (finalScore <= 8) {
      return {
        title: 'CaiOS Friend',
        description:
          'You know Chengkai pretty well. You understand both the daily-life side and the personal side.',
      }
    }

    return {
      title: 'CaiOS Core Member',
      description:
        'You are basically inside the system. You know the football, food, city, rest, and humor settings.',
    }
  }

  function startQuiz() {
    if (visitorName.trim() === '') {
      return
    }

    setQuizStarted(true)
    setCurrentQuestionIndex(0)
    setSelectedAnswer('')
    setScore(0)
    setShowResult(false)
  }

  function goToNextQuestion() {
    const answerIsCorrect = selectedAnswer === currentQuestion.correctAnswer
    const newScore = answerIsCorrect ? score + 1 : score
    const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1

    setScore(newScore)

    if (isLastQuestion) {
      setShowResult(true)
      return
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedAnswer('')
  }

  function restartQuiz() {
    setQuizStarted(false)
    setCurrentQuestionIndex(0)
    setSelectedAnswer('')
    setScore(0)
    setShowResult(false)
  }

  const quizResult = getQuizResult(score)

  const quizProgress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbfaf7] text-slate-900">
      <div className="pointer-events-none absolute left-[-10rem] top-20 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[28rem] h-96 w-96 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-40 left-1/4 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

      <section className="section-rise relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between border-b border-slate-200/80 pb-5">
          <p className="text-lg font-semibold tracking-tight">CaiOS Public</p>
          <p className="text-sm text-slate-500">Interactive personal space</p>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-amber-200 bg-white/75 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur">
              Welcome to CaiOS
            </p>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl">
              CaiOS Public
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-700">
              Hi, I&apos;m Chengkai. Welcome to CaiOS — my interactive personal space.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="float-tag rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm">
                NYU
              </span>
              <span className="float-tag rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
                Food Mode
              </span>
              <span className="float-tag rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-800 shadow-sm">
                CaiOS Quiz
              </span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="soft-card relative flex aspect-square w-72 max-w-full items-center justify-center bg-white/80 p-8 backdrop-blur sm:w-80">
              <span className="absolute -left-4 top-8 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 shadow-sm">
                diary layer
              </span>
              <span className="absolute -right-5 bottom-10 rounded-2xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-800 shadow-sm">
                public beta
              </span>
              <img
                src={heroImage}
                alt="Layered CaiOS symbol"
                className="w-56 max-w-full drop-shadow-sm sm:w-64"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-rise relative z-10 px-6 py-10 sm:px-8 lg:px-10">
        <div className="soft-card mx-auto max-w-6xl p-6 sm:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                Explore Me
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Different sides of Chengkai
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Click a card to learn a little more about that side of me.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {exploreCards.map((card) => {
                const isSelected = selectedCard.id === card.id

                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => setSelectedCard(card)}
                    className={`lift-card min-h-32 rounded-3xl border p-5 text-left transition duration-300 ${
                      isSelected
                        ? 'border-amber-300 bg-amber-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-amber-200'
                    }`}
                  >
                    <span className="text-lg font-semibold text-slate-950">{card.title}</span>
                    <span className="mt-3 block text-sm leading-6 text-slate-500">
                      {card.subtitle}
                    </span>
                  </button>
                )
              })}
            </div>

            <article className="answer-fade soft-card bg-amber-50/80 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                Selected
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">{selectedCard.title}</h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {selectedCard.description}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-rise relative z-10 px-6 py-10 sm:px-8 lg:px-10">
        <div className="soft-card mx-auto max-w-6xl p-6 sm:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">
                Ask Me by Mode
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Questions for each side
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Each mode has its own questions. Click one and let CaiOS answer.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3 rounded-full border border-slate-200 bg-white/70 p-2 shadow-sm">
            {modeQuestions.map((mode) => {
              const isSelected = selectedMode.modeId === mode.modeId

              return (
                <button
                  key={mode.modeId}
                  type="button"
                  onClick={() => chooseMode(mode)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-300 ${
                    isSelected
                      ? 'border-sky-300 bg-sky-100 text-sky-800 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-800'
                  }`}
                >
                  {mode.modeTitle}
                </button>
              )
            })}
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-3">
              {selectedMode.questions.map((item) => {
                const isSelected = selectedQuestion.id === item.id

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedQuestion(item)}
                    className={`lift-card rounded-3xl border p-5 text-left transition duration-300 ${
                      isSelected
                        ? 'border-sky-300 bg-sky-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-sky-200'
                    }`}
                  >
                    <span className="text-base font-semibold text-slate-950">
                      {item.question}
                    </span>
                  </button>
                )
              })}
            </div>

            <article key={selectedQuestion.id} className="answer-fade soft-card bg-white p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">
                CaiOS answers · {selectedMode.modeTitle}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                {selectedQuestion.question}
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {selectedQuestion.answer}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-rise relative z-10 px-6 py-10 sm:px-8 lg:px-10">
        <div className="soft-card mx-auto max-w-6xl p-6 sm:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                How well do you know Chengkai?
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Daily-life quiz mode
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Enter your nickname, take a casual quiz, and see which CaiOS level you unlock.
            </p>
          </div>

          {!quizStarted && !showResult && (
            <div className="soft-card bg-rose-50/70 p-6">
              <label htmlFor="visitor-name" className="text-sm font-semibold text-slate-800">
                Nickname
              </label>
              <input
                id="visitor-name"
                type="text"
                required
                value={visitorName}
                onChange={(event) => setVisitorName(event.target.value)}
                placeholder="What should CaiOS call you?"
                className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-rose-300 focus:shadow-sm"
              />
              <p className="mt-3 text-sm leading-6 text-slate-500">
                For now, your nickname only stays in this browser session. A real message wall is
                coming later.
              </p>
              <button
                type="button"
                onClick={startQuiz}
                disabled={visitorName.trim() === ''}
                className="primary-button mt-6 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
              >
                Start Quiz
              </button>
            </div>
          )}

          {quizStarted && !showResult && (
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
              <aside className="soft-card bg-rose-50/70 p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                  Player
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">{visitorName.trim()}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white shadow-inner">
                  <div
                    className="h-full rounded-full bg-rose-300 transition-all duration-500"
                    style={{ width: `${quizProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">Current score: {score}</p>
              </aside>

              <article
                key={currentQuestion.id}
                className="answer-fade soft-card bg-white p-6"
              >
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                  Question {currentQuestionIndex + 1} / {quizQuestions.length}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">
                  {currentQuestion.question}
                </h3>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option
                    const optionLetter = String.fromCharCode(65 + index)

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedAnswer(option)}
                        className={`rounded-lg border p-4 text-left transition duration-300 ${
                          isSelected
                            ? 'border-rose-300 bg-rose-100 text-slate-950 shadow-sm'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-rose-200 hover:bg-rose-50/70'
                        }`}
                      >
                        <span className="text-sm font-semibold text-rose-600">
                          {optionLetter}.
                        </span>{' '}
                        <span className="font-semibold">{option}</span>
                      </button>
                    )
                  })}
                </div>

                <button
                  type="button"
                  onClick={goToNextQuestion}
                  disabled={selectedAnswer === ''}
                  className="primary-button mt-6 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
                >
                  {currentQuestionIndex === quizQuestions.length - 1 ? 'See Result' : 'Next'}
                </button>
              </article>
            </div>
          )}

          {showResult && (
            <article className="answer-fade soft-card bg-rose-50/70 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                Quiz Result
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight">
                Nice to meet you, {visitorName.trim()}.
              </h3>
              <p className="mt-4 text-lg text-slate-700">
                Final score: {score} / {quizQuestions.length}
              </p>
              <p className="mt-5 inline-flex rounded-2xl border border-rose-200 bg-white px-5 py-3 text-2xl font-bold text-rose-700 shadow-sm">
                {quizResult.title}
              </p>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-700">
                {quizResult.description}
              </p>
              <button type="button" onClick={restartQuiz} className="primary-button mt-6">
                Restart Quiz
              </button>
            </article>
          )}
        </div>
      </section>

      <section className="section-rise relative z-10 px-6 py-10 pb-16 sm:px-8 lg:px-10">
        <div className="soft-card mx-auto max-w-6xl bg-emerald-50/70 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Leave Chengkai a Message
          </p>
          <h2 className="mt-2 max-w-4xl text-3xl font-bold tracking-tight text-slate-950">
            A tiny message box for questions, recommendations, encouragement, or random thoughts.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
            You can leave a nickname and a short message. It can be anything: a question, a food
            recommendation, a show recommendation, a random thought, or just something nice.
          </p>
          <a
            href="https://tally.so/r/ODjV6k"
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex rounded-full border border-emerald-300 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-md"
          >
            Send to Chengkai
          </a>
          <p className="mt-4 text-sm leading-6 text-slate-500">
            This form is powered by Tally. It only asks for a nickname and a message.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
