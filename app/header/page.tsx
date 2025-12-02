import Image from "next/image";

interface HeaderProps {
  onCreateTask: () => void;
}

export default function Header({ onCreateTask }: HeaderProps) {
  return (
    <header className="w-full bg-black px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-5">
          <Image
            src="/images/rei.png"
            alt=""
            width={50}
            height={50}
            className="object-contain"
          />
          <h1 className="text-2xl font-bold text-amber-500">Tarefy</h1>
        </div>

        <button
          onClick={onCreateTask}
          className="bg-amber-500 hover:bg-amber-400 font-bold px-6 py-2 rounded-lg transition-colors text-black"
        >
          Criar tarefa
        </button>
      </div>
    </header>
  );
}
