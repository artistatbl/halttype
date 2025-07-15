import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'HaltType - Free Online Typing Speed Test'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#ffffff',
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          HaltType
        </div>
        <div
          style={{
            fontSize: 32,
            color: '#a0a0a0',
            textAlign: 'center',
            marginBottom: 40,
          }}
        >
          Free Online Typing Speed Test
        </div>
        <div
          style={{
            display: 'flex',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#60a5fa',
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>WPM Test</div>
            <div style={{ fontSize: 16, color: '#a0a0a0' }}>Speed</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#34d399',
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>Accuracy</div>
            <div style={{ fontSize: 16, color: '#a0a0a0' }}>Tracking</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: '#f59e0b',
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 'bold' }}>Practice</div>
            <div style={{ fontSize: 16, color: '#a0a0a0' }}>Improve</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}