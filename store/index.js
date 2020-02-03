import isClient from '~/helpers/isClient'

export const state = () => ({
  isLoading: true,
  locales: ['is'],
  locale: 'is',
  hasSavedLocale: false,
  userName: '',
  userPhone: '',
  isAuthorized: false,
  accessToken: null,
  activeCreatureId: null,
  creatureInProcessing: null,
  creatures: [],
  durations: {},
  answeredItems: null
})

export const getters = require('./getters')
export const actions = require('./actions')

export const mutations = {
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setLang(state, locale) {
    if (state.locales.includes(locale)) {
      isClient(() => localStorage.setItem('locale', locale))
      state.locale = locale
    }
  },
  setDurations(state, durations) {
    state.durations = durations
  },
  setCreatures(state, creatures) {
    state.creatures = creatures
  },
  setActiveCreatureId(state, id) {
    state.activeCreatureId = id
  },
  setProcessingCreature(state, id) {
    state.creatureInProcessing = id
  },
  setAnswers(state, data) {
    state.answeredItems = data.reduce((accum, item) => {
      accum[item.question_id] = {
        id: item.id,
        created: item.created,
        text: item.answer
      }

      return accum
    }, {})
  },
  localeCheck(state, callback) {
    const savedLocale = localStorage.getItem('locale')
    if (!savedLocale) return
    state.hasSavedLocale = !!savedLocale
    state.savedLocale = savedLocale
    state.locale = savedLocale
    callback()
  },
  authCheck(state) {
    const accessToken = localStorage.getItem('accessToken')
    state.accessToken = accessToken
    state.isAuthorized = !!accessToken
    state.userName = localStorage.getItem('name')
    state.userPhone = localStorage.getItem('phone')
  },
  authSuccess(state, { token, name, phone }) {
    state.accessToken = token
    state.isAuthorized = true
    state.userName = name
    state.userPhone = phone
    localStorage.setItem('accessToken', token)
    localStorage.setItem('name', name)
    localStorage.setItem('phone', phone)
  },
  authError(state) {
    state.accessToken = null
    state.isAuthorized = false
    state.userName = ''
    state.userPhone = ''
    localStorage.removeItem('accessToken')
    localStorage.removeItem('name')
    localStorage.removeItem('phone')
  },
  authReset(state) {
    state.accessToken = null
    state.isAuthorized = false
    state.answeredItems = null
    state.userName = ''
    state.userPhone = ''
    localStorage.removeItem('accessToken')
    localStorage.removeItem('name')
    localStorage.removeItem('phone')
  }
}
