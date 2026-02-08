import { parseStringPromise } from 'xml2js';

export interface Video {
    id: string;
    title: string;
    link: string;
    published: string;
    thumbnail: string;
}

const CHANNEL_ID = 'UC_oVuCQmHJkAKhYOqmMgXmQ';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export async function fetchLatestVideos(): Promise<Video[]> {
    try {
        const response = await fetch(RSS_URL, { next: { revalidate: 3600 } }); // Revalidate every hour
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
        }

        const xml = await response.text();
        const result = await parseStringPromise(xml);

        const entries = result.feed.entry || [];

        return entries.map((entry: { 'yt:videoId': string[]; title: string[]; link: { $: { href: string } }[]; published: string[] }) => ({
            id: entry['yt:videoId'][0],
            title: entry.title[0],
            link: entry.link[0].$.href,
            published: new Date(entry.published[0]).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }),
            thumbnail: `https://img.youtube.com/vi/${entry['yt:videoId'][0]}/maxresdefault.jpg`
        })).slice(0, 5); // Return top 5 videos

    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        // Fallback to empty array or previously hardcoded data if needed
        return [];
    }
}
