import { useState } from 'react'
import heroImage from './assets/hero.png'
import { exploreCards } from './data'

function App() {
  const [selectedCard, setSelectedCard] = useState(exploreCards[0])

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
    </main>
  )
}

export default App
