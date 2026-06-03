export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Product Designer",
    company: "Figma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    content:
      "TechVerse transformed how I discover professional events. The UI is stunning, booking took under a minute, and I found three incredible design conferences in my city.",
    rating: 5,
  },
  {
    id: "2",
    name: "Marcus Williams",
    role: "Startup Founder",
    company: "Nova Labs",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    content:
      "As a founder, networking events are everything. TechVerse's filtering and detailed event pages helped me land my Series A through a startup mixer I found here.",
    rating: 5,
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    role: "Software Engineer",
    company: "Stripe",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    content:
      "The tech conference listings are top-notch. Clear agendas, speaker bios, and real-time availability made planning my annual learning budget effortless.",
    rating: 5,
  },
  {
    id: "4",
    name: "James Okonkwo",
    role: "Marketing Director",
    company: "HubSpot",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    content:
      "We've used TechVerse for team offsites and client events. The platform feels like a premium product — polished, fast, and genuinely enjoyable to use.",
    rating: 5,
  },
  {
    id: "5",
    name: "Priya Sharma",
    role: "Music Producer",
    company: "Independent",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    content:
      "From underground showcases to major festivals — TechVerse surfaces events I would never find on social media. The favorites feature is a game-changer.",
    rating: 5,
  },
];
