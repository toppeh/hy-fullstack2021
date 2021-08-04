/*eslint-disable */
const { TestWatcher } = require('jest');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const User = require('../models/user');
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({});
  const userPromises = helper.userList.map(user => api.post('/api/users').send(user))
  await Promise.all(userPromises)
});

describe('users in database', () => {
  test('get all users', async () => {
    const allUsers = await api.get('/api/users')
                              .expect(200)
                              .expect('Content-Type', /application\/json/)
    expect(allUsers.body).toHaveLength(helper.userList.length)
  })

  test('add an user', async () => {
    const newUser = {
      username: "pirkkaniksi23",
      name: "Heli Kopteri",
      password: "awesome_password"
    }
    const response = await api.post('/api/users')
                              .send(newUser)
                              .expect(201)
                              .expect('Content-Type', /application\/json/)
    allUsers = await helper.usersInDb()
    expect(allUsers.length).toBe(helper.userList.length + 1)
    console.log(allUsers);
    const usernames = allUsers.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  describe(' try to add an user', () => {
    test('with a non unique username', async () => {
      const user = {
        username: "Harmaakoira",
        name: "Jalo Peura",
        password: "notverysecurepassword"
      }
      const response = await api.post('/api/users')
                                .send(user)
                                .expect(400)
      expect(response.body.error).toContain('Error, expected `username` to be unique.')
    })

    test('with no password', async () =>{
      const user = {
        username: "Unique_username",
        name: "haha no"
      }
      const response = await api.post('/api/users')
                                .send(user)
                                .expect(400)
      expect(response.body.error).toContain('Password must be atleast 3 characters')
    })

    test('with a too short password', async () => {
      const user = {
        username: "Unique_username2",
        name: "haha no",
        password: "xD"
      }
      const response = await api.post('/api/users')
                                .send(user)
                                .expect(400)
      expect(response.body.error).toContain('Password must be atleast 3 characters')
    })
  })
})

afterAll(() => {
  mongoose.connection.close();
});
