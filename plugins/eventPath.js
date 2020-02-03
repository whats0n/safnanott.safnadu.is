/**
 * MouseEvent path property polyfill
 */
export function MouseEventPathPolyfill() {
  if (!('path' in Event.prototype)) {
    Object.defineProperty(Event.prototype, 'path', {
      get: function() {
        const path = []
        let currentElem = this.target
        while (currentElem) {
          path.push(currentElem)
          currentElem = currentElem.parentElement
        }
        if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
          path.push(document)
        if (path.indexOf(window) === -1) path.push(window)
        return path
      }
    })
  }
}

/**
 * returns the event’s path which is an array of the objects on which listeners will be invoked
 * @param e - MouseEvent
 * @returns {Array|EventTarget[]|*}
 */
export function eventPath(e) {
  if ('composedPath' in e) return e.composedPath()
  if ('path' in e) return e.path
  //polyfill
  const path = []
  let currentElem = e.target
  while (currentElem) {
    path.push(currentElem)
    currentElem = currentElem.parentElement
  }
  if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
    path.push(document)
  if (path.indexOf(window) === -1) path.push(window)
  return path
}
