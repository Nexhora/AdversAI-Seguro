import { BrainCircuit } from 'lucide-react';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <a className="flex items-center justify-center" href="#">
        <BrainCircuit className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold">AdVerseAI</span>
      </a>
    </header>
  );
}
