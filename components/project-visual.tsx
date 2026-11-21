import Image from "next/image";
import type { Project } from "@/data/projects";
import { ArrowUpRight, Layers3 } from "lucide-react";

export default function ProjectVisual({ project, index }: { project: Project; index: number }) {
  return <div className="project-visual relative flex aspect-[16/9] items-center justify-center overflow-hidden">
    {project.image ? <Image src={project.image} alt={project.title + " product interface"} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" /> : <>
      <div className="absolute inset-0 project-visual-grid" />
      <div className="project-orbit project-orbit-one" />
      <div className="project-orbit project-orbit-two" />
      <div className="project-window relative flex h-[62%] w-[76%] rotate-[-3deg] flex-col overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition duration-700 group-hover:rotate-0 group-hover:scale-[1.025]">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[.055] px-4 py-3">
          <i className="h-1.5 w-1.5 rounded-full bg-white/35"/><i className="h-1.5 w-1.5 rounded-full bg-white/25"/><i className="h-1.5 w-1.5 rounded-full bg-white/15"/>
          <span className="ml-auto text-[8px] uppercase tracking-[.2em] text-white/35">Selected work / 0{index+1}</span>
        </div>
        <div className="flex flex-1 items-center justify-between gap-4 px-5 md:px-8">
          <div><p className="text-[8px] uppercase tracking-[.22em] text-[#c7f36b]">{project.category} / Digital product</p><h3 className="mt-2 max-w-[230px] font-display text-xl font-semibold leading-tight text-white md:text-3xl">{project.title}</h3><p className="mt-2 max-w-[220px] text-[9px] leading-4 text-white/40 md:text-xs">{project.outcome}</p></div>
          <div className="relative hidden h-24 w-24 shrink-0 items-center justify-center rounded-full border border-[#c7f36b]/25 bg-[#c7f36b]/[.06] sm:flex"><div className="absolute inset-3 rounded-full border border-dashed border-[#9c91ff]/40"/><Layers3 className="text-[#c7f36b]" size={27}/><span className="absolute -right-1 top-2 h-2 w-2 rounded-full bg-[#9c91ff] shadow-[0_0_14px_#9c91ff]"/></div>
        </div>
        <div className="flex items-center justify-between border-t border-white/10 bg-black/10 px-4 py-2"><span className="text-[8px] uppercase tracking-[.2em] text-white/30">Product interface</span><ArrowUpRight size={12} className="text-[#c7f36b]"/></div>
      </div>
    </>}
    <span className="absolute bottom-4 left-5 z-10 text-[10px] uppercase tracking-[.18em] text-white/40">0{index+1} — Case file</span>
    <span className="absolute right-5 top-5 z-10 rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[10px] text-white/65 backdrop-blur-md">{project.category}</span>
  </div>;
}
