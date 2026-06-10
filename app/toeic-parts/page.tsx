import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'TOEIC Parts | Interactive Speaking',
  description: 'Browse all 7 TOEIC parts and practice lessons on Interactive Speaking.',
}

async function getToeicParts() {
  return client.fetch(`*[_type == "toeicPart"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    color,
    "lessonCount": count(lessons)
  }`)
}

export default async function ToeicPartsPage() {
  const parts = await getToeicParts()

  return (
    <main>
      <section style={{ background: '#0a1f3d', padding: '80px 40px', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#00A8E8', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>
            Learning Resources
          </p>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.05', marginBottom: '16px' }}>
            TOEIC Parts
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.75, lineHeight: '1.8', maxWidth: '600px' }}>
            Browse all 7 parts of the TOEIC exam and find the practice lessons you need.
          </p>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: '40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {parts.length === 0 ? (
            <div style={{ padding: '80px 0', textAlign: 'center' as const }}>
              <p style={{ color: '#555' }}>No TOEIC parts available yet. Check back soon.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {parts.map((part: any) => (
                <a key={part._id} href={`/toeic-parts/${part.slug?.current}`} style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'stretch',
                  borderTop: '1px solid #E0E0E0',
                  borderBottom: '1px solid #E0E0E0',
                  borderRight: '1px solid #E0E0E0',
                  background: 'white',
                }}>
                  <div style={{ width: '6px', background: part.color ?? '#0066CC', flexShrink: 0 }} />
                  <div style={{ flex: 1, padding: '24px 28px' }}>
                    <h2 style={{ color: '#0a1f3d', fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)', fontWeight: '800', marginBottom: '8px', lineHeight: '1.3' }}>
                      {part.icon && <span style={{ marginRight: '8px' }}>{part.icon}</span>}
                      {part.title}
                    </h2>
                    {part.description && (
                      <p style={{ color: '#555', lineHeight: '1.6', fontSize: '0.9rem', margin: '0 0 12px' }}>
                        {part.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>
                        {part.lessonCount ?? 0} {part.lessonCount === 1 ? 'lesson' : 'lessons'}
                      </p>
                      <span style={{ color: '#CCCCCC', fontSize: '1.8rem', fontWeight: '300', lineHeight: 1 }}>→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      <section style={{ background: '#1A1A1A', color: '#888', padding: '20px 40px', textAlign: 'center' as const, fontSize: '0.8rem' }}>
        <p>© {new Date().getFullYear()} Interactive Speaking. All rights reserved.</p>
      </section>
    </main>
  )
}