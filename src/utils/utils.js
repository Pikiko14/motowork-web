export const getResolutionWidth = () => {
  const ancho =
    window.innerWidth || document.documentElement.clientWidth || screen.width

  return ancho
}

export const formatPrice = (price) => {
  // Convertir el valor en un número si es necesario
  const number = Number(price)
  if (isNaN(number)) {
    throw new Error('El valor proporcionado no es un número válido.')
  }

  // Formatear el número con separadores de miles (')
  const formatter = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  const formattedNumber = formatter.format(number).replace(/\./g, "'")

  // Agregar el símbolo de moneda
  return `$ ${formattedNumber}`
}
