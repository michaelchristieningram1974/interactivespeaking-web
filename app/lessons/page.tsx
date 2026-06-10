import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Lessons | Interactive Speaking',
  description: 'Browse all TOEIC practice lessons on Interactive Speaking.',
}

async function getLessons() {
  return client.fetch(`*[_type == "lesson"] | order(_createdAt asc) {
    _id,
    title,
    slug,
    part,
    level,
    audioUrl
  }`)
}

export default async function LessonsPage() {
  const lessons = await getLessons()

  return (
    <main>
      <section style={{ background: '#0a1f3d', padding: '80px 40px', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#00A8E8', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>
            Learning Resources
          </p>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.05', marginBottom: '16px' }}>
            All Lessons
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.75, lineHeight: '1.8', maxWidth: '600px' }}>
            Browse all TOEIC practice lessons and start improving your score today.
          </p>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', padding: '40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#888', fontSize: '0.85rem', marginBottom: '24px' }}>
            {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'} available
          </p>

          {lessons.length === 0 ? (
            <div style={{ padding: '80px 0', textAlign: 'center' as const }}>
              <p style={{ color: '#555' }}>No lessons available yet. Check back soon.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
              {lessons.map((lesson: any) => (
                <a key={lesson._id} href={`/lessons/${lesson.slug?.current}`} style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'stretch',
                  borderTop: '1px solid #E0E0E0',
                  borderBottom: '1px solid #E0E0E0',
                  background: 'white',
                }}>
                  <div style={{ width: '6px', background: '#0066CC', flexShrink: 0 }} />
                  <div style={{ flex: 1, padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ color: '#00A8E8', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '6px' }}>
                        {lesson.part}
                      </p>
                      <h2 style={{ color: '#0a1f3d', fontSize: '1.1rem', fontWeight: '800', marginBottom: '8px', lineHeight: '1.3' }}>
                        {lesson.title}
                      </h2>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        {lesson.level && (
                          <span style={{ color: '#888', fontSize: '0.8rem' }}>{lesson.level}</span>
                        )}
                        {lesson.audioUrl && (
                          <span style={{ color: '#888', fontSize: '0.8rem' }}>· Audio available</span>
                        )}
                      </div>
                    </div>
                    <span style={{ color: '#CCCCCC', fontSize: '1.8rem', fontWeight: '300', lineHeight: 1 }}>→</span>
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