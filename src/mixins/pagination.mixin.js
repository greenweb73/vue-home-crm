import _ from 'lodash'

export default {
  data () {
    return {
      page: +this.$route.query.page || 1, // Получаем содержимое query параметра page (приводим его к числу через +) или по дефолту присваиваем 1
      pageSize: 5, // Кол-во эл-тов на странице
      pageCount: 0, // Всего страниц
      allItems: [], // Массив со всеми записями
      items: [] // Массив для записей конкретной страницы
    }
  },
  methods: {
    setupPagination (allItems) {
      this.allItems = _.chunk(allItems, this.pageSize) // Разбиваем Массив со всеми записями на части(подмассивы) по pageSize эл-тов в каждом
      this.pageCount = _.size(this.allItems) // Узнаем и получаем кол-во полученных частей(страниц) после предыдущей разбивки
      this.items = this.allItems[this.page - 1] || this.allItems[0] // Заносим подмассив эквивалентный нужной странице в this.items
    },
    pageChangeHandler (page) {
      this.$router.push(`${this.$route.path}?page=${page}`) // Передаем query параметр в адресную строку без перезагрузки страницы
      this.items = this.allItems[page - 1] || this.allItems[0]
    }
  }
}
