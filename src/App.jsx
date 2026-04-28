import { useEffect, useState } from 'react'
import heroImage from './assets/hero.png'
import { achievements, exploreCards, modeQuestions, quizQuestions } from './data'

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'explore', label: 'About' },
  { id: 'ask', label: 'Field Notes' },
  { id: 'quiz', label: 'Friend Check' },
  { id: 'unlocks', label: 'Unlocks' },
  { id: 'message', label: 'Message' },
]

function BrandName({ className = '' }) {
  return (
    <span className={className}>
      ca
      <span className="brand-i">I</span>
      os
    </span>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [selectedCard, setSelectedCard] = useState(exploreCards[0])
  const [selectedMode, setSelectedMode] = useState(modeQuestions[0])
  const [selectedQuestion, setSelectedQuestion] = useState(modeQuestions[0].questions[0])
  const [visitorName, setVisitorName] = useState('')
  const [quizStarted, setQuizStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState([])
  const [achievementToast, setAchievementToast] = useState(null)
  const [, setSelectedAskQuestionIds] = useState([])

  const currentQuestion = quizQuestions[currentQuestionIndex]

  useEffect(() => {
    if (!achievementToast) {
      return
    }

    const timer = window.setTimeout(() => {
      setAchievementToast(null)
    }, 4200)

    return () => window.clearTimeout(timer)
  }, [achievementToast])

  function unlockAchievement(id) {
    const achievement = achievements.find((item) => item.id === id)

    if (!achievement) {
      return
    }

    setUnlockedAchievementIds((currentIds) => {
      if (currentIds.includes(id)) {
        return currentIds
      }

      setAchievementToast(achievement)

      return [...currentIds, id]
    })
  }

  function chooseMode(mode) {
    setSelectedMode(mode)
    setSelectedQuestion(mode.questions[0])
  }

  function chooseQuestion(item) {
    setSelectedQuestion(item)

    const questionKey = `${selectedMode.modeId}-${item.id}`

    setSelectedAskQuestionIds((currentIds) => {
      if (currentIds.includes(questionKey)) {
        return currentIds
      }

      const nextIds = [...currentIds, questionKey]

      if (nextIds.length >= 3) {
        unlockAchievement('small-drawer-opened')
      }

      return nextIds
    })

    if (selectedMode.modeId === 'food') {
      unlockAchievement('food-battery-restored')
    }

    if (selectedMode.modeId === 'memory') {
      unlockAchievement('old-save-file-found')
    }

    if (selectedMode.modeId === 'anxiety') {
      unlockAchievement('background-app-located')
    }
  }

  function getQuizResult(finalScore) {
    if (finalScore <= 3) {
      return {
        title: 'caIos Visitor',
        description:
          'You made it through the front door. caIos is still checking your visitor badge, and the Diet Coke file remains mostly locked.',
      }
    }

    if (finalScore <= 6) {
      return {
        title: 'caIos Observer',
        description:
          'You noticed some surface lore: food matters, Barcelona matters, and the anxiety tab is probably open. Respectable progress.',
      }
    }

    if (finalScore <= 8) {
      return {
        title: 'caIos Friend',
        description:
          'You know enough to be mildly dangerous. You understand walking around NYC, Japanese food, background anxiety, and the fact that rest may still involve planning.',
      }
    }

    return {
      title: 'caIos Core Member',
      description:
        'You know too much. Please do not leak the yellow pencil lore, the Barcelona settings, or the exact emotional importance of salmon nigiri.',
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
      unlockAchievement('friend-check-cleared')

      if (getQuizResult(newScore).title === 'caIos Core Member') {
        unlockAchievement('core-access-granted')
      }

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

  function resetUnlocks() {
    setUnlockedAchievementIds([])
    setSelectedAskQuestionIds([])
    setAchievementToast(null)
  }

  const quizResult = getQuizResult(score)
  const quizProgress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100
  const unlockedCount = achievements.filter((achievement) =>
    unlockedAchievementIds.includes(achievement.id),
  ).length
  const activeNavItem = navItems.find((item) => item.id === activeSection)

  function renderPanel() {
    if (activeSection === 'home') {
      return (
        <div className="grid min-h-[calc(100vh-9rem)] items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="soft-card bg-white/85 p-6 backdrop-blur sm:p-8 lg:p-10">
            <p className="mb-5 inline-flex rounded-full border border-amber-200 bg-white/75 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur">
              Welcome to <BrandName /> · public save file
            </p>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              <BrandName /> Public
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-700">
              I&apos;m Chengkai, an NYU student studying Data Science and Mathematics. caIos is my
              public save file: part academic bio, part digital diary, part friend check, part
              “what is he eating now?”
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-500">
              The serious tabs are open. So are the food tab, the background anxiety tab, and
              probably one Barcelona tab.
            </p>
            <p className="mt-6 rounded-3xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm font-semibold text-amber-800">
              Choose a panel to open a drawer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="float-tag rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-semibold text-sky-800 shadow-sm">
                NYU Map
              </span>
              <span className="float-tag rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm">
                Food Battery
              </span>
              <span className="float-tag rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-sm font-semibold text-rose-800 shadow-sm">
                Friend Check
              </span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="soft-card relative flex aspect-square w-72 max-w-full items-center justify-center bg-white/80 p-8 backdrop-blur sm:w-80">
              <span className="absolute left-3 top-5 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 shadow-sm sm:-left-4 sm:top-8">
                Bobst tab open
              </span>
              <span className="absolute bottom-5 right-3 rounded-2xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-semibold text-sky-800 shadow-sm sm:-right-5 sm:bottom-10">
                Diet Coke ready
              </span>
              <img
                src={heroImage}
                alt="Layered caIos symbol"
                className="w-56 max-w-full drop-shadow-sm sm:w-64"
              />
            </div>
          </div>
        </div>
      )
    }

    if (activeSection === 'explore') {
      return (
        <div className="soft-card bg-white/85 p-5 backdrop-blur sm:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                About
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                A few Chengkai widgets
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              A soft bio, but with more food settings than a normal academic homepage.
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
                    className={`lift-card min-h-36 rounded-3xl border p-5 text-left transition duration-300 ${
                      isSelected
                        ? 'border-amber-300 bg-amber-50 shadow-md ring-2 ring-amber-100'
                        : 'border-slate-200 bg-white hover:border-amber-200 hover:bg-amber-50/40'
                    }`}
                  >
                    <span className="mb-4 block h-2 w-10 rounded-full bg-amber-200" />
                    <span className="text-lg font-semibold text-slate-950">{card.title}</span>
                    <span className="mt-3 block text-sm leading-6 text-slate-500">
                      {card.subtitle}
                    </span>
                  </button>
                )
              })}
            </div>

            <article key={selectedCard.id} className="answer-fade soft-card bg-amber-50/80 p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                Widget open
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight">{selectedCard.title}</h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {selectedCard.description}
              </p>
            </article>
          </div>
        </div>
      )
    }

    if (activeSection === 'ask') {
      return (
        <div className="soft-card bg-white/85 p-5 backdrop-blur sm:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">
                Field Notes
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Small observations and prompts
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Pick a mode. caIos opens a small drawer: campus notes, food notes, old save files,
              and the occasional background anxiety report.
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2 rounded-3xl border border-slate-200 bg-slate-50/70 p-2 shadow-inner sm:gap-3">
            {modeQuestions.map((mode) => {
              const isSelected = selectedMode.modeId === mode.modeId

              return (
                <button
                  key={mode.modeId}
                  type="button"
                  onClick={() => chooseMode(mode)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition duration-300 ${
                    isSelected
                      ? 'border-sky-300 bg-white text-sky-800 shadow-sm ring-2 ring-sky-100'
                      : 'border-transparent bg-transparent text-slate-600 hover:border-sky-200 hover:bg-white hover:text-sky-800'
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
                    onClick={() => chooseQuestion(item)}
                    className={`lift-card rounded-3xl border p-5 text-left transition duration-300 ${
                      isSelected
                        ? 'border-sky-300 bg-sky-50 shadow-md ring-2 ring-sky-100'
                        : 'border-slate-200 bg-white hover:border-sky-200 hover:bg-sky-50/40'
                    }`}
                  >
                    <span className="text-base font-semibold text-slate-950">
                      {item.question}
                    </span>
                  </button>
                )
              })}
            </div>

            <article key={selectedQuestion.id} className="answer-fade soft-card bg-white p-6 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-wider text-sky-700">
                caIos note · {selectedMode.modeTitle}
              </p>
              <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
                {selectedQuestion.question}
              </h3>
              <p className="mt-4 text-base leading-8 text-slate-700 sm:text-lg">
                {selectedQuestion.answer}
              </p>
            </article>
          </div>
        </div>
      )
    }

    if (activeSection === 'quiz') {
      return (
        <div className="soft-card bg-white/85 p-5 backdrop-blur sm:p-8">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                How well do you know Chengkai?
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                A tiny friend check
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              Enter a nickname, guess the daily-life lore, and see what level of access you unlock.
            </p>
          </div>

          {!quizStarted && !showResult && (
            <div className="soft-card bg-rose-50/70 p-5 sm:p-6">
              <label htmlFor="visitor-name" className="text-sm font-semibold text-slate-800">
                Nickname
              </label>
              <input
                id="visitor-name"
                type="text"
                required
                value={visitorName}
                onChange={(event) => setVisitorName(event.target.value)}
                placeholder="Your visitor name"
                className="mt-3 w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 focus:border-rose-300 focus:shadow-sm"
              />
              <p className="mt-3 text-sm leading-6 text-slate-500">
                caIos only remembers this during the current browser session. No database, no
                dramatic surveillance arc.
              </p>
              <button
                type="button"
                onClick={startQuiz}
                disabled={visitorName.trim() === ''}
                className="primary-button mt-6 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none"
              >
                Start Friend Check
              </button>
            </div>
          )}

          {quizStarted && !showResult && (
            <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
              <aside className="soft-card bg-rose-50/70 p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                  Visitor badge
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight">{visitorName.trim()}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  Friend check {currentQuestionIndex + 1} of {quizQuestions.length}
                </p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-white shadow-inner">
                  <div
                    className="h-full rounded-full bg-rose-300 transition-all duration-500"
                    style={{ width: `${quizProgress}%` }}
                  />
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-500">Lore points: {score}</p>
              </aside>

              <article key={currentQuestion.id} className="answer-fade soft-card bg-white p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                  caIos prompt {currentQuestionIndex + 1} / {quizQuestions.length}
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
                        className={`min-h-14 rounded-2xl border p-4 text-left transition duration-300 ${
                          isSelected
                            ? 'border-rose-300 bg-rose-100 text-slate-950 shadow-sm ring-2 ring-rose-100'
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
                  {currentQuestionIndex === quizQuestions.length - 1 ? 'Reveal Level' : 'Next'}
                </button>
              </article>
            </div>
          )}

          {showResult && (
            <article className="answer-fade soft-card bg-rose-50/70 p-5 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-wider text-rose-700">
                Friend Check Result
              </p>
              <h3 className="mt-3 text-3xl font-bold tracking-tight">
                Nice to meet you, {visitorName.trim()}.
              </h3>
              <p className="mt-4 text-lg text-slate-700">
                Lore points: {score} / {quizQuestions.length}
              </p>
              <p className="mt-5 inline-flex rounded-3xl border border-rose-200 bg-white px-5 py-3 text-2xl font-bold text-rose-700 shadow-sm">
                {quizResult.title}
              </p>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-700">
                {quizResult.description}
              </p>
              <button type="button" onClick={restartQuiz} className="primary-button mt-6">
                Restart Friend Check
              </button>
            </article>
          )}
        </div>
      )
    }

    if (activeSection === 'unlocks') {
      return (
        <div className="soft-card bg-white/85 p-5 backdrop-blur sm:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
                <BrandName /> Unlocks
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
                Tiny achievements for this visit
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500">
                Unlocks only live in this visit. No account, no database, no dramatic surveillance
                arc.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <p className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-800">
                {unlockedCount} / {achievements.length} unlocked
              </p>
              <button
                type="button"
                onClick={resetUnlocks}
                className="text-sm font-semibold text-slate-500 transition hover:text-slate-900"
              >
                Reset this visit&apos;s unlocks
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => {
              const isUnlocked = unlockedAchievementIds.includes(achievement.id)

              return (
                <article
                  key={achievement.id}
                  className={`rounded-3xl border p-5 transition duration-300 ${
                    isUnlocked
                      ? 'border-amber-200 bg-amber-50/80 shadow-sm'
                      : 'border-slate-200 bg-white/70 text-slate-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl" aria-hidden="true">
                      {isUnlocked ? achievement.icon : '🔒'}
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-950">
                        {isUnlocked ? achievement.title : 'Locked'}
                      </h3>
                      {isUnlocked ? (
                        <>
                          <p className="mt-2 text-sm leading-6 text-slate-700">
                            {achievement.descriptionEn}
                          </p>
                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            {achievement.descriptionZh}
                          </p>
                        </>
                      ) : (
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {achievement.lockedHint}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Unlocks only live in this visit. No account, no database.
          </p>
        </div>
      )
    }

    return (
      <div className="soft-card bg-emerald-50/70 p-5 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
          Leave Chengkai a Message
        </p>
        <h2 className="mt-2 max-w-4xl text-3xl font-bold tracking-tight text-slate-950">
          Send a note into the public save file.
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Random thoughts are welcome. Food recommendations are very welcome. Questions, small
          notes, show recommendations, or “I found a bug in caIos” comments are also accepted.
        </p>
        <a
          href="https://tally.so/r/ODjV6k"
          target="_blank"
          rel="noreferrer"
          onClick={() => unlockAchievement('left-a-trace')}
          className="mt-6 inline-flex rounded-full border border-emerald-300 bg-white px-5 py-3 text-sm font-semibold text-emerald-800 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 hover:shadow-md"
        >
          Send to Chengkai
        </a>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          Powered by Tally. It only asks for a nickname and a message, because this does not need
          to become a whole bureaucratic system.
        </p>
      </div>
    )
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fbfaf7] text-slate-900">
      <div className="pointer-events-none absolute left-[-10rem] top-20 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-[-8rem] top-[28rem] h-96 w-96 rounded-full bg-sky-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-40 left-1/4 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

      {achievementToast && (
        <aside className="achievement-toast fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm rounded-3xl border border-amber-200 bg-[#fffaf0] p-4 shadow-2xl sm:left-auto sm:right-6 sm:top-6 sm:bottom-auto sm:mx-0">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
            Achievement Unlocked
          </p>
          <div className="mt-2 flex gap-3">
            <span className="text-3xl" aria-hidden="true">
              {achievementToast.icon}
            </span>
            <div>
              <h3 className="font-bold text-slate-950">{achievementToast.title}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-700">
                {achievementToast.descriptionEn}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                {achievementToast.descriptionZh}
              </p>
            </div>
          </div>
        </aside>
      )}

      <div className="relative z-10 flex min-h-screen flex-col lg:grid lg:grid-cols-[17rem_1fr]">
        <aside className="hidden border-r border-slate-200/80 bg-white/50 p-5 backdrop-blur lg:flex lg:h-screen lg:flex-col">
          <div className="soft-card bg-white/80 p-5">
            <p className="text-2xl font-bold tracking-tight text-slate-950">
              <BrandName /> Public
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">academic bio · soft OS shell</p>
          </div>

          <nav className="mt-5 grid gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`rounded-3xl border px-4 py-3 text-left text-sm font-bold transition duration-300 ${
                    isActive
                      ? 'border-amber-200 bg-amber-50 text-amber-900 shadow-sm'
                      : 'border-transparent bg-white/60 text-slate-600 hover:border-slate-200 hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>

          <p className="mt-auto rounded-3xl border border-sky-100 bg-sky-50/70 p-4 text-xs leading-5 text-sky-800">
            A small academic homepage with drawers for notes, food, and background anxiety.
          </p>
        </aside>

        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-[#fbfaf7]/90 px-5 py-4 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xl font-bold tracking-tight">
              <BrandName /> Public
            </p>
            <p className="text-xs font-semibold text-slate-500">{activeNavItem?.label}</p>
          </div>
          <nav className="no-scrollbar mt-4 flex gap-2 overflow-x-auto pb-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(item.id)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition duration-300 ${
                    isActive
                      ? 'border-amber-200 bg-amber-50 text-amber-900 shadow-sm'
                      : 'border-slate-200 bg-white/80 text-slate-600'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        </header>

        <section className="min-h-0 flex-1 px-5 py-5 lg:h-screen lg:overflow-y-auto lg:px-8 lg:py-8">
          <div key={activeSection} className="panel-fade mx-auto max-w-6xl">
            {renderPanel()}
          </div>
        </section>
      </div>
    </main>
  )
}

export default App
