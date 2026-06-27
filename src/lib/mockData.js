export const CATEGORIES = [
  { id: '1', name: 'Development', slug: 'development', icon: '💻' },
  { id: '2', name: 'Business', slug: 'business', icon: '📊' },
  { id: '3', name: 'Design', slug: 'design', icon: '🎨' },
  { id: '4', name: 'Marketing', slug: 'marketing', icon: '📣' },
  { id: '5', name: 'Data Science', slug: 'data-science', icon: '🔬' },
  { id: '6', name: 'Photography', slug: 'photography', icon: '📷' },
  { id: '7', name: 'Music', slug: 'music', icon: '🎵' },
  { id: '8', name: 'Health', slug: 'health', icon: '💪' },
]

export const MOCK_COURSES = [
  {
    id: '1', title: 'The Complete JavaScript Course 2024: From Zero to Expert',
    slug: 'complete-javascript-2024',
    shortDescription: 'The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory.',
    thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80',
    price: 19.99, originalPrice: 149.99, avgRating: 4.7, totalReviews: 185432,
    totalStudents: 845219, totalLessons: 69, totalDuration: 1620,
    level: 'ALL_LEVELS', language: 'English', instructorId: 'i1',
    instructorName: 'Jonas Schmedtmann', categoryId: '1', categoryName: 'Development',
    isBestseller: true, isFeatured: true, status: 'PUBLISHED',
    tags: ['JavaScript', 'ES6', 'Web Development'],
    whatYouLearn: ['Become an advanced, confident, and modern JavaScript developer', 'Build 6 beautiful real-world projects', 'Master the DOM, OOP, Async JS, and more'],
    requirements: ['No coding experience needed', 'Basic HTML/CSS knowledge helpful'],
    sections: [
      { id: 's1', title: 'Welcome & Setup', order: 1, lessons: [
        { id: 'l1', title: 'Course Introduction', duration: 300, type: 'VIDEO', isFree: true, order: 1 },
        { id: 'l2', title: 'Setting Up VS Code', duration: 480, type: 'VIDEO', isFree: true, order: 2 },
      ]},
      { id: 's2', title: 'JavaScript Fundamentals', order: 2, lessons: [
        { id: 'l3', title: 'Variables & Data Types', duration: 720, type: 'VIDEO', isFree: false, order: 1 },
        { id: 'l4', title: 'Operators & Strings', duration: 540, type: 'VIDEO', isFree: false, order: 2 },
        { id: 'l5', title: 'Control Flow', duration: 660, type: 'VIDEO', isFree: false, order: 3 },
      ]},
    ],
  },
  {
    id: '2', title: 'React - The Complete Guide 2024 (incl. Next.js, Redux)',
    slug: 'react-complete-guide-2024',
    shortDescription: 'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Router, Next.js and more.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    price: 19.99, originalPrice: 129.99, avgRating: 4.6, totalReviews: 198210,
    totalStudents: 923451, totalLessons: 89, totalDuration: 2340,
    level: 'ALL_LEVELS', language: 'English', instructorId: 'i2',
    instructorName: 'Maximilian Schwarzmüller', categoryId: '1', categoryName: 'Development',
    isBestseller: true, isFeatured: true, status: 'PUBLISHED',
    tags: ['React', 'Redux', 'Next.js'],
    whatYouLearn: ['Build powerful React apps', 'Master Hooks', 'Use Redux and Context'],
    requirements: ['JavaScript basics required'], sections: [],
  },
  {
    id: '3', title: 'Machine Learning A-Z: AI, Python & R + ChatGPT Bonus',
    slug: 'machine-learning-a-z',
    shortDescription: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
    price: 17.99, originalPrice: 119.99, avgRating: 4.5, totalReviews: 165890,
    totalStudents: 1012345, totalLessons: 44, totalDuration: 2760,
    level: 'BEGINNER', language: 'English', instructorId: 'i3',
    instructorName: 'Kirill Eremenko', categoryId: '5', categoryName: 'Data Science',
    isBestseller: true, isFeatured: false, status: 'PUBLISHED',
    tags: ['Python', 'Machine Learning', 'AI'],
    whatYouLearn: ['Understand ML algorithms', 'Python & R programming', 'Build real-world models'],
    requirements: ['High school math level'], sections: [],
  },
  {
    id: '4', title: 'UI/UX Design Bootcamp: From Beginner to Designer',
    slug: 'ui-ux-design-bootcamp',
    shortDescription: 'Learn User Experience Design to create beautiful, user-friendly apps and websites.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    price: 15.99, originalPrice: 99.99, avgRating: 4.8, totalReviews: 42318,
    totalStudents: 230000, totalLessons: 55, totalDuration: 1980,
    level: 'BEGINNER', language: 'English', instructorId: 'i4',
    instructorName: 'Sara Thompson', categoryId: '3', categoryName: 'Design',
    isBestseller: false, isFeatured: true, status: 'PUBLISHED',
    tags: ['Figma', 'UX', 'UI Design'],
    whatYouLearn: ['Figma from scratch', 'UX research methods', 'Design systems'],
    requirements: ['No prior design experience needed'], sections: [],
  },
  {
    id: '5', title: 'The Complete Digital Marketing Course - 12 Courses in 1',
    slug: 'complete-digital-marketing',
    shortDescription: 'Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    price: 12.99, originalPrice: 89.99, avgRating: 4.4, totalReviews: 89432,
    totalStudents: 450123, totalLessons: 33, totalDuration: 1440,
    level: 'BEGINNER', language: 'English', instructorId: 'i5',
    instructorName: 'Rob Percival', categoryId: '4', categoryName: 'Marketing',
    isBestseller: false, isFeatured: false, status: 'PUBLISHED',
    tags: ['SEO', 'Social Media', 'Marketing'],
    whatYouLearn: ['Google Analytics', 'Facebook Ads', 'Email marketing'],
    requirements: ['No experience needed'], sections: [],
  },
  {
    id: '6', title: 'AWS Certified Solutions Architect - Associate 2024',
    slug: 'aws-certified-solutions-architect',
    shortDescription: 'Full practice exam included! Covers all the material needed to pass the AWS certification.',
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=600&q=80',
    price: 24.99, originalPrice: 199.99, avgRating: 4.7, totalReviews: 112000,
    totalStudents: 678900, totalLessons: 52, totalDuration: 2160,
    level: 'INTERMEDIATE', language: 'English', instructorId: 'i6',
    instructorName: 'Ryan Kroonenburg', categoryId: '1', categoryName: 'Development',
    isBestseller: true, isFeatured: true, status: 'PUBLISHED',
    tags: ['AWS', 'Cloud', 'DevOps'],
    whatYouLearn: ['Core AWS services', 'Architecture best practices', 'Pass the SAA-C03 exam'],
    requirements: ['Basic IT knowledge helpful'], sections: [],
  },
]

export const MOCK_REVIEWS = [
  { id: 'r1', userId: 'u1', userName: 'Alex Johnson', userAvatar: 'https://i.pravatar.cc/48?img=1', rating: 5, title: "Best JavaScript course I've taken!", body: 'Jonas is an incredible instructor. The explanations are crystal clear and the projects are super practical.', createdAt: '2024-01-15', helpful: 234 },
  { id: 'r2', userId: 'u2', userName: 'Maria Garcia', userAvatar: 'https://i.pravatar.cc/48?img=5', rating: 4, title: 'Comprehensive and well-structured', body: 'The course covers everything you need to know. Some sections are a bit slow but the content quality is top notch.', createdAt: '2024-02-03', helpful: 178 },
  { id: 'r3', userId: 'u3', userName: 'James Wilson', userAvatar: 'https://i.pravatar.cc/48?img=3', rating: 5, title: 'Game changer for my career', body: "I was completely new to programming and now I have a job as a junior developer. This course is the reason.", createdAt: '2024-02-20', helpful: 456 },
]

export const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60), m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}
export const formatSeconds = (seconds) => {
  const m = Math.floor(seconds / 60), s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
export const formatNumber = (n) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n.toString()
}
