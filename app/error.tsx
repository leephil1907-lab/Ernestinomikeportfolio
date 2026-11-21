"use client";
import { useEffect } from "react";
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return <main className="flex min-h-screen items-center justify-center bg-[#08090d] px-6 text-center text-white"><div><p className="text-xs uppercase tracking-[.25em] text-[#c7f36b]">Something went wrong</p><h1 className="mt-5 font-display text-5xl font-semibold">Let's try that again.</h1><button onClick={() => reset()} className="mt-8 rounded-xl bg-[#c7f36b] px-6 py-3 text-sm font-bold text-black">Retry</button></div></main>;
}