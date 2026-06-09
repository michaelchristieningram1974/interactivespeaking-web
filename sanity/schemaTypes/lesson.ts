export default {
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'part',
      title: 'TOEIC Part',
      type: 'string',
      options: {
        list: [
          'Part 1 - Photographs',
          'Part 2 - Question Response',
          'Part 3 - Conversations',
          'Part 4 - Talks',
          'Part 5 - Incomplete Sentences',
          'Part 6 - Text Completion',
          'Part 7 - Reading Comprehension',
        ],
      },
    },
    {
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: ['Beginner', 'Intermediate', 'Advanced'],
      },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'audioUrl',
      title: 'Audio URL',
      type: 'url',
    },
  ],
}