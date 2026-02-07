import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();

export async function GET() {
    try {
        // Top hip-hop news feeds
        const feeds = [
            'https://allhiphop.com/feed/',
            'https://www.xxlmag.com/feed/'
        ];

        const results = await Promise.all(
            feeds.map(async (url) => {
                try {
                    const feed = await parser.parseURL(url);
                    return feed.items.map((item: any) => ({
                        title: item.title,
                        link: item.link,
                        pubDate: item.pubDate,
                        source: feed.title || 'Hip Hop News',
                        // Capture more content for the on-site modal
                        contentSnippet: item.contentSnippet,
                        content: item.content || item.contentSnippet,
                        // Try to find an image in the feed item
                        image: item.enclosure?.url ||
                            item['media:content']?.[0]?.$.url ||
                            item['media:thumbnail']?.[0]?.$.url || null
                    }));
                } catch (error) {
                    console.error(`Error fetching feed from ${url}:`, error);
                    return [];
                }
            })
        );

        // Flatten and sort by date
        const allNews = results.flat().sort((a, b) =>
            new Date(b.pubDate!).getTime() - new Date(a.pubDate!).getTime()
        ).slice(0, 12);

        return NextResponse.json(allNews);
    } catch (error) {
        console.error('RSS Parsing error:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
