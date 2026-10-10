/**
 * Central portfolio content for Rami Abdelali.
 * Update this file when projects, links, or contact details change.
 */

export type SocialPlatform = 'github' | 'linkedin' | 'email'

export type SkillGroup = {
  title: string
  eyebrow: string
  description: string
  skills: string[]
  accent: 'lime' | 'violet' | 'blue'
}

export type Project = {
  id: string
  title: string
  number: string
  status: string
  description: string
  technologies: string[]
  accent: 'lime' | 'violet' | 'blue'
  sourceUrl?: string
}

export type TimelineItem = {
  period: string
  title: string
  organization: string
  description: string
  current?: boolean
}

export const profile = {
  name: 'Rami Abdelali',
  initials: 'RA',
  role: 'Full-stack developer in training',
  location: 'Khouribga, Morocco',
  availability: 'Open to new opportunities',
  email: 'alirami120@hotmail.fr',
  headline: {
    lead: 'Calm systems.',
    emphasis: 'Clear code.',
    ending: 'Built with care.',
  },
  intro:
    'Full-stack developer in training with a mechanical-design background. I build focused, practical software with a calm, engineering-first approach.',
  bio:
    'I am currently studying at 1337 Coding School and working on ft_transcendence. My background also includes industrial placements at OCP and mechanical design with AutoCAD, SolidWorks, and CATIA.',
  social: [
    {
      label: 'GitHub',
      platform: 'github' as SocialPlatform,
      href: 'https://github.com/alijr2018',
      note: 'Visit Rami’s GitHub profile',
    },
    {
      label: 'Email',
      platform: 'email' as SocialPlatform,
      href: 'mailto:alirami120@hotmail.fr',
      note: 'Email Rami directly',
    },
  ],
  highlights: [
    { label: 'Now', value: 'ft_transcendence', detail: 'Full-stack project' },
    { label: 'Focus', value: 'Web & systems', detail: 'C, Python, JavaScript' },
    { label: 'Background', value: 'Mechanical design', detail: 'CAD & manufacturing' },
  ],
} as const

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: '01 — Software',
    title: 'Code',
    description: 'Core languages and foundations used across 1337 and ALX work.',
    skills: ['C', 'C++', 'Python', 'JavaScript', 'SQL'],
    accent: 'lime',
  },
  {
    eyebrow: '02 — Web',
    title: 'Build',
    description: 'Tools used for modern interfaces, APIs, and containerized services.',
    skills: ['React', 'Next.js', 'FastAPI', 'Socket.IO', 'Docker'],
    accent: 'violet',
  },
  {
    eyebrow: '03 — Design',
    title: 'Engineer',
    description: 'Mechanical design tools and manufacturing awareness from OCP placements.',
    skills: ['AutoCAD', 'SolidWorks', 'CATIA', 'CNC', 'Machine parts'],
    accent: 'blue',
  },
]

export const projects: Project[] = [
  {
    id: 'ft-transcendence',
    number: '01',
    title: 'ft_transcendence',
    status: 'In progress',
    description: 'A collaborative full-stack project. My focus is the real-time chat module.',
    technologies: ['Next.js', 'FastAPI', 'Socket.IO'],
    accent: 'lime',
  },
  {
    id: 'inception',
    number: '02',
    title: 'Inception',
    status: 'Validated',
    description: 'Containerized web infrastructure with Docker Compose, NGINX, WordPress, and MariaDB.',
    technologies: ['Docker', 'NGINX', 'MariaDB'],
    accent: 'blue',
    sourceUrl: 'https://github.com/alijr2018/inception',
  },
  {
    id: 'minishell',
    number: '03',
    title: 'minishell',
    status: 'Validated',
    description: 'A simple Unix shell project built in C as part of the 1337 curriculum.',
    technologies: ['C', 'Unix', 'Processes'],
    accent: 'violet',
    sourceUrl: 'https://github.com/alijr2018/minishell',
  },
]

export const timeline: TimelineItem[] = [
  {
    period: '2024 — Present',
    title: '1337 Coding School',
    organization: '42 Common Core · Khouribga',
    description: 'Building strong C, C++, Unix, networking, and full-stack foundations.',
    current: true,
  },
  {
    period: '2024',
    title: 'Final-degree project internship',
    organization: 'OCP Group',
    description: 'Worked on the design of a compacting machine.',
  },
  {
    period: '2023 — 2024',
    title: 'Full Stack Software Engineering — Back-End',
    organization: 'ALX, powered by Holberton',
    description: 'Completed a software-engineering program with a Back-End specialization.',
  },
  {
    period: '2023 — 2024',
    title: 'Licence fondamentale — Physical Science',
    organization: 'Faculté Polydisciplinaire de Khouribga',
    description: 'Completed studies in physical science.',
  },
]

export const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]
