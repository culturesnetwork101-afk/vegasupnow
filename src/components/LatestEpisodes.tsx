import { fetchLatestVideos } from '@/lib/youtube';
import LatestEpisodesClient from './LatestEpisodesClient';

// Server Component
export default async function LatestEpisodes() {
    const videos = await fetchLatestVideos();

    return (
        <LatestEpisodesClient
            videos={videos}
        />
    );
}
