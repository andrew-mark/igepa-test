import './grid-overlay.scss'

const NAME = 'dev-GridOverlay'
const CLASS = `-${NAME}`
// const DATA_KEY = NAME

const ClassName = {
  ROOT: CLASS,
  WRAPPER: `${CLASS}-wrapper container`,
  CONTAINER: `${CLASS}-container columns`,
  CELL: `column col-1 ${CLASS}-cell`
}

const Selector = {
  ROOT: `.${ClassName.ROOT}`,
  BODY: 'body'
}

const Event = {
  KEYPRESS: 'keypress'
}

const TEMPLATE = `
<div class="${ClassName.WRAPPER}">
  <div class="${ClassName.CONTAINER}">
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
    <div class="${ClassName.CELL}"></div>
  </div>
</div>`

export default function(key = 'G', spoken = 'SHIFT+G') {
  window.addEventListener(Event.KEYPRESS, evt => {
    if (evt.key === key) {
      const overlayElem = document.querySelector(Selector.ROOT)
      if (overlayElem) {
        overlayElem.remove()
      } else {
        const rootElem = document.createElement('div')
        rootElem.classList.add(ClassName.ROOT)
        rootElem.innerHTML = TEMPLATE
        document.body.appendChild(rootElem)
      }
    }
  })
  // console.info(`💡 Press ${spoken} to show grid overlay.`)
}
