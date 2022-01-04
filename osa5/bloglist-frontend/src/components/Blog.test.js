import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component

const blog = {
  title: "Kuinka testata React-fronttia",
  author: "Matti Meikäläinen",
  url: "https://testaaminen.kiva",
  likes: "42",
  user: {name: 'Teemu Teekkari'}
}
const mockHandler = jest.fn()

const user = "Teemu Teekkari"

describe('Blog', () => {

  beforeEach(() => {
    component = render(
      <Blog blog={blog}
            handleLikes={mockHandler}
            currentUser={user}
            handleDelete={mockHandler} />
    )

})

  test('renders only title and author initially', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).not.toHaveTextContent(blog.url)
    expect(component.container).not.toHaveTextContent(`likes ${blog.likes}`)
  })

  test('renders url and likes after button press', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(`likes ${blog.likes}`)
  })

  test('press like button twice', () => {
    const viewBtn = component.getByText('view')
    fireEvent.click(viewBtn)
    const likeBtn = component.getByText('like')
    fireEvent.click(likeBtn)
    fireEvent.click(likeBtn)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})