
import { NextResponse } from 'next/server';

export async function GET() {
    const channelId = 'UC_oVuCQmHJkAKhYOqmMgXmQ';
    const url = `https://www.youtube.com/channel/${channelId}/live`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        const text = await response.text();

        // If the page contains "canonical" pointing to a video, it's likely live.
        // If it's not live, it usually points back to the channel or a placeholder.
        // A live stream page has "isLive":true in the ytInitialData
        const isLive = text.includes('"isLive":true');

        return NextResponse.json({ isLive });
    } catch (error) {
        console.error('Failed to fetch YouTube status:', error);
        return NextResponse.json({ isLive: false });
    }
}
