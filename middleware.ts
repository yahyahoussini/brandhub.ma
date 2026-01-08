import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// List of bots to send to Prerender.io
const botUserAgents = [
    'googlebot', 'bingbot', 'yandex', 'baiduspider', 'facebookexternalhit',
    'twitterbot', 'rogerbot', 'linkedinbot', 'embedly', 'quora link preview',
    'showyoubot', 'outbrain', 'pinterest/0.', 'developers.google.com/+/web/snippet',
    'slackbot', 'vkShare', 'w3c_validator', 'redditbot', 'applebot',
    'whatsapp', 'flipboard', 'tumblr', 'bitlybot', 'skypeuripreview',
    'nuzzel', 'discordbot', 'google page speed', 'qwantify', 'pinterest',
    'bitrix', 'xing-content', 'telegrambot'
];

export function middleware(request: NextRequest) {
    const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
    const { pathname } = request.nextUrl;

    // Ignore static files (images, css, etc.)
    const isFile = pathname.includes('.') && !pathname.endsWith('.html');
    const isBot = botUserAgents.some((bot) => userAgent.includes(bot));

    // If it is a bot and NOT a file, send to Prerender
    if (isBot && !isFile) {
        const prUrl = `https://service.prerender.io/${request.url}`;

        const prHeaders = new Headers(request.headers);
        // This token MUST be set in Vercel Environment Variables
        prHeaders.set('X-Prerender-Token', process.env.PRERENDER_TOKEN || '');

        return NextResponse.rewrite(prUrl, {
            request: { headers: prHeaders }
        });
    }

    return NextResponse.next();
}

export const config = {
    // Apply to all routes except api, static files, and images
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};