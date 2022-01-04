import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './Blogform'

test('Blog can be created', () => {
  const blog = {
    title: "Kuinka testata React-fronttia",
    author: "Matti Meikäläinen",
    url: "https://testaaminen.kiva",
    likes: "42",
    user: {name: 'Teemu Teekkari'}
  }
  const mockHandler = jest.fn()
  let component
  component = render(
    <BlogForm handleSubmit={mockHandler} />
  )
  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')
  
  fireEvent.change(titleInput, {
    target: { value: blog.title }
  })

  fireEvent.change(authorInput, {
    target: { value: blog.author }
  })

  fireEvent.change(urlInput, {
    target: { value: blog.url }
  })

  const button = component.container.querySelector('button')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

})