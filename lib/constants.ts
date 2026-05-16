export type Event = {
  id: string;
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
};

export const events: Event[] = [
  {
    id: "1",
    title: "Google I/O 2025",
    image: "/images/event1.png",
    slug: "google-io-2025",
    location: "Mountain View, CA",
    date: "May 20, 2025",
    time: "10:00 AM",
  },
  {
    id: "2",
    title: "GitHub Universe 2025",
    image: "/images/event2.png",
    slug: "github-universe-2025",
    location: "San Francisco, CA",
    date: "Oct 28, 2025",
    time: "9:00 AM",
  },
  {
    id: "3",
    title: "React Summit 2025",
    image: "/images/event3.png",
    slug: "react-summit-2025",
    location: "Amsterdam, Netherlands",
    date: "Jun 13, 2025",
    time: "9:30 AM",
  },
  {
    id: "4",
    title: "DevFest India 2025",
    image: "/images/event4.png",
    slug: "devfest-india-2025",
    location: "Bangalore, India",
    date: "Nov 15, 2025",
    time: "10:00 AM",
  },
  {
    id: "5",
    title: "HackWithInfy 2025",
    image: "/images/event5.png",
    slug: "hackwithinfy-2025",
    location: "Pune, India",
    date: "Jul 5, 2025",
    time: "8:00 AM",
  },
  {
    id: "6",
    title: "Next.js Conf 2025",
    image: "/images/event6.png",
    slug: "nextjs-conf-2025",
    location: "Online",
    date: "Oct 23, 2025",
    time: "11:00 AM",
  },
];
