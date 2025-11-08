import type { ImagePlaceholder } from './placeholder-images';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string): ImagePlaceholder | undefined => PlaceHolderImages.find(img => img.id === id);

export type ResourceItem = {
  title: string;
  type: string;
  size: string;
};

export type ResourceCategory = {
  category: string;
  items: ResourceItem[];
};

export const navItems = [
  { label: 'Dashboard', href: '/', icon: 'LayoutDashboard' },
  { label: 'Resources', href: '/resources', icon: 'BookCopy' },
  { label: 'Interaction', href: '/interaction', icon: 'Users' },
  { label: 'Feedback', href: '/feedback', icon: 'MessageSquareQuote' },
  { label: 'Services', href: '/services', icon: 'ConciergeBell' },
  { label: 'Events', href: '/events', icon: 'Calendar' },
];

export const resources: ResourceCategory[] = [
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
  { rank: 1, name: 'Aarav Sharma', points: 1250, avatar: 'https://picsum.photos/seed/101/40/40' },
  { rank: 2, name: 'Diya Patel', points: 1120, avatar: 'https://picsum.photos/seed/102/40/40' },
  { rank: 3, name: 'Rohan Gupta', points: 1050, avatar: 'https://picsum.photos/seed/103/40/40' },
  { rank: 4, name: 'Priya Singh', points: 980, avatar: 'https://picsum.photos/seed/104/40/40' },
  { rank: 5, name: 'Arjun Kumar', points: 950, avatar: 'https://picsum.photos/seed/105/40/40' },
  { rank: 6, name: 'Ananya Reddy', points: 890, avatar: 'https://picsum.photos/seed/106/40/40' },
  { rank: 7, name: 'Vikram Joshi', points: 850, avatar: 'https://picsum.photos/seed/107/40/40' },
  { rank: 8, name: 'Saanvi Desai', points: 820, avatar: 'https://picsum.photos/seed/108/40/40' },
  { rank: 9, name: 'Kabir Mehta', points: 780, avatar: 'https://picsum.photos/seed/109/40/40' },
  { rank: 10, name: 'Ishani Shah', points: 760, avatar: 'https://picsum.photos/seed/110/40/40' },
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
    { title: 'The God of Small Things', author: 'Arundhati Roy' },
    { title: 'Train to Pakistan', author: 'Khushwant Singh' },
    { title: 'The White Tiger', author: 'Aravind Adiga' },
  ],
  availableBooks: [
    { title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', status: 'Available' },
    { title: '1984', author: 'George Orwell', status: 'Checked Out' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', status: 'Available' },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', status: 'Available' },
  ],
};

export const canteenMenu = {
  breakfast: ['Poha', 'Idli-Sambar', 'Aloo Paratha', 'Masala Chai'],
  lunch: ['Dal Makhani with Naan', 'Vegetable Biryani', 'Chicken Tikka Masala', 'Raita'],
  dinner: ['Palak Paneer', 'Roti', 'Jeera Rice', 'Mixed Vegetable Curry'],
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
