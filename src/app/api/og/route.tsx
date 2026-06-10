import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Dynamic params
    const title = searchParams.get('title') || 'Creative Elephant 🐘';
    const desc = searchParams.get('desc') || 'AI Dünyasının Kılavuzu';
    const score = searchParams.get('score');
    const icon = searchParams.get('icon') || '🐘';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FAFAF8',
            fontFamily: 'sans-serif',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #E0DDD6 2%, transparent 0%), radial-gradient(circle at 75px 75px, #E0DDD6 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            border: '20px solid #C8973A',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 100, marginBottom: 40, width: 160, height: 160, background: '#FDF6E8', border: '2px solid #E8D4A8', borderRadius: 40 }}>
            {icon}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 60,
              fontFamily: 'serif',
              fontWeight: 700,
              color: '#18181A',
              marginBottom: 20,
              textAlign: 'center',
              padding: '0 40px',
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#6B6B72',
              textAlign: 'center',
              padding: '0 40px',
              maxWidth: 900,
            }}
          >
            {desc}
          </div>

          {score && (
            <div style={{ display: 'flex', alignItems: 'center', marginTop: 40, background: '#FDF6E8', padding: '10px 30px', borderRadius: 20, border: '2px solid #E8D4A8' }}>
              <span style={{ fontSize: 32, color: '#C8973A', fontWeight: 600 }}>TrustScore: {score}/100</span>
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: unknown) {
    console.log(`${(e as Error).message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
