import isObject from '~/helpers/isObject'

const getPrettyDuration = (duration, lang) => {
  duration =
    lang === 'is'
      ? `${duration
          .replace('mins', 'min')
          .replace('hours', 'hour')
          .replace('days', 'day')
          .replace('min', 'mín.')
          .replace('hour', 'klst.')
          .replace('day', 'dag.')} í næstu vætt`
      : `Within a ${duration} walk distance`
  return duration
}

export const isAuthorized = state => state.isAuthorized

export const unusedLocale = state =>
  state.locales.find(locale => locale !== state.locale)

export const unusedLocaleImg = (state, getters) =>
  `/icons/${getters.unusedLocale}.svg`

export const userName = state => state.userName

export const userPhone = state => state.userPhone

export const allCreatures = state =>
  Array.isArray(state.creatures)
    ? state.creatures.map(item => ({
        id: item.id,
        address: item.address,
        created: item.created,
        title: item.title,
        question: item.description,
        phone: item.phone,
        phoneLink: `tel:${item.phone.replace(/\s/g, '')}`,
        map: item.map,
        site:
          typeof item.site === 'string' && item.site.startsWith('http')
            ? item.site
            : `//${item.site}`,
        img: item.image,
        duration:
          state.durations[item.id] &&
          getPrettyDuration(state.durations[item.id].text, state.locale),
        durationValue:
          state.durations[item.id] && state.durations[item.id].value,
        position: {
          lat: item.lat,
          lng: item.lon
        },
        key: item.key,
        isChecked: isObject(state.answeredItems) && state.answeredItems[item.id]
      }))
    : []

export const creatures = (state, getters) =>
  getters.allCreatures.sort((p, n) => p.durationValue - n.durationValue)

export const questionsLength = () => 4

export const answersLength = state =>
  state.isAuthorized && isObject(state.answeredItems)
    ? Object.keys(state.answeredItems).length
    : 0

export const activeCreature = (state, getters) =>
  (Array.isArray(getters.creatures) &&
    state.activeCreatureId &&
    getters.creatures.find(item => state.activeCreatureId === item.id)) ||
  {}
