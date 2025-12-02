export const INTERVIEW_TYPES = {
  system_design: {
    title: 'System Design',
    description: 'Design scalable systems',
    icon: '📊',
    topics: [
      'Design Twitter',
      'Design Instagram',
      'Design Netflix',
      'Design Uber',
      'Design URL Shortener',
      'Design Rate Limiter',
      'Design Web Crawler',
      'Design Chat Application',
      'Design Notification System',
      'Design File Storage System',
    ],
  },
  behavioral: {
    title: 'Behavioral',
    description: 'Practice behavioral questions',
    icon: '💬',
    topics: [
      'Tell me about a time when you faced a conflict',
      'Describe a challenging project',
      'Tell me about a failure',
      'Describe your leadership style',
      'Tell me about a time you disagreed with a decision',
      'Describe a time you had to learn something quickly',
      'Tell me about a time you improved a process',
      'Describe handling a difficult team member',
    ],
  },
  coding: {
    title: 'Coding',
    description: 'Solve algorithms with explanations',
    icon: '💻',
    topics: [
      'Arrays and Strings',
      'Linked Lists',
      'Trees and Graphs',
      'Dynamic Programming',
      'Sorting and Searching',
      'Hash Tables',
      'Recursion and Backtracking',
      'System Design Coding',
    ],
  },
} as const

export type InterviewType = keyof typeof INTERVIEW_TYPES