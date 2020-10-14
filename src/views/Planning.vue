<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <!-- Выводим состояние поля bill и пропускаем его через фильтр currency -->
      <h4>{{info.bill | currency('UAH')}}</h4>
    </div>
    <Loader v-if="loading"/>
    <p class="center" v-else-if="!categories.length">Категорий пока нет <router-link to="/categories">Добавить новую категорию</router-link></p>
    <section v-else>
      <div v-for="cat in categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{cat.spend | currency}} из {{cat.limit | currency}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
            class="determinate" :class="[cat.progressColor]"
            :style="{width: cat.progressPersent + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currency.filter' // Импортируем фильтер валюты
export default {
  name: 'planning',
  metaInfo () {
    return {
      title: this.$title('Menu_Planning')
    }
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  async mounted () {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')
    // console.log(records)
    // console.log(categories)
    // debugger
    this.categories = categories.map(cat => {
      const spend = records
        .filter(r => r.categoryId === cat.id) // Вначале фильтруем записи по нужной категории
        .filter(r => r.type === 'outcome') // затем полученные записи фильтруем по типу записи 'outcome' - расход
        .reduce((total, record) => { // затем с помощью reduce аккомулируем (суммируем) все значения поля amount каждой записи
          total += +record.amount
          return total // и возвращаем результат в константу spend
        }, 0)
      const persent = 100 * spend / cat.limit
      const progressPersent = persent > 100 ? 100 : persent
      const progressColor = persent < 60
        ? 'green'
        : persent < 100
          ? 'yellow'
          : 'red'
      const tooltipValue = cat.limit - spend
      const tooltip = `${tooltipValue < 0 ? 'Превышение на ' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...cat,
        progressPersent,
        progressColor,
        spend,
        tooltip
      }
    })
    this.loading = false
  }
}
</script>
