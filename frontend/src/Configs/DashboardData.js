export const dashboardData = {
  user: {
    username: "alex",
    email: "alex@example.com",
  },

  // maps to GET /api/dashboard
  stats: {
    totalMinutes: 900,
    currentStreak: 7,
    bestStreak: 12,
    topSubject: "Python",
    topSubjectMin: 400,
    totalNotes: 14,
    totalSessions: 22,
    points: 600
  },

  // maps to GET /api/notes, most recent first
  recentNotes: [
    {
      id: 1,
      title: "Python OOP",
      category: "Programming",
      content: 'Classes bundle data and behavior together. self refers to the instance itself, not the class. Inheritance lets a child class reuse parent methods without rewriting them.',
      created_at: "2026-07-29T10:00:00Z"
    },
    {
      id: 2,
      title: "Linear Equations",
      category: "Math",
      content: 'A linear equation graphs as a straight line. Slope-intercept form is y = mx + b, where m is the slope and b is where it crosses the y-axis.',
      created_at: "2026-07-28T14:30:00Z"
    },
    {
      id: 3,
      title: "Cell Structure Recap",
      category: "Biology",
      content: 'Mitochondria is the powerhouse of the cell — no wait, actually go deeper than that, it handles ATP synthesis through oxidative phosphorylation.',
      created_at: "2026-07-27T09:15:00Z"
    },
    {
      id: 4,
      title: "Cell Structure Recap",
      category: "Biology",
      content: 'Mitochondria is the powerhouse of the cell — no wait, actually go deeper than that, it handles ATP synthesis through oxidative phosphorylation.',
      created_at: "2026-07-27T09:15:00Z"
    }
  ],

  // maps to GET /api/leaderboard
  leaderboard: [
    { rank: 1, username: "esmo", totalMinutes: 7200, icon: '/assets/ranking-icons/first.svg' },
    { rank: 2, username: "sarah", totalMinutes: 5880, icon: '/assets/ranking-icons/second.svg' },
    { rank: 3, username: "alex", totalMinutes: 4500, self: true, icon: '/assets/ranking-icons/third.svg' },
  ],
};
