import { TimerContainer } from "../components/TimerContainer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Focus Loop</h1>
        <p className="text-gray-400">A productivity timer with task, break, and pause cycles</p>
      </header>
      
      <main className="flex flex-col items-center w-full max-w-md">
        <TimerContainer initialDuration={1500} className="w-full" />
      </main>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Focus Loop - Built with Next.js and TypeScript</p>
      </footer>
    </div>
  );
}
