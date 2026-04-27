import { useState } from 'react'
import heroImage from './assets/hero.png'
import { exploreCards, modeQuestions } from './data'

function App() {
  const [selectedCard, setSelectedCard] = useState(exploreCards[0])
  const [selectedMode, setSelectedMode] = useState(modeQuestions[0])
  const [selectedQuestion, setSelectedQuestion] = useState(modeQuestions[0].questions[0])

  function chooseMode(mode) {
    setSelectedMode(mode)
    setSelectedQuestion(mode.questions[0])
  }

  return (
    <main className="min-h-screen bg-stone-50 text-slate-950">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between border-b border-slate-200 pb-5">
          <p className="text-lg font-semibold">CaiOS Public</p>
          <p className="text-sm text-slate-500">Interactive personal space</p>
        </nav>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-violet-700">
              Welcome to
            </p>
            <h1 className="text-5xl font-bold leading-tight text-slate-950 sm:text-6xl">
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

      <section className="border-t border-slate-200 bg-white px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
                Explore Me
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
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
                        ? 'border-violet-500 bg-violet-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-violet-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-lg font-semibold text-slate-950">
                      {card.title}
                    </span>
                  </button>
                )
              })}
            </div>

            <article className="rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-violet-300">
                Selected
              </p>
              <h3 className="mt-3 text-2xl font-bold">{selectedCard.title}</h3>
              <p className="mt-4 text-lg leading-8 text-slate-200">
                {selectedCard.description}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-stone-50 px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
                Ask Me by Mode
              </p>
              <h2 className="mt-2 text-3xl font-bold text-slate-950">
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
                      ? 'border-violet-600 bg-violet-600 text-white shadow-sm'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-700'
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
                        ? 'border-violet-500 bg-white shadow-sm'
                        : 'border-slate-200 bg-white/70 hover:border-violet-300 hover:bg-white'
                    }`}
                  >
                    <span className="text-base font-semibold text-slate-950">
                      {item.question}
                    </span>
                  </button>
                )
              })}
            </div>

            <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
                {selectedMode.modeTitle}
              </p>
              <h3 className="mt-3 text-2xl font-bold text-slate-950">
                {selectedQuestion.question}
              </h3>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {selectedQuestion.answer}
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
