import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const part = await client.fetch(`*[_type == "toeicPart" && slug.current == $slug][0]{ title, description }`, { slug })
  return {
    title: `${part?.title ?? 'TOEIC Part'} | Interactive Speaking`,
    description: part?.description ?? `Browse lessons for ${part?.title}`,
  }
}

async function getPart(slug: string) {
  return client.fetch(`*[_type == "toeicPart" && slug.current == $slug][0]{
    title,
    slug,
    description,
    icon,
    color,
    lessons[] -> {
      _id,
      title,
      slug,
      part,
      level,
      audioUrl
    }
  }`, { slug })
}

export default async function ToeicPartPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const part = await getPart(slug)

  if (!part) {
    return (
      <main>
        <section style={{ background: '#F5F5F5', padding: '100px 40px', textAlign: 'center' as const }}>
          <h1 style={{ color: '#1A1A1A', fontSize: '2rem' }}>Part Not Found</h1>
          <a href="/toeic-parts" style={{ color: '#0066CC', fontWeight: '600', marginTop: '24px', display: 'inline-block' }}>
            ← Back to TOEIC Parts
          </a>
        </section>
      </main>
    )
  }

  return (
    <main>
      <section style={{ background: '#0a1f3d', padding: '100px 40px', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <a href="/toeic-parts" style={{ color: '#00A8E8', fontSize: '0.85rem', fontWeight: '600', display: 'inline-block', marginBottom: '24px', letterSpacing: '0.05em' }}>
            ← All TOEIC Parts
          </a>
          <p style={{ color: '#00A8E8', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>
            TOEIC Part
          </p>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px' }}>
            {part.icon && <span style={{ marginRight: '12px' }}>{part.icon}</span>}
            {part.title}
          </h1>
          {part.description && (
            <p style={{ fontSize: '1.2rem', opacity: 0.75, lineHeight: '1.8', maxWidth: '600px' }}>
              {part.description}
            </p>
          )}
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: '40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '24px' }}>
            {part.lessons?.length ?? 0} {part.lessons?.length === 1 ? 'lesson' : 'lessons'} available
          </p>

          {!part.lessons?.length ? (
            <div style={{ padding: '80px 0', textAlign: 'center' as const }}>
              <p style={{ color: '#555' }}>No lessons available yet. Check back soon.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
              {part.lessons.map((lesson: any) => (
                <a key={lesson._id} href={`/lessons/${lesson.slug?.current}`} style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'stretch',
                  borderTop: '1px solid #E0E0E0',
                  borderBottom: '1px solid #E0E0E0',
                  background: 'white',
                }}>
                  <div style={{ width: '6px', background: part.color ?? '#0066CC', flexShrink: 0 }} />
                  <div style={{ flex: 1, padding: '40px 48px 40px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px' }}>
                    <div style={{ flex: 1 }}>
                      <h2 style={{ color: '#0a1f3d', fontSize: '1.3rem', fontWeight: '800', marginBottom: '12px', lineHeight: '1.3' }}>
                        {lesson.title}
                      </h2>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' as const }}>
                        {lesson.level && (
                          <span style={{ color: '#888', fontSize: '0.8rem' }}>{lesson.level}</span>
                        )}
                        {lesson.audioUrl && (
                          <span style={{ color: '#888', fontSize: '0.8rem' }}>· Audio available</span>
                        )}
                      </div>
                    </div>
                    <div style={{ color: part.color ?? '#0066CC', fontSize: '1.5rem', fontWeight: '300', flexShrink: 0 }}>→</div>
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