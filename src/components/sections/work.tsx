"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { projects, type Project } from "@/content/projects";
import { SplitText } from "../reveal";

export function Work() {
  return (
    <section
      id="work"
      className="relative border-t border-line px-5 py-28 sm:px-8 sm:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between">
          <SplitText
            as="h2"
            text="Selected work"
            className="font-display text-[clamp(2rem,6vw,4.5rem)] tracking-tight"
          />
          <p className="hidden font-mono text-xs uppercase tracking-[0.3em] text-muted sm:block">
            02 — Work
          </p>
        </div>

        <ul className="mt-14 border-t border-line">
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
        className="group relative block border-b border-line py-7 sm:py-9"
      >
        {/* accent wipe */}
        <motion.span
          aria-hidden
          className="absolute inset-0 origin-left bg-accent"
          initial={false}
          animate={{ scaleX: hover ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />

        <div className="relative flex items-baseline gap-4 sm:gap-8">
          <span
            className={`font-mono text-xs transition-colors duration-300 ${
              hover ? "text-accent-fg" : "text-muted"
            }`}
          >
            0{index + 1}
          </span>

          <motion.div
            className="flex-1"
            animate={{ x: hover ? 20 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3
                className={`font-display text-[clamp(1.5rem,4.5vw,3rem)] leading-none tracking-tight transition-colors duration-300 ${
                  hover ? "text-accent-fg" : "text-fg"
                }`}
              >
                {project.title}
              </h3>
              <span
                className={`font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                  hover ? "text-accent-fg/70" : "text-muted"
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
                  className="max-w-xl overflow-hidden text-sm text-accent-fg/80"
                >
                  <span className="block pt-2">{project.blurb}</span>
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <div
            className={`hidden items-center gap-6 font-mono text-xs transition-colors duration-300 sm:flex ${
              hover ? "text-accent-fg/70" : "text-muted"
            }`}
          >
            <span className="hidden md:inline">{project.stack.join(" · ")}</span>
            <span>{project.year}</span>
            <span
              className={`transition-transform duration-300 ${
                hover ? "translate-x-1" : ""
              }`}
            >
              {project.href ? "↗" : "→"}
            </span>
          </div>
        </div>
      </Wrapper>
    </li>
  );
}
