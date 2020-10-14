import localizeFilter from '@/filters/localize.filter'
export default {
  bind (el, { value, modifiers }) {
    window.M.Tooltip.init(el, {
      html: modifiers.noloc ? value : localizeFilter(value)
    })
  },
  unbind (el) { // Аналог destroyed
    const tooltip = window.M.Tooltip.getInstance(el)
    if (tooltip && tooltip.destroy) {
      tooltip.destroy()
    }
  }
}
