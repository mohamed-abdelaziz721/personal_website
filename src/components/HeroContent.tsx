import { motion } from 'framer-motion';

const stats = [
  { value: '3',  label: 'Production systems' },
  { value: '16', label: 'Modules built' },
  { value: '3',  label: 'Clinical clients' },
];

const domains = [
  { label: 'CT Segmentation',     color: 'text-cyan-400   bg-cyan-400/10   border-cyan-400/20'   },
  { label: '3D Surgical Planning', color: 'text-teal-400   bg-teal-400/10   border-teal-400/20'   },
  { label: 'Radiology AI',         color: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  { label: 'DICOM Pipelines',      color: 'text-blue-400   bg-blue-400/10   border-blue-400/20'   },
  { label: 'Fluoroscopy Analysis', color: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  { label: 'VTK / 3D Slicer',     color: 'text-green-400  bg-green-400/10  border-green-400/20'  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroContent() {
  return (
    <div className="py-16 lg:py-20">
      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                   bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Open to opportunities
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease }}
        className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-1"
      >
        Mohamed
      </motion.h1>
      <motion.h1
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.14, ease }}
        className="text-5xl md:text-6xl font-bold tracking-tight mb-5
                   text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400"
      >
        Abdelaziz
      </motion.h1>

      {/* Role */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.22, ease }}
        className="text-lg text-gray-400 font-medium mb-4"
      >
        Medical Software Engineer
        <span className="text-gray-700 mx-2">·</span>
        Clinical AI
        <span className="text-gray-700 mx-2">·</span>
        3D Visualization
      </motion.p>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.30, ease }}
        className="text-gray-500 text-base leading-relaxed max-w-lg mb-8"
      >
        Building clinical AI pipelines and 3D visualization systems — from CT segmentation
        to surgical planning, DICOM inference, and fluoroscopy analysis.
      </motion.p>

      {/* Domain tags */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.38, ease }}
        className="flex flex-wrap gap-2 mb-10"
      >
        {domains.map((d, i) => (
          <motion.span
            key={d.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.42 + i * 0.06 }}
            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${d.color}`}
          >
            {d.label}
          </motion.span>
        ))}
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.46, ease }}
        className="flex gap-3 flex-wrap mb-14"
      >
        <a
          href="/personal_website/projects"
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400
                     text-[#05050A] font-semibold text-sm transition-all duration-200 cursor-pointer
                     shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(34,211,238,0.40)]"
        >
          View Projects
        </a>
        <a
          href="/personal_website/blog"
          className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20
                     hover:bg-white/[0.04] text-gray-300 font-medium text-sm
                     transition-all duration-200 cursor-pointer"
        >
          Blog
        </a>
        <a
          href="https://github.com/mohamed-abdelaziz721"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20
                     hover:bg-white/[0.04] text-gray-300 font-medium text-sm
                     transition-all duration-200 cursor-pointer"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/mohamed-abdelaziz721"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-xl border border-white/10 hover:border-white/20
                     hover:bg-white/[0.04] text-gray-300 font-medium text-sm
                     transition-all duration-200 cursor-pointer"
        >
          LinkedIn
        </a>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.62, ease }}
        className="flex gap-8 pt-6 border-t border-white/[0.07]"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.68 + i * 0.08, ease }}
          >
            <p className="text-2xl font-bold text-cyan-400 tabular-nums">{s.value}</p>
            <p className="text-xs text-gray-600 mt-0.5 leading-tight">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
