import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  author: 'Test Author',
  title: 'Book of testing',
  url: 'https://www.com',
  likes: 0,
  user: {
    name: 'Tester Test',
    username: 'tester',
  },
}

describe('<Blog />', () => {
  let container
  const mockHandlerLike = jest.fn()

  beforeEach(() => {
    container = render(
      <Blog
        key={blog.url}
        blog={blog}
        handleLikes={mockHandlerLike}
        handleRemove={mockHandlerLike}
        user={blog.user}
      />
    ).container
  })

  test('renders content: title and author', () => {
    //const { container } = render(<Blog blog={blog} />)

    screen.debug()

    const div = container.querySelector('.blogTitleAuthor')
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveStyle('display: none', { exact: false })
    expect(div).toBeVisible()
  })

  test('does not render: url and likes', async () => {
    //const { container } = render(<Blog blog={blog} />)

    screen.debug()

    // button has not been pressed so .blogNoInfo should be visible
    const div = container.querySelector('.blogNoInfo')
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)
    expect(div).not.toHaveStyle('display: none')
    expect(div).toBeVisible()
  })

  test('does render: url, likes and user', async () => {
    //const { container } = render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    screen.debug()

    // button has been pressed so .blogInfo should be visible
    const div = container.querySelector('.blogInfo')
    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
    expect(div).not.toHaveStyle('display: none')
    expect(div).toBeVisible()
  })

  test('when like button is clicked twice, event handler function is called 2 times', async () => {
    jest.fn()
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandlerLike.mock.calls).toHaveLength(2)
  })
})
