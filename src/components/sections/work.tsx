"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects, type Project } from "@/content/projects";

export function Work() {
  return (
    <section
      id="work"
      className="relative border-t border-line px-5 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-muted">
            02 — Index of Work
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
            {projects.length} projects
          </span>
        </div>

        <ul className="mt-8 border-t border-line">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} project={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [hover, setHover] = useState(false);
  const Wrapper = project.href ? "a" : "div";

  return (
    <li>
      <Wrapper
        href={project.href}
        target={project.href?.startsWith("http") ? "_blank" : undefined}
        rel={project.href ? "noreferrer" : undefined}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative block overflow-hidden border-b border-line"
      >
        {/* invert wipe: fills near-black on hover */}
        <motion.span
          aria-hidden
          className="absolute inset-0 origin-bottom bg-fg"
          initial={false}
          animate={{ scaleY: hover ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="relative flex items-center gap-4 py-6 sm:gap-8 sm:py-8">
          <span
            className={`font-mono text-xs transition-colors duration-300 ${
              hover ? "text-accent" : "text-muted"
            }`}
          >
            0{index + 1}
          </span>

          <motion.div
            className="flex-1"
            animate={{ x: hover ? 16 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3
                className={`font-display text-[clamp(1.75rem,5vw,3.5rem)] font-medium leading-none tracking-tight transition-colors duration-300 ${
                  hover ? "text-bg" : "text-fg"
                }`}
              >
                {project.title}
              </h3>
              <span
                className={`font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ${
                  hover ? "text-bg/60" : "text-muted"
                }`}
              >
                {project.status}
              </span>
            </div>

            <AnimatePresence>
              {hover && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-xl overflow-hidden text-sm text-bg/70"
                >
                  <span className="block pt-2">{project.blurb}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <div
            className={`hidden items-center gap-6 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 sm:flex ${
              hover ? "text-bg/60" : "text-muted"
            }`}
          >
            <span className="hidden md:inline">{project.stack.join(" · ")}</span>
            <span>{project.year}</span>
          </div>

          <span
            className={`transition-all duration-300 ${
              hover ? "translate-x-0 text-accent opacity-100" : "-translate-x-2 opacity-0"
            }`}
          >
            {project.href ? "↗" : "→"}
          </span>
        </div>
      </Wrapper>
    </li>
  );
}
