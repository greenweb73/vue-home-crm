import firebase from 'firebase/app'

export default {
  actions: {
    async fetchCategories ({ commit, dispatch }) {
      try {
        // Получаем ID пользователя
        const uid = await dispatch('getUid')
        // Получаем из БД категории пользователя
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        // Вариант 1
        // const cats = []
        // Object.keys(categories).forEach(key => {
        //  cats.push({
        //    title: categories[key].title,
        //    limit: categories[key].limit,
        //    id: key
        //  })
        // })
        // return cats
        // Вариант 2
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e) // Дергаем мутейшн setError для вывода ошибки
        throw e
      }
    },
    async fetchCategoryById ({ commit, dispatch }, id) {
      try {
        // Получаем ID пользователя
        const uid = await dispatch('getUid')
        // Получаем из БД категории пользователя
        const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {}
        return { ...category, id }
      } catch (e) {
        commit('setError', e) // Дергаем мутейшн setError для вывода ошибки
        throw e
      }
    },
    async updateCategory ({ commit, dispatch }, { title, limit, id }) {
      try { // Оборачиваем асинхронный запрос в try catch для отлавливания ошибок
        // Получаем ID пользователя
        const uid = await dispatch('getUid')
        // Завписывааем в БД данные пользователя
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit })
      } catch (e) {
        commit('setError', e) // Дергаем мутейшн setError для вывода ошибки
        throw e
      }
    },
    async createCategory ({ commit, dispatch }, { title, limit }) {
      try { // Оборачиваем асинхронный запрос в try catch для отлавливания ошибок
        // Получаем ID пользователя
        const uid = await dispatch('getUid')
        // Завписывааем в БД данные пользователя
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
        return { title, limit, id: category.key }
      } catch (e) {
        commit('setError', e) // Дергаем мутейшн setError для вывода ошибки
        throw e
      }
    }
  }
}
