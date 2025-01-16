// import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

const notification = (typeAlert, text, colorAlert) => {
  Notify.create({
    message: text,
    type: typeAlert,
    color: colorAlert
  })
}

export { notification }
