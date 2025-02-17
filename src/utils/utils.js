export const getResolutionWidth = () => {
  const ancho =
    window.innerWidth || document.documentElement.clientWidth || screen.width

  return ancho
}

export const formatPrice = (price) => {
  // Convertir el valor en un número si es necesario
  const number = Number(price)

  // Formatear el número con separadores de miles (')
  const formatter = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  const formattedNumber = formatter.format(number).replace(/\./g, "'")

  // Agregar el símbolo de moneda
  return `$ ${formattedNumber}`
}

export const getUrlParams = (query, param) => {
  const params = new URLSearchParams(query)
  const paramGetter = params.get(param)
  return paramGetter
}

export const formatDateIso = (isoDate) => {
  const date = new Date(isoDate)
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const formattedDate = date.toLocaleDateString('es-ES', options)
  const dateSplit = formattedDate.split(' ')
  return `${dateSplit[2] ? dateSplit[2].toUpperCase() : ''} ${dateSplit[0] ? dateSplit[0] : ''}, ${dateSplit[4]}`
}
