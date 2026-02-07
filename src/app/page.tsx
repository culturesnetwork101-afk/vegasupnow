'use client';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import LatestEpisodes from '@/components/LatestEpisodes';
import About from '@/components/About';
import Schedule from '@/components/Schedule';
import SocialFeed from '@/components/SocialFeed';
import MediaKit from '@/components/MediaKit';
import NewsFeed from '@/components/NewsFeed';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <LatestEpisodes />
      <About />
      <Schedule />
      <SocialFeed />
      <Contact />
      <MediaKit />
      <NewsFeed />
      <Footer />
    </main>
  );
}
