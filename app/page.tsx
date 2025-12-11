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
  
  // Phase 3: New state for API integration
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Phase 3: Handle form submission and API call
  const handleGeneratePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Clear previous state
    setIsLoading(true);
    setErrorMessage(null);
    
    // Clean up previous image URL to avoid memory leaks
    if (generatedImageUrl) {
      URL.revokeObjectURL(generatedImageUrl);
      setGeneratedImageUrl(null);
    }

    try {
      const response = await fetch("/api/generate-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          homeTeamName,
          homeLogoUrl,
          awayTeamName,
          awayLogoUrl,
          finalScore,
          competition,
          matchDate,
        }),
      });

      if (response.ok && response.headers.get("Content-Type")?.includes("image/png")) {
        // Success: convert response to blob and create object URL
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setGeneratedImageUrl(objectUrl);
      } else {
        // Error: try to parse error message
        try {
          const errorData = await response.json();
          setErrorMessage(errorData.error || "Failed to generate image");
        } catch {
          setErrorMessage(`Server error: ${response.status} ${response.statusText}`);
        }
      }
    } catch (err) {
      setErrorMessage(`Network error: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-12 px-4 text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 rounded-2xl bg-white/90 p-6 shadow-xl backdrop-blur md:p-10">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">
            Phase 3 — MatchPost
          </p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Match result → Instagram post
          </h1>
          <p className="text-base text-slate-600">
            Enter match details and preview your 1080×1080 post layout.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <form onSubmit={handleGeneratePost} className="space-y-4 rounded-xl bg-slate-50 p-5 shadow-inner lg:col-span-2">
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

            {/* Phase 3: Generate button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Generating…
                </span>
              ) : (
                "Generate Post"
              )}
            </button>
          </form>

          {/* Phase 3: Preview area with conditional rendering */}
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-900/90 p-6 shadow-xl lg:col-span-3">
            <div className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-lg bg-gradient-to-br from-slate-800 to-slate-900">
              {generatedImageUrl ? (
                <div className="flex w-full flex-col items-center gap-4 p-4">
                  <img
                    src={generatedImageUrl}
                    alt="Generated Match Post"
                    className="max-h-[500px] max-w-full rounded-lg shadow-2xl"
                  />
                  <a
                    href={generatedImageUrl}
                    download="matchpost.png"
                    className="rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                  >
                    Download PNG
                  </a>
                </div>
              ) : (
                <div className="space-y-2 text-center text-slate-200">
                  <p className="text-sm uppercase tracking-[0.2em] text-indigo-300">
                    Preview
                  </p>
                  <p className="text-xl font-semibold">
                    Generated 1080×1080 image will appear here
                  </p>
                  <p className="text-sm text-slate-400">
                    Add team details and click "Generate Post" to create your MatchPost design.
                  </p>
                </div>
              )}
              
              {/* Phase 3: Error message display */}
              {errorMessage && (
                <div className="mt-4 rounded-lg bg-red-900/50 px-4 py-3 text-sm text-red-200">
                  <p className="font-semibold">Error:</p>
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
