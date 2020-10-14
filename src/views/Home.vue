<template>
  <div>
    <div class="page-title">
      <h3>{{'Bill' | localize}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <Loader v-if="loading"/>
    <div v-else class="row">
      <HomeBill
        :rates="currency.rates"
      />
      <HomeCurrency
        :rates="currency.rates"
        :date="currency.date"
      />
    </div>
  </div>
</template>
<script>

import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'
export default {
  metaInfo () {
    return {
      title: this.$title('Menu_Bill')
    }
  },
  name: 'home',
  data: () => ({
    loading: true,
    currency: null
  }),
  methods: {
    async refresh () {
      this.loading = true // Запускаем прелоадер
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  },
  async mounted () {
    this.currency = await this.$store.dispatch('fetchCurrency')
    console.log(this.currency)
    this.loading = false
  },
  components: {
    HomeBill, HomeCurrency
  }
}
</script>
