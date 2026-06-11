import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import AgentEmbed from '../../AgentEmbed'

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
    title,
    slug,
    part,
    level,
    introduction,
    vocabularyEnabled,
    vocabularyItems,
    usageExplanation,
    practiceAgentEnabled,
    practiceAgentLabel,
    practiceAgentDescription,
    practiceAgentType,
    practiceAgentId,
    scenarioAgentEnabled,
    scenarioAgentLabel,
    scenarioAgentDescription,
    scenarioAgentType,
    scenarioAgentId
  }`, { slug })
}

const partOfSpeechColors: Record<string, { bg: string, color: string }> = {
  noun: { bg: '#E8F0FE', color: '#0066CC' },
  verb: { bg: '#E6F4F0', color: '#00A8E8' },
  adjective: { bg: '#FFF3E0', color: '#e67e22' },
  adverb: { bg: '#F3E5F5', color: '#8e44ad' },
  phrase: { bg: '#E8F5E9', color: '#2e7d32' },
  idiom: { bg: '#FCE4EC', color: '#c0392b' },
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
      <section style={{ background: 'linear-gradient(135deg, #0a1f3d 60%, #0066CC 100%)', padding: '80px 40px', color: 'white' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <a href="/lessons" style={{ color: '#00A8E8', fontSize: '0.85rem', fontWeight: '600', display: 'inline-block', marginBottom: '24px' }}>
            ← All Lessons
          </a>
          <p style={{ color: '#00A8E8', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '16px' }}>
            {lesson.part}
          </p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '24px' }}>
            {lesson.title}
          </h1>
          {lesson.level && (
            <span style={{ background: 'rgba(0,168,232,0.2)', color: '#00A8E8', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '600' }}>
              {lesson.level}
            </span>
          )}
          {lesson.introduction && (
            <p style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: '1.8', maxWidth: '700px', marginTop: '24px' }}>
              {lesson.introduction}
            </p>
          )}
        </div>
      </section>

      {/* VOCABULARY SECTION */}
      {lesson.vocabularyEnabled && lesson.vocabularyItems?.length > 0 && (
        <section style={{ background: '#FFFFFF', padding: '80px 40px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ color: '#0066CC', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '12px' }}>
              Vocabulary
            </p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0a1f3d', marginBottom: '48px' }}>
              Words & Phrases
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' as const }}>
              {lesson.vocabularyItems.map((item: any, i: number) => (
                <div key={i} style={{ borderTop: i === 0 ? '3px solid #0066CC' : '1px solid #E0E0E0', padding: '32px 0' }}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' as const }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' as const }}>
                        <h3 style={{ color: '#0a1f3d', fontSize: '1.4rem', fontWeight: '800', margin: 0 }}>
                          {item.englishWord}
                        </h3>
                        {item.partOfSpeech && (
                          <span style={{
                            background: partOfSpeechColors[item.partOfSpeech]?.bg ?? '#F5F5F5',
                            color: partOfSpeechColors[item.partOfSpeech]?.color ?? '#555',
                            padding: '3px 10px',
                            borderRadius: '50px',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                          }}>
                            {item.partOfSpeech}
                          </span>
                        )}
                      </div>
                      {item.definition && (
                        <p style={{ color: '#555', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 12px' }}>
                          {item.definition}
                        </p>
                      )}
                      {item.exampleEnglish && (
                        <div style={{ borderLeft: '3px solid #00A8E8', paddingLeft: '16px', marginTop: '12px' }}>
                          <p style={{ color: '#0a1f3d', fontSize: '0.95rem', lineHeight: '1.7', margin: '0 0 4px', fontStyle: 'italic' }}>
                            "{item.exampleEnglish}"
                          </p>
                          {item.exampleThai && (
                            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.7', margin: 0 }}>
                              {item.exampleThai}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    {item.thaiTranslation && (
                      <div style={{ background: '#F5F5F5', borderRadius: '8px', padding: '16px 20px', width: '100%', maxWidth: '200px', textAlign: 'center' as const }}>
                        <p style={{ color: '#888', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '0 0 8px' }}>Thai</p>
                        <p style={{ color: '#0a1f3d', fontSize: '1.3rem', fontWeight: '700', margin: 0 }}>{item.thaiTranslation}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* USAGE EXPLANATION */}
      {lesson.vocabularyEnabled && lesson.usageExplanation?.length > 0 && (
        <section style={{ background: '#F5F5F5', padding: '80px 40px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ color: '#0066CC', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '12px' }}>
              Usage Guide
            </p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0a1f3d', marginBottom: '32px' }}>
              When to use these words
            </h2>
            <div style={{ background: 'white', borderRadius: '12px', padding: '40px', borderLeft: '4px solid #0066CC', color: '#555', lineHeight: '1.9', fontSize: '1rem' }}>
              {lesson.usageExplanation.map((block: any, i: number) => (
                <p key={i} style={{ marginBottom: '16px' }}>
                  {block.children?.map((child: any) => child.text).join('')}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRACTICE AGENT */}
      {lesson.practiceAgentEnabled && lesson.practiceAgentId && (
        <section style={{ background: '#F5F5F5', padding: '80px 40px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ color: '#0066CC', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '12px' }}>
              Step 1 — Practice
            </p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0a1f3d', marginBottom: '40px' }}>
              {lesson.practiceAgentLabel ?? 'Practice the vocabulary'}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              {[
                { step: '01', title: 'Read the vocabulary', description: 'Study the words and phrases above before starting.' },
                { step: '02', title: 'Start the agent', description: 'Click the button below to begin your practice session.' },
                { step: '03', title: 'Practice speaking', description: 'Use the vocabulary in natural conversation with the AI.' },
              ].map((item) => (
                <div key={item.step} style={{ background: 'white', padding: '24px', borderRadius: '8px', borderTop: '3px solid #0066CC' }}>
                  <p style={{ color: '#0066CC', fontSize: '1.5rem', fontWeight: '900', margin: '0 0 8px' }}>{item.step}</p>
                  <h3 style={{ color: '#0a1f3d', fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px' }}>{item.title}</h3>
                  <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: '1.6', margin: 0 }}>{item.description}</p>
                </div>
              ))}
            </div>
            {lesson.practiceAgentDescription && (
              <p style={{ color: '#555', marginBottom: '32px', fontSize: '0.95rem', lineHeight: '1.7', maxWidth: '600px' }}>
                {lesson.practiceAgentDescription}
              </p>
            )}
            <div style={{ background: 'white', borderRadius: '16px', padding: '48px 40px', border: '2px solid #E0E0E0', textAlign: 'center' as const }}>
              <p style={{ color: '#0066CC', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '12px' }}>
                Practice Agent
              </p>
              <h3 style={{ color: '#0a1f3d', fontSize: '1.5rem', fontWeight: '800', marginBottom: '32px' }}>
                Start practising
              </h3>
              <AgentEmbed type={lesson.practiceAgentType} agentId={lesson.practiceAgentId} />
              <p style={{ color: '#888', fontSize: '0.8rem', margin: '16px 0 0' }}>
                {lesson.practiceAgentType?.includes('elevenlabs') ? 'Powered by ElevenLabs AI' : 'Powered by Vapi AI'}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SCENARIO AGENT */}
      {lesson.scenarioAgentEnabled && lesson.scenarioAgentId && (
        <section style={{ background: '#FFFFFF', padding: '80px 40px' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ color: '#0066CC', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' as const, marginBottom: '12px' }}>
              Step 2 — Real Conversation
            </p>
            <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0a1f3d', marginBottom: '40px' }}>
              {lesson.scenarioAgentLabel ?? 'Now try a real conversation'}
            </h2>
            {lesson.scenarioAgentDescription && (
              <div style={{ background: '#F5F5F5', borderRadius: '12px', padding: '24px 32px', borderLeft: '4px solid #00A8E8', marginBottom: '32px' }}>
                <p style={{ color: '#0a1f3d', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' as const, letterSpacing: '0.05em', margin: '0 0 8px' }}>
                  Your Scenario
                </p>
                <p style={{ color: '#555', lineHeight: '1.8', margin: 0, fontSize: '0.95rem' }}>
                  {lesson.scenarioAgentDescription}
                </p>
              </div>
            )}
            <div style={{ background: 'white', borderRadius: '16px', padding: '48px 40px', border: '2px solid #E0E0E0', textAlign: 'center' as const }}>
              <p style={{ color: '#0066CC', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: '12px' }}>
                Scenario Agent
              </p>
              <h3 style={{ color: '#0a1f3d', fontSize: '1.5rem', fontWeight: '800', marginBottom: '32px' }}>
                Begin the scenario
              </h3>
              <AgentEmbed type={lesson.scenarioAgentType} agentId={lesson.scenarioAgentId} />
              <p style={{ color: '#888', fontSize: '0.8rem', margin: '16px 0 0' }}>
                {lesson.scenarioAgentType?.includes('elevenlabs') ? 'Powered by ElevenLabs AI' : 'Powered by Vapi AI'}
              </p>
            </div>
          </div>
        </section>
      )}

      <section style={{ background: '#1A1A1A', color: '#888', padding: '20px 40px', textAlign: 'center' as const, fontSize: '0.8rem' }}>
        <p>© {new Date().getFullYear()} Interactive Speaking. All rights reserved.</p>
      </section>
    </main>
  )
}