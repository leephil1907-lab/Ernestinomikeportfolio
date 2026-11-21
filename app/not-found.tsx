import Link from "next/link";
export default function NotFound() {
  return <main className="flex min-h-screen items-center justify-center bg-[#08090d] px-6 text-center text-white"><div><p className="text-xs uppercase tracking-[.25em] text-[#c7f36b]">404 / Page not found</p><h1 className="mt-5 font-display text-7xl font-semibold">Lost in the build.</h1><p className="mt-4 text-white/50">The page you are looking for does not exist.</p><Link className="mt-8 inline-block rounded-xl bg-[#c7f36b] px-6 py-3 text-sm font-bold text-black" href="/">Back to home</Link></div></main>;
}