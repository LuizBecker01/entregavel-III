import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-200 px-6 py-4">
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

        <button className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-2 rounded-lg transition-colors">
          Criar tarefa
        </button>
      </div>
    </header>
  );
}
