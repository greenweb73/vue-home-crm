export default function currencyFilter (value, currency = 'UAH') {
  return Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency
  }).format(value)
}
