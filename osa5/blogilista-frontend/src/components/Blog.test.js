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
    username: 'tester'
  }
}

test('renders content: title and author', () => {
  const { container } = render(<Blog blog={blog} />)

  screen.debug()

  const div = container.querySelector('.blogTitleAuthor')
  expect(div).not.toHaveStyle('display: none', { exact: false })
  expect(div).toBeVisible()
})

test('does not render: url and likes', async () => {
  const { container } = render(<Blog blog={blog} />)

  screen.debug()

  const div = container.querySelector('.blogNoInfo')
  expect(div).not.toHaveStyle('display: none')
  expect(div).toBeVisible()
})