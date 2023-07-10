import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('Form calls return function with the right information when blog is being created', async () => {
    const newBlogMock = jest.fn()
    render(<BlogForm createBlog={newBlogMock} user={'testuser'} />)

    expect(screen.getByText('Add a new blog')).toHaveTextContent(
      'Add a new blog'
    )

    const inputAuthor = screen.getByPlaceholderText('add author')
    const inputTitle = screen.getByPlaceholderText('add title')
    const inputUrl = screen.getByPlaceholderText('add url')
    const submitButton = screen.getByText('submit')

    const user = userEvent.setup()
    await user.type(inputAuthor, 'Test Author')
    await user.type(inputTitle, 'Book of testing')
    await user.type(inputUrl, 'https://www.com')
    await user.click(submitButton)

    expect(newBlogMock.mock.calls).toHaveLength(1)
    expect(newBlogMock.mock.calls[0][0].title).toBe('Book of testing')
    expect(newBlogMock.mock.calls[0][0].author).toBe('Test Author')
    expect(newBlogMock.mock.calls[0][0].url).toBe('https://www.com')
  })
})
