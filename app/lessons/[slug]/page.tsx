import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const lesson = await client.fetch(`*[_type == "lesson" && slug.current == $slug][0]{ title, part }`, { slug })
  return {
    title: `${lesson?.title ?? 'Lesson'} | Interactive Speaking`,
    description: `Practice ${lesson?.part ?? 'TOEIC'} with this lesson on Interactive Speaking.`,
  }
}

async function getLesson(slug: string) {
  return client.fetch(`*[_type == "lesson" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    part,
    level,
    body,
    audioUrl
  }`, { slug })
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const lesson = await getLesson(slug)

  if (!lesson) {
    return (
      <main>
        <section style={{ background: '#F5F5F5', padding: '100px 40px', textAlign: 'center' as const }}>
          <h1 style={{ color: '#1A1A1A', fontSize: '2rem' }}>Lesson Not Found</h1>
          <a href="/lessons" style={{ color: '#0066CC', fontWeight: '600', marginTop: '24px', display: 'inline-block' }}>
            ← Back to Lessons
          </a>
        </section>
      </main>
    )
  }

  return (
    <main>
      {/* HERO */}
      <section style={{ background: '#0a1f3d', padding: '100px 40px', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <a href="/lessons" style={{ color: '#00A8E8', fontSize: '0.85rem', fontWeight: '600', display: 'inline-block', marginBottom: '24px', letterSpacing: '0.05em' }}>
            ← All Lessons
          </a>
          <p style={{ color: '#00A8E8', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>
            {lesson.part}
          </p>
          <h1 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.05', marginBottom: '24px' }}>
            {lesson.title}
          </h1>
          {lesson.level && (
            <span style={{ background: 'rgba(0,168,232,0.2)', color: '#00A8E8', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '600' }}>
              {lesson.level}
            </span>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: '#FFFFFF', padding: '60px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {lesson.audioUrl && (
            <div style={{ marginBottom: '40px' }}>
              <p style={{ color: '#0a1f3d', fontWeight: '700', marginBottom: '12px' }}>Audio</p>
              <audio controls style={{ width: '100%' }}>
                <source src={lesson.audioUrl} />
              </audio>
            </div>
          )}

          {lesson.body && (
            <div style={{ color: '#333', lineHeight: '1.9', fontSize: '1.05rem' }}>
              {lesson.body.map((block: any, i: number) => (
                <p key={i} style={{ marginBottom: '16px' }}>
                  {block.children?.map((child: any) => child.text).join('')}
                </p>
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