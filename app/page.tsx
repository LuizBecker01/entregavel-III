export default function Home() {
  return (
    <div className="flex flex-col h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="flex items-center gap-6 p-5 bg-amber-500 w-full max-w-3xl rounded-lg shadow-lg justify-center">
        <h1 className="text-4xl font-bold">Welcome to Tarify!</h1>
      </div>
      <div className="bg-amber-500 flex mt-10 text-center">
        <p className="mt-6 text-center text-gray-600">
          Get started by creating a new task using the button above.
        </p>
      </div>
      <div className="absolute bottom-5 text-sm text-gray-500">
        Developed by Luiz and Gabriel
      </div>
    </div>
  );
}
