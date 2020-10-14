<template>
  <div>
    <div class="page-title">
      <h3>{{'Categories' | localize}}</h3>
    </div>
    <section>
      <Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>
        <!-- с помощью :key мы можем форсированно перерисовывать компонент -->
        <CategoryEdit
          v-if="categories.length"
          @updated="updateCategories"
          :key="categories.length + updateCount"
          :categories="categories"
        />
        <p
          v-else
          class="center">Категорий пока нет</p>
      </div>
    </section>
  </div>
</template>
<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  metaInfo () {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    console.log(this.categories)
    this.loading = false
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
      // console.log(this.categories)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  }

}
</script>
