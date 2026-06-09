import { client } from '@/sanity/lib/client'

async function getLessons() {
  return await client.fetch(`*[_type == "lesson"] | order(_createdAt asc) {
    _id,
    title,
    slug,
    part,
    level
  }`)
}

export default async function Home() {
  const lessons = await getLessons()

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Interactive Speaking</h1>
      <p className="text-gray-500 mb-8">TOEIC English Practice</p>

      <div className="grid gap-4">
        {lessons.map((lesson: any) => (
          <div key={lesson._id} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <h2 className="font-semibold text-lg">{lesson.title}</h2>
              <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {lesson.level}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{lesson.part}</p>
          </div>
        ))}
      </div>
    </main>
  )
}