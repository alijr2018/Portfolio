/**
 * Central portfolio content for Abdelali Rami.
 * Update this file when projects, links, or contact details change.
 */

export type SocialPlatform = 'github' | 'email'

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
  result?: string
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
  name: 'Abdelali Rami',
  initials: 'AR',
  role: 'Backend & Systems Engineering Student',
  roleSummary: 'C/C++, Linux, networking.',
  location: 'Khouribga, Morocco',
  availability: 'Open to internships and jobs',
  email: 'alirami120@hotmail.fr',
  githubUrl: 'https://github.com/alijr2018',
  headline: {
    lead: 'Backend systems.',
    emphasis: 'Built close to the machine.',
    ending: '',
  },
  intro:
    'Backend and systems engineering student at 1337 (42 Network). I build servers, tools and infrastructure in C, C++ and Linux, with a mechanical-engineering background.',
  bio:
    'I am progressing through the 1337 Common Core while building systems projects in C and C++. My industrial background gives me a practical approach to software: understand the constraints, keep the design clear, and test the details.',
  learning: ['React', 'Next.js'],
  terminal: [
    { command: 'whoami', output: 'Abdelali Rami' },
    {
      command: 'cat status',
      output:
        'school    1337 (42 Network), Khouribga\ncore      Common Core, 87% complete\nprojects  27 validated (projects, modules, exams)\nfocus     backend · C/C++ · Unix · networking\nspecialty Full Stack · Back-End',
    },
  ],
  heroStats: [
    { value: '87%', label: 'of the 1337 Common Core completed' },
    { value: 'C / C++', label: 'systems and backend study focus' },
    { value: '3', label: 'file descriptor leaks fixed in ft_irc' },
  ],
  social: [
    {
      label: 'GitHub',
      platform: 'github' as SocialPlatform,
      href: 'https://github.com/alijr2018',
      note: 'Visit Abdelali’s GitHub profile',
    },
    {
      label: 'Copy email',
      platform: 'email' as SocialPlatform,
      href: 'mailto:alirami120@hotmail.fr',
      note: 'Copy Abdelali’s email address',
    },
  ],
  highlights: [
    { label: '1337', value: 'Common Core', detail: '87% complete · since Oct 2024' },
    { label: 'Focus', value: 'Backend & systems', detail: 'C/C++, Linux & networking' },
    { label: 'Background', value: 'Mechanical design', detail: 'Industrial design & manufacturing' },
  ],
} as const

export const skillGroups: SkillGroup[] = [
  {
    eyebrow: '01 — Languages',
    title: 'Languages',
    description: 'The languages used across systems, backend, and problem-solving work.',
    skills: ['C', 'C++98', 'Python', 'JavaScript', 'SQL'],
    accent: 'lime',
  },
  {
    eyebrow: '02 — Systems',
    title: 'Systems',
    description: 'Practical operating-system and network foundations from the 1337 curriculum.',
    skills: ['Unix system calls', 'Sockets', 'Processes & threads', 'Linux administration'],
    accent: 'violet',
  },
  {
    eyebrow: '03 — Tools',
    title: 'Tools',
    description: 'Tools used to build, containerize, version, and serve software.',
    skills: ['Docker', 'Git', 'NGINX'],
    accent: 'blue',
  },
]

export const projects: Project[] = [
  {
    id: 'ft-irc',
    number: '01',
    title: 'ft_irc',
    status: 'Passed with bonus',
    description: 'An IRC server in C++98 that works with standard IRC clients using TCP sockets.',
    result: 'Found and fixed 3 file descriptor leaks.',
    technologies: ['C++98', 'Sockets', 'Unix'],
    accent: 'lime',
    sourceUrl: 'https://github.com/alijr2018/IRC',
  },
  {
    id: 'cub3d',
    number: '02',
    title: 'cub3d',
    status: 'Passed with bonus',
    description: 'A 3D maze renderer built with C, MiniLibX, and ray-casting techniques.',
    result: 'Built a navigable first-person view from a 2D map.',
    technologies: ['C', 'MiniLibX', 'Ray casting'],
    accent: 'blue',
  },
  {
    id: 'inception',
    number: '03',
    title: 'Inception',
    status: 'Passed',
    description: 'A containerized web infrastructure with Docker Compose, NGINX, WordPress, and MariaDB.',
    result: 'Configured isolated services, volumes, and TLS.',
    technologies: ['Docker', 'NGINX', 'MariaDB'],
    accent: 'violet',
    sourceUrl: 'https://github.com/alijr2018/inception',
  },
  {
    id: 'minishell',
    number: '04',
    title: 'minishell',
    status: 'Passed',
    description: 'A simple Unix shell built in C as part of the 1337 curriculum.',
    result: 'Implemented process-oriented shell fundamentals.',
    technologies: ['C', 'Unix', 'Processes'],
    accent: 'lime',
    sourceUrl: 'https://github.com/alijr2018/minishell',
  },
  {
    id: 'philosophers',
    number: '05',
    title: 'Philosophers',
    status: 'Passed',
    description: 'A concurrent-programming project about resource sharing, threads, and timing.',
    result: 'Practiced synchronization and race-condition awareness.',
    technologies: ['C', 'Threads', 'Concurrency'],
    accent: 'blue',
  },
  {
    id: 'ft-transcendence',
    number: '06',
    title: 'ft_transcendence',
    status: 'In progress',
    description: 'A collaborative full-stack project where I am learning Next.js and working on the real-time chat module.',
    technologies: ['Next.js · learning', 'FastAPI', 'Socket.IO'],
    accent: 'violet',
  },
]

export const timeline: TimelineItem[] = [
  {
    period: 'Oct 2024 — Present',
    title: '1337 Coding School',
    organization: 'Common Core · 87% complete',
    description: 'Developing C, C++, Unix, networking, algorithms, and systems foundations.',
    current: true,
  },
  {
    period: '2024',
    title: 'Final-degree project internship',
    organization: 'OCP Group',
    description: 'Worked on the design of a compacting machine.',
  },
  {
    period: '2022',
    title: 'Industrial internship',
    organization: 'OCP Group · one month',
    description: 'Created machine parts and industrial drawings with AutoCAD and SolidWorks.',
  },
  {
    period: '2017 — 2018',
    title: 'Industrial placements',
    organization: 'OCP Group',
    description: 'Learned machine operation, CNC programming, and machine-part design.',
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
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
]
