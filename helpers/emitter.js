const events = {}

export default {
  on: (eventName, cb) => {
    if (events[eventName]) events[eventName].push(cb)
    else events[eventName] = [cb]
  },
  emit: (eventName, ...other) =>
    events[eventName] && events[eventName].forEach(cb => cb(...other))
}
