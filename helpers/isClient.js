export default cb => ({
  state: process.browser,
  result: process.browser && typeof cb === 'function' && cb()
})
