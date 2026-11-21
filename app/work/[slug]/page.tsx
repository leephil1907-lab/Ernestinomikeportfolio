import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <main className="min-h-screen bg-[#08090d] px-6 py-24 text-white"><div className="mx-auto max-w-4xl"><Link href="/#work" className="text-sm text-[#c7f36b]">← Back to selected work</Link><p className="mt-16 text-xs uppercase tracking-[.2em] text-[#c7f36b]">{project.category} / Project overview</p><h1 className="mt-5 font-display text-6xl font-semibold tracking-tight md:text-8xl">{project.title}</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-white/55">{project.description}</p><div className="mt-12 rounded-3xl border border-white/10 bg-[#11131a] p-8"><p className="text-xs uppercase tracking-[.18em] text-white/35">Project focus</p><p className="mt-4 text-2xl font-medium">{project.outcome}</p><div className="mt-8 flex flex-wrap gap-2">{project.stack.map(item=><span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/55">{item}</span>)}</div></div><div className="mt-8 flex gap-5 text-sm">{project.live&&<a href={project.live} target="_blank" rel="noreferrer">Visit live project ↗</a>}{project.repo&&<a href={project.repo} target="_blank" rel="noreferrer">View source ↗</a>}</div></div></main>;
}