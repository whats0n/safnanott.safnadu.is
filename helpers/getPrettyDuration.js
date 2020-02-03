const getHours = time => {
  time = `${(time / 60).toFixed(2)}`
  time = time.split('.')
  const hr = time[0]
  const min = (time[1] * 0.6).toFixed(0)
  const postfix = hr > 1 ? 'hrs' : 'hr'
  return `${hr}.${min} ${postfix}`
}

const getMinutes = time => {
  const min = `${(time / 60).toFixed(0)}`
  return `${min} min`
}

export default duration =>
  `${duration >= 60 ? getHours(duration) : getMinutes(duration)} walk`
