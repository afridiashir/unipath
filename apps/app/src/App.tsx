import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-950 text-slate-100">
      <h1 className="text-4xl font-bold tracking-tight">
        Vite + React + Tailwind
      </h1>
      <p className="text-slate-400">Edit src/App.tsx and save to reload.</p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition-colors hover:bg-indigo-500"
      >
        count is {count}
      </button>
    </main>
  );
}

export default App;
