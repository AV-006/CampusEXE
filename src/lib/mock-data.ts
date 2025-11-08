import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder | undefined => PlaceHolderImages.find(img => img.id === id);

export const navItems = [
  { label: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { label: 'Resources', href: '/resources', icon: 'BookCopy' },
  { label: 'Interaction', href: '/interaction', icon: 'Users' },
  { label: 'Feedback', href: '/feedback', icon: 'MessageSquareQuote' },
  { label: 'Services', href: '/services', icon: 'ConciergeBell' },
  { label: 'Events', href: '/events', icon: 'Calendar' },
];

export const resources = [
  {
    category: 'Course Notes',
    items: [
      { title: 'Introduction to Computer Science', type: 'PDF', size: '2.3MB' },
      { title: 'Advanced Algorithms', type: 'PDF', size: '4.1MB' },
      { title: 'Data Structures Lecture 10', type: 'PDF', size: '1.5MB' },
    ],
  },
  {
    category: 'Presentations',
    items: [
      { title: 'Mid-term Project Guidelines', type: 'PPTX', size: '5.8MB' },
      { title: 'History of Art: Renaissance', type: 'PPTX', size: '12.2MB' },
    ],
  },
  {
    category: 'Recommended Books',
    items: [
      { title: 'Clean Code by Robert C. Martin', type: 'EPUB', size: '3.4MB' },
      { title: 'The Design of Everyday Things by Don Norman', type: 'EPUB', size: '5.1MB' },
    ],
  },
];

export const leaderboard = [
  { rank: 1, name: 'Alice Johnson', points: 1250, avatar: 'https://picsum.photos/seed/101/40/40' },
  { rank: 2, name: 'Bob Williams', points: 1120, avatar: 'https://picsum.photos/seed/102/40/40' },
  { rank: 3, name: 'Charlie Brown', points: 1050, avatar: 'https://picsum.photos/seed/103/40/40' },
  { rank: 4, name: 'Diana Miller', points: 980, avatar: 'https://picsum.photos/seed/104/40/40' },
  { rank: 5, name: 'Ethan Davis', points: 950, avatar: 'https://picsum.photos/seed/105/40/40' },
  { rank: 6, name: 'Fiona Garcia', points: 890, avatar: 'https://picsum.photos/seed/106/40/40' },
  { rank: 7, name: 'George Rodriguez', points: 850, avatar: 'https://picsum.photos/seed/107/40/40' },
  { rank: 8, name: 'Hannah Wilson', points: 820, avatar: 'https://picsum.photos/seed/108/40/40' },
  { rank: 9, name: 'Ian Martinez', points: 780, avatar: 'https://picsum.photos/seed/109/40/40' },
  { rank: 10, name: 'Jane Anderson', points: 760, avatar: 'https://picsum.photos/seed/110/40/40' },
];

export const feedbackQuestions = [
  { id: 'strengths', label: "What are the instructor's strengths?", placeholder: "e.g., Clear explanations, engaging lectures, very approachable..." },
  { id: 'improvements', label: 'In which areas can the instructor improve?', placeholder: "e.g., Pace of the class, more practical examples..." },
  { id: 'material', label: 'Was the course material helpful and well-organized?', placeholder: "e.g., The textbook was great, but the slides could be more detailed..." },
  { id: 'pace', label: 'How was the pace of the course?', placeholder: "e.g., It was too fast, just right, a bit slow..." },
  { id: 'additional', label: 'Any additional comments or suggestions?', placeholder: "Share any other thoughts you have..." },
];

export const libraryData = {
  newArrivals: [
    { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari' },
    { title: 'Atomic Habits', author: 'James Clear' },
    { title: 'Project Hail Mary', author: 'Andy Weir' },
  ],
  availableBooks: [
    { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', status: 'Available' },
    { title: '1984', author: 'George Orwell', status: 'Checked Out' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'Available' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Available' },
  ],
};

export const canteenMenu = {
  breakfast: ['Pancakes', 'Omelette', 'Cereal', 'Fresh Fruit'],
  lunch: ['Chicken Curry with Rice', 'Vegetable Stir-Fry', 'Pasta Alfredo', 'Salad Bar'],
  dinner: ['Grilled Salmon', 'Beef Stew', 'Lentil Soup', 'Pizza'],
};

export const gymInfo = {
  timings: 'Mon-Sat: 6:00 AM - 10:00 PM, Sun: 8:00 AM - 8:00 PM',
  equipment: ['Treadmills', 'Ellipticals', 'Stationary Bikes', 'Free Weights', 'Weight Machines'],
};

export const events = [
  {
    title: 'Annual Music Fest',
    club: 'Music Club',
    date: '2024-11-15',
    description: 'Join us for a night of amazing music from student bands and local artists.',
    image: getImage('event-music-fest'),
  },
  {
    title: 'Innovate & Create Hackathon',
    club: 'Coding Club',
    date: '2024-11-22',
    description: 'A 24-hour coding competition to build innovative solutions. Prizes to be won!',
    image: getImage('event-hackathon'),
  },
  {
    title: 'University Sports Day',
    club: 'Athletics Department',
    date: '2024-12-05',
    description: 'Compete in various track and field events and show your university spirit.',
    image: getImage('event-sports-day'),
  },
];
