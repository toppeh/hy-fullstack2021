/*eslint-disable */
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const helper = require('./test_helper');

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.biglist);
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

test('adding a new blog', async () => {
  const newBlog = 
    { 
      title: "Poikamiehen herkkuruoat",
      author: "Anonyymi",
      url: "https://poikamiehenherkkuruoat.tumblr.com/",
      likes: 24,
    }
  await api.post('/api/blogs')
           .send(newBlog)
           .expect(201)
           .expect('Content-Type', /application\/json/)

  const allBlogs = await helper.blogsInDb()
  expect(allBlogs).toHaveLength(helper.biglist.length +1)
  const addedBlog = allBlogs.pop()
  expect(addedBlog.title).toBe(newBlog.title)
})

test('if no likes, set to zero', async () => {
  const newBlog = 
  { 
    title: "Poikamiehen herkkuruoat",
    author: "Anonyymi",
    url: "https://poikamiehenherkkuruoat.tumblr.com/",
  }
  const response = await api.post('/api/blogs')
                             .send(newBlog)
                             .expect(201)
                             .expect('Content-Type', /application\/json/)
  expect(response.body.likes).toBe(0)
})

test.only('invalid parameters in adding a new blog', async () => {
  const noTitle = 
  { 
    author: "Anonyymi",
    url: "https://poikamiehenherkkuruoat.tumblr.com/",
  }
  await api.post('/api/blogs')
           .send(noTitle)
           .expect(400)
  const noUrl = 
  {
    title: "Poikamiehen herkkuruoat",
    author: "Anonyymi"
  }
  await api.post('/api/blogs')
           .send(noTitle)
           .expect(400)
  const noTitleAndUrl =
  {
    author: "Anonyymi",
    likes: 24
  }
  await api.post('/api/blogs')
           .send(noTitleAndUrl)
           .expect(400)
})

afterAll(() => {
  mongoose.connection.close();
});
