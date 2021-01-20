const formatValue = (value) => {
  return new Intl.NumberFormat([], { style: 'currency', currency: 'BRL' }).format(value)

}

export default formatValue