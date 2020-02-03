import { login, getAnswers, saveAnswer, saveCode } from '~/helpers/requests'

export const authRequest = ({ commit }, data) =>
  new Promise((resolve, reject) => {
    login(data)
      .then(response => {
        resolve(response['access-token'])
      })
      .catch(err => {
        commit('authError')
        reject(err)
      })
  })

export const requestAnswers = ({ commit, state }) =>
  new Promise((resolve, reject) => {
    getAnswers({
      token: state.accessToken
    })
      .then(response => {
        commit('setAnswers', response)
        resolve()
      })
      .catch(err => reject(err))
  })

export const sendAnswer = ({ state }, data) =>
  new Promise((resolve, reject) =>
    saveAnswer({
      token: state.accessToken,
      ...data
    })
      .then(response => {
        console.log(response)
        resolve()
      })
      .catch(err => {
        reject(err)
      })
  )

export const sendCode = ({ state }, data) => {
  data.append('user', state.accessToken)
  new Promise((resolve, reject) =>
    saveCode(data)
      .then(response => resolve(response))
      .catch(err => reject(err))
  )
}
