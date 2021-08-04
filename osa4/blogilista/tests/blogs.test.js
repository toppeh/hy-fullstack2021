/*eslint-disable */
const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user')
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.biglist);
  const userPromises = helper.userList.map(user => api.post('/api/users').send(user))
  await Promise.all(userPromises)
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('get all blogs', async () => {
  const allBlogs = await helper.blogsInDb()
  expect(allBlogs).toHaveLength(helper.biglist.length)
});

test('check id-field name', async () => {
  const allBlogs = await helper.blogsInDb()

  expect(allBlogs[0].id).toBeDefined()
})

describe('adding blogs', () => {
  test('adding a new blog', async () => {
    const response = await api.post('/api/login').send({
      username: helper.userList[0].username,
      password: helper.userList[0].password,
    })
    const token = response.body.token
    const newBlog = 
      { 
        title: "Poikamiehen herkkuruoat",
        author: "Anonyymi",
        url: "https://poikamiehenherkkuruoat.tumblr.com/",
        likes: 24,
      }
    await api.post('/api/blogs')
             .send(newBlog)
             .set({ Authorization: `bearer ${token}` })
             .expect(201)
             .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.biglist.length +1)
    const addedBlog = allBlogs.pop()
    expect(addedBlog.title).toBe(newBlog.title)
  })

  test('if no likes, set to zero', async () => {
    const response = await api.post('/api/login').send({
      username: helper.userList[0].username,
      password: helper.userList[0].password,
    })
    const token = response.body.token
    const newBlog = 
    { 
      title: "Poikamiehen herkkuruoat",
      author: "Anonyymi",
      url: "https://poikamiehenherkkuruoat.tumblr.com/",
    }
    const addedBlog = await api.post('/api/blogs')
                               .send(newBlog)
                               .set({ Authorization: `bearer ${token}` })
                               .expect(201)
                               .expect('Content-Type', /application\/json/)
    expect(addedBlog.body.likes).toBe(0)
  })

  test('invalid parameters in adding a new blog', async () => {
    const response = await api.post('/api/login').send({
      username: helper.userList[0].username,
      password: helper.userList[0].password,
    })
    const token = response.body.token
    const noTitle = 
    { 
      author: "Anonyymi",
      url: "https://poikamiehenherkkuruoat.tumblr.com/",
    }
    await api.post('/api/blogs')
             .send(noTitle)
             .set({ Authorization: `bearer ${token}` })
             .expect(400)
    const noUrl = 
    {
      title: "Poikamiehen herkkuruoat",
      author: "Anonyymi"
    }
    await api.post('/api/blogs')
             .send(noUrl)
             .set({ Authorization: `bearer ${token}` })
             .expect(400)
    const noTitleAndUrl =
    {
      author: "Anonyymi",
      likes: 24
    }
    await api.post('/api/blogs')
             .send(noTitleAndUrl)
             .set({ Authorization: `bearer ${token}` })
             .expect(400)
  })

  test('no token', async () => {
    const newBlog = 
      { 
        title: "Poikamiehen herkkuruoat",
        author: "Anonyymi",
        url: "https://poikamiehenherkkuruoat.tumblr.com/",
        likes: 24,
      }
    await api.post('/api/blogs')
             .send(newBlog)
             .expect(401)
             .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.biglist.length)
  })
})

describe('deleting blogs', () => {
  test('deleting a blog, valid id', async () => {
    await api.delete('/api/blogs/5a422bc61b54a676234d17fc')
             .expect(204)
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.biglist.length - 1)
  })

  test('deleting a blog, invalid id', async () => {
    await api.delete('/api/blogs/invalidid')
             .expect(404)
    const allBlogs = await helper.blogsInDb()
    expect(allBlogs).toHaveLength(helper.biglist.length)
  })
})

describe('updating blogs', () => {
  const blog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 30
}

  test('updating a blog, valid id', async () => {
    const updatedBlog = await api.put('/api/blogs/5a422bc61b54a676234d17fc')
                                 .send(blog)
                                 .expect(200)
    expect(updatedBlog.body.likes).toBe(30)
  })

  test('updating a blog, invalid id', async () => {
    await api.put('/api/blogs/invalidid')
             .send(blog)
             .expect(404)
  })
})


afterAll(() => {
  mongoose.connection.close();
});
