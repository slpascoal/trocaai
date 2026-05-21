export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 py-16 text-zinc-50">
      <section className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
          TrocaAi
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          Bootstrap inicial do projeto
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
          A base do aplicativo foi criada com o fluxo oficial do Next.js, pronta para
          desenvolvimento em container, PostgreSQL local e evolução guiada por testes.
        </p>

        <ul className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-200">
          {['Next.js', 'TypeScript', 'Docker', 'PostgreSQL', 'TDD'].map((item) => (
            <li key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
              {item}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
