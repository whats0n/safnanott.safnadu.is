import axios from 'axios'

const api = axios.create({
  baseURL: 'https://safnadu.is/api/safnanott',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

export const login = data =>
  new Promise((resolve, reject) => {
    api
      .post('user', data)
      .then(({ data } = {}) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })

export const saveAnswer = data =>
  new Promise((resolve, reject) => {
    api
      .post('save', data)
      .then(({ data } = {}) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })

export const getData = data =>
  new Promise((resolve, reject) => {
    api
      .get('index', data)
      .then(({ data } = {}) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })

export const getAnswers = data =>
  new Promise((resolve, reject) => {
    api
      .post('answers', data)
      .then(({ data } = {}) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })

export const saveCode = data =>
  new Promise((resolve, reject) => {
    api
      .post('save-qr', data)
      .then(({ data } = {}) => {
        resolve(data)
      })
      .catch(error => {
        reject(error)
      })
  })
