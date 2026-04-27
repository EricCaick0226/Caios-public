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

  return (
    <main className="min-h-screen bg-amber-50 text-slate-900">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between border-b border-amber-200 pb-5">
          <p className="text-lg font-semibold">CaiOS Public</p>
          <p className="text-sm text-slate-500">Interactive personal space</p>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-700">
              Welcome to
            </p>
            <h1 className="text-5xl font-bold leading-tight text-slate-900 sm:text-6xl">
              CaiOS Public
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-700">
              Hi, I&apos;m Chengkai. Welcome to CaiOS — my interactive personal space.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <img
              src={heroImage}
              alt="Layered CaiOS symbol"
              className="w-56 max-w-full sm:w-72"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-amber-200 bg-white px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                Explore Me
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
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
                    className={`min-h-32 rounded-lg border p-5 text-left transition ${
                      isSelected
                        ? 'border-amber-400 bg-amber-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-amber-300 hover:bg-amber-50/50'
                    }`}
                  >
                    <span className="text-lg font-semibold text-slate-900">
                      {card.title}
                    </span>
                  </button>
                )
              })}
            </div>

            <article className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-slate-900 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                Selected
              </p>
              <h3 className="mt-3 text-2xl font-bold">{selectedCard.title}</h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {selectedCard.description}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-sky-50/70 px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">
                Ask Me by Mode
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-900">
                Questions for each side
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Each mode has its own questions. Click one and let CaiOS answer.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3">
            {modeQuestions.map((mode) => {
              const isSelected = selectedMode.modeId === mode.modeId

              return (
                <button
                  key={mode.modeId}
                  type="button"
                  onClick={() => chooseMode(mode)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    isSelected
                      ? 'border-sky-300 bg-sky-100 text-sky-800 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:text-sky-700'
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
                    className={`rounded-lg border p-5 text-left transition ${
                      isSelected
                        ? 'border-sky-400 bg-white shadow-sm'
                        : 'border-slate-200 bg-white/80 hover:border-sky-300 hover:bg-white'
                    }`}
                  >
                    <span className="text-base font-semibold text-slate-900">
                      {item.question}
                    </span>
                  </button>
                )
              })}
            </div>

            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">
                {selectedMode.modeTitle}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-900">
                {selectedQuestion.question}
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {selectedQuestion.answer}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-rose-100 bg-rose-50/70 px-6 py-16 text-slate-900 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                How well do you know Chengkai?
              </p>
              <h2 className="mt-2 text-3xl font-bold">Daily-life quiz mode</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-600">
              Enter your nickname, take a casual quiz, and see which CaiOS level you unlock.
            </p>
          </div>

          {!quizStarted && !showResult && (
            <div className="rounded-lg border border-rose-100 bg-white p-6 shadow-sm">
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
                className="mt-3 w-full rounded-lg border border-slate-200 bg-amber-50/50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-rose-300 focus:bg-white"
              />
              <p className="mt-3 text-sm leading-6 text-slate-500">
                For now, your nickname only stays in this browser session. A real message wall is
                coming later.
              </p>
              <button
                type="button"
                onClick={startQuiz}
                disabled={visitorName.trim() === ''}
                className="mt-6 rounded-full border border-rose-300 bg-rose-100 px-5 py-3 text-sm font-semibold text-rose-800 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
              >
                Start Quiz
              </button>
            </div>
          )}

          {quizStarted && !showResult && (
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
              <aside className="rounded-lg border border-rose-100 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                  Player
                </p>
                <h3 className="mt-3 text-2xl font-bold">{visitorName.trim()}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-500">Current score: {score}</p>
              </aside>

              <article className="rounded-lg border border-rose-100 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                  Quiz Question
                </p>
                <h3 className="mt-3 text-2xl font-bold">{currentQuestion.question}</h3>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === option
                    const optionLetter = String.fromCharCode(65 + index)

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedAnswer(option)}
                        className={`rounded-lg border p-4 text-left transition ${
                          isSelected
                            ? 'border-rose-300 bg-rose-100 text-slate-900 shadow-sm'
                            : 'border-slate-200 bg-amber-50/40 text-slate-700 hover:border-rose-200 hover:bg-white'
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
                  className="mt-6 rounded-full border border-rose-300 bg-rose-100 px-5 py-3 text-sm font-semibold text-rose-800 transition hover:bg-rose-200 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  {currentQuestionIndex === quizQuestions.length - 1 ? 'See Result' : 'Next'}
                </button>
              </article>
            </div>
          )}

          {showResult && (
            <article className="rounded-lg border border-rose-100 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                Quiz Result
              </p>
              <h3 className="mt-3 text-3xl font-bold">
                Nice to meet you, {visitorName.trim()}.
              </h3>
              <p className="mt-4 text-lg text-slate-700">
                Final score: {score} / {quizQuestions.length}
              </p>
              <p className="mt-4 text-2xl font-bold text-rose-700">{quizResult.title}</p>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-700">
                {quizResult.description}
              </p>
              <button
                type="button"
                onClick={restartQuiz}
                className="mt-6 rounded-full border border-rose-300 bg-rose-100 px-5 py-3 text-sm font-semibold text-rose-800 transition hover:bg-rose-200"
              >
                Restart Quiz
              </button>
            </article>
          )}
        </div>
      </section>

      <section className="border-t border-emerald-100 bg-emerald-50/70 px-6 pb-16 text-slate-900 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-lg border border-emerald-100 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
            Leave Chengkai a message
          </p>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
            Soon, visitors will be able to leave questions, suggestions, encouragement, food
            recommendations, movie recommendations, or random thoughts here. For now, this is a
            placeholder for the future message system.
          </p>
        </div>
      </section>
    </main>
  )
}

export default App
