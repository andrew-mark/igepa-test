export default ({ app, store }) => {
  if (process.client) {
    require('event-source-polyfill')
  }
}