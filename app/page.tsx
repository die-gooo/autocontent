 "use client";

import { useState } from "react";

export default function Home() {
  const [homeTeamName, setHomeTeamName] = useState("");
  const [homeLogoUrl, setHomeLogoUrl] = useState("");
  const [awayTeamName, setAwayTeamName] = useState("");
  const [awayLogoUrl, setAwayLogoUrl] = useState("");
  const [finalScore, setFinalScore] = useState("");
  const [competition, setCompetition] = useState("");
  const [matchDate, setMatchDate] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4 text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur md:p-10">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
            Phase 1 — MatchPost
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Match result → Instagram post
          </h1>
          <p className="text-base text-slate-600">
            Enter match details and preview your 1080×1080 post layout.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <form className="space-y-4 rounded-xl bg-slate-50 p-5 shadow-inner lg:col-span-2">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="homeTeamName">
                Home Team Name
              </label>
              <input
                id="homeTeamName"
                type="text"
                value={homeTeamName}
                onChange={(e) => setHomeTeamName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="FC Awesome"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="homeLogoUrl">
                Home Logo URL
              </label>
              <input
                id="homeLogoUrl"
                type="url"
                value={homeLogoUrl}
                onChange={(e) => setHomeLogoUrl(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="https://example.com/home-logo.png"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="awayTeamName">
                Away Team Name
              </label>
              <input
                id="awayTeamName"
                type="text"
                value={awayTeamName}
                onChange={(e) => setAwayTeamName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="United City"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="awayLogoUrl">
                Away Logo URL
              </label>
              <input
                id="awayLogoUrl"
                type="url"
                value={awayLogoUrl}
                onChange={(e) => setAwayLogoUrl(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="https://example.com/away-logo.png"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="finalScore">
                Final Score
              </label>
              <input
                id="finalScore"
                type="text"
                value={finalScore}
                onChange={(e) => setFinalScore(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="4–2"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="competition">
                Competition (optional)
              </label>
              <input
                id="competition"
                type="text"
                value={competition}
                onChange={(e) => setCompetition(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="Champions League"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700" htmlFor="matchDate">
                Match Date (optional)
              </label>
              <input
                id="matchDate"
                type="text"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                placeholder="Nov 4, 2025"
              />
            </div>
          </form>

          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-900/90 p-6 shadow-xl lg:col-span-3">
            <div className="flex h-full min-h-[420px] items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 text-center">
              <div className="space-y-2 text-slate-200">
                <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
                  Preview
                </p>
                <p className="text-xl font-semibold">
                  Generated 1080×1080 image will appear here
                </p>
                <p className="text-sm text-slate-400">
                  Add team details to prepare your MatchPost design.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
