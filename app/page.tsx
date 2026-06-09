import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Interactive Speaking | TOEIC English Practice',
  description: 'Interactive Speaking is a platform designed to help students practice English for the TOEIC exam.',
  keywords: 'TOEIC English, TOEIC practice, English speaking practice, TOEIC preparation',
  openGraph: {
    title: 'Interactive English practice for TOEIC students',
    description: 'A platform which helps students practice English for the TOEIC exam using voice agents and real conversations.',
    type: 'website',
  },
}

async function getLessons() {
  return client.fetch(`*[_type == "lesson"] | order(_createdAt asc)[0...6]{ _id, title, slug, part, level }`)
}

export default async function Home() {
  const lessons = await getLessons()

  return (
    <main>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0a1f3d 60%, #003087 100%)', padding: '120px 40px', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '900', lineHeight: '1.05', marginBottom: '32px', textTransform: 'uppercase' as const, maxWidth: '700px' }}>
            <span style={{ color: '#00A8E8' }}>PRACTICE DAILY.</span><br />
            <span style={{ color: '#00A8E8' }}>REAL CONVERSATIONS.</span><br />
            <span style={{ color: 'white' }}>ACE YOUR TOEIC.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, lineHeight: '1.7', marginBottom: '16px', maxWidth: '550px' }}>
            Build the speaking and listening confidence you need to score higher on the TOEIC exam.
          </p>
          <p style={{ fontSize: '0.95rem', opacity: 0.65, lineHeight: '1.8', marginBottom: '48px', maxWidth: '550px' }}>
            Practice all 7 TOEIC parts with a voice agent. Anytime, anywhere.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' as const }}>
            <a href="/lessons" style={{ background: '#00A8E8', color: '#0a1f3d', padding: '14px 32px', borderRadius: '50px', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
              Start Practicing →
            </a>
            <a href="/universities" style={{ background: 'transparent', color: 'white', padding: '14px 32px', borderRadius: '50px', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' as const, border: '2px solid rgba(255,255,255,0.4)' }}>
              For Universities
            </a>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section style={{ background: '#0066CC', padding: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', textAlign: 'center' as const }}>
          {[
            { stat: '7 Parts', label: 'full TOEIC coverage' },
            { stat: '150+', label: 'practice lessons' },
            { stat: 'Voice AI', label: 'real conversation practice' },
            { stat: '24wk', label: 'average time to fluency' },
          ].map((item, i) => (
            <div key={i}>
              <p style={{ color: '#00A8E8', fontSize: '2.5rem', fontWeight: '900', fontFamily: 'Georgia, serif', margin: '0 0 8px' }}>{item.stat}</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: 0, lineHeight: '1.5' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY VOICE AGENT */}
      <section style={{ background: '#FFFFFF', padding: '100px 40px', textAlign: 'center' as const }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0a1f3d', marginBottom: '16px', textTransform: 'uppercase' as const }}>
            WHY USE A <span style={{ color: '#0066CC' }}>VOICE AGENT?</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1rem', marginBottom: '40px', lineHeight: '1.7' }}>
            The ideal tool for independent TOEIC preparation
          </p>
          <p style={{ color: '#555', lineHeight: '1.9', fontSize: '1.05rem', marginBottom: '16px', textAlign: 'left' as const }}>
            Practicing with a voice agent transforms TOEIC preparation from passive study into <strong>real conversation</strong>. Unlike flashcards or grammar drills, a voice agent lets you actually speak — building the fluency and confidence that only come from talking aloud. It responds instantly, so you practice listening and replying in real time, just like a genuine exchange. There's no fear of judgement, so you're free to make mistakes, repeat tricky phrases, and try again as often as you like. Available anytime, it offers unlimited patient practice tailored to your pace.
          </p>
          <a href="/lessons" style={{ background: '#0066CC', color: 'white', padding: '14px 32px', borderRadius: '50px', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' as const, display: 'inline-block' }}>
            Start Practicing →
          </a>
        </div>
      </section>

      {/* BENEFITS FOR UNIVERSITIES */}
      <section style={{ background: '#F5F5F5', padding: '100px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.8rem', fontWeight: '900', color: '#0a1f3d', marginBottom: '16px', textTransform: 'uppercase' as const, textAlign: 'center' as const }}>
            BENEFITS FOR <span style={{ color: '#0066CC' }}>UNIVERSITIES</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1rem', marginBottom: '60px', lineHeight: '1.7', textAlign: 'center' as const }}>
            A scalable TOEIC preparation solution for your students
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {[
              { step: '01', title: 'Enables students to self learn', description: 'Students practice independently at their own pace, any time of day — no classroom scheduling required.' },
              { step: '02', title: 'Builds real confidence', description: 'Voice-based practice builds speaking confidence that written exercises simply cannot replicate.' },
              { step: '03', title: 'Reduces admin', description: 'One annual contract covers your entire student cohort. No need to manage individual subscriptions.' },
            ].map((item, i) => (
              <div key={i} style={{ background: 'white', padding: '36px', borderRadius: '12px' }}>
                <div style={{ color: '#00A8E8', fontSize: '2.5rem', fontWeight: '900', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>{item.step}</div>
                <h3 style={{ color: '#0a1f3d', fontSize: '1.1rem', fontWeight: '700', marginBottom: '12px' }}>{item.title}</h3>
                <p style={{ color: '#555', lineHeight: '1.7', fontSize: '0.95rem', margin: 0 }}>{item.description}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' as const, marginTop: '40px' }}>
            <a href="/universities" style={{ color: '#0066CC', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' as const, border: '2px solid #0066CC', padding: '12px 28px', borderRadius: '50px', display: 'inline-block' }}>
              Learn More →
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED LESSONS */}
      {lessons.length > 0 && (
        <section style={{ background: '#0a1f3d', padding: '100px 40px', color: 'white' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: '900', marginBottom: '16px', textTransform: 'uppercase' as const, textAlign: 'center' as const }}>
              FEATURED <span style={{ color: '#00A8E8' }}>LESSONS</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginBottom: '60px', textAlign: 'center' as const }}>
              Practice all 7 parts of the TOEIC exam
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
              {lessons.map((lesson: any) => (
                <div key={lesson._id} style={{ borderTop: '3px solid #00A8E8', paddingTop: '24px' }}>
                  <p style={{ color: '#00A8E8', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' as const, letterSpacing: '0.05em', marginBottom: '8px' }}>{lesson.part}</p>
                  <h3 style={{ color: 'white', marginBottom: '12px', fontSize: '1.1rem', fontWeight: '700' }}>{lesson.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>{lesson.level}</p>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center' as const, marginTop: '48px' }}>
              <a href="/lessons" style={{ background: '#00A8E8', color: '#0a1f3d', padding: '14px 32px', borderRadius: '50px', fontWeight: '700', fontSize: '0.9rem', textDecoration: 'none', letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>
                View All Lessons →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* DISCLAIMER */}
      <section style={{ background: '#1A1A1A', color: '#888', padding: '20px 40px', textAlign: 'center' as const, fontSize: '0.8rem' }}>
        <p>© {new Date().getFullYear()} Interactive Speaking. All rights reserved.</p>
      </section>

    </main>
  )
}