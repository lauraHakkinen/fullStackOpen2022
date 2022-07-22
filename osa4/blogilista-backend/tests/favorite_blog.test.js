const favorite_blog = require('../utils/list_helper').favorite_blog

describe('favorite blog', () => {
  test('of an empty list', () => {
    expect(favorite_blog([])).toBe('no blogs')
  })

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals that blog', () => {
    expect(favorite_blog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  const listWithSevenBlogs = [
    {
      title: 'How to be a sigma',
      author: 'Teemu Teekkari',
      url: 'http://sigma.com',
      likes: 10,
      id: '62d42432c08e59f766c70622'
    },
    {
      title: 'Millainen sää huomenna?',
      author: 'Pekka Pouta',
      url: 'http://saa.fi',
      likes: 8,
      id: '62d4270fc08e59f766c70627'
    },
    {
      title: 'Kivoi kissoi',
      author: 'Laura Häkkinen',
      url: 'http://kivoikissoi.org',
      likes: 8,
      id: '62d5a535794fa33bd9b7180e'
    },
    {
      title: 'Testinen',
      author: 'Testi',
      url: 'http://testi.fi',
      likes: 4,
      id: '62d9828fd297b5ac332a8f8e'
    },
    {
      title: 'My life',
      author: 'Teemu Teekkari',
      url: 'http://omaelamankerta.fi',
      likes: 3,
      id: '62d990f34260222f7d3e9174'
    },
    {
      title: 'Funny Cats',
      author: 'MemeGod',
      url: 'http://memecats.com',
      likes: 10,
      id: '62d992aed07e7c0fca522024'
    },
    {
      title: 'How to be a sigma',
      author: 'Teemu Teekkari',
      url: 'http://sigma.fi',
      likes: 2,
      id: '62da9602053574d58a9e51eb'
    }
  ]

  test('when list has seven blogs equals the blog that has the most likes', () => {
    expect(favorite_blog(listWithSevenBlogs)).toEqual(listWithSevenBlogs[5])
  })
})