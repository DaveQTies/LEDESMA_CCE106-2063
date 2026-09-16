export type EventCategory = 'Academic' | 'Arts' | 'Sports';

export type CampusEvent = { id: string; title: string; category: EventCategory; dateTime: string; venue: string; description: string; available: number; joined: boolean };

export const events: CampusEvent[] = [
  { id: 'research-forum', title: 'Student Research Forum', category: 'Academic', dateTime: 'October 14 · 9:00 AM', venue: 'Innovation Hall', description: 'Hear concise presentations from student researchers and meet faculty mentors.', available: 42, joined: false },
  { id: 'design-jam', title: 'Campus Design Jam', category: 'Arts', dateTime: 'October 16 · 1:00 PM', venue: 'Creative Lab', description: 'Bring an idea and collaborate on posters, interfaces, and visual stories.', available: 18, joined: true },
  { id: 'intramural-finals', title: 'Intramural Finals', category: 'Sports', dateTime: 'October 18 · 4:30 PM', venue: 'University Gym', description: 'Cheer on the finalists in the campus basketball championship.', available: 120, joined: false },
  { id: 'career-connect', title: 'Career Connect Mixer', category: 'Academic', dateTime: 'October 21 · 3:00 PM', venue: 'Alumni Center', description: 'Practice your introduction and connect with visiting alumni and employers.', available: 65, joined: false },
  { id: 'open-mic', title: 'Open Mic Under the Stars', category: 'Arts', dateTime: 'October 23 · 6:30 PM', venue: 'East Lawn', description: 'Share music, spoken word, or a short performance with the campus community.', available: 30, joined: true },
  { id: 'fun-run', title: 'Sunrise Fun Run', category: 'Sports', dateTime: 'October 25 · 6:00 AM', venue: 'North Gate', description: 'A relaxed 3K run for all experience levels. Water and fruit are provided.', available: 90, joined: false },
];

export const categories: Array<'All' | EventCategory> = ['All', 'Academic', 'Arts', 'Sports'];
