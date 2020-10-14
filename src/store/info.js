// Подключаем firebase так как будем делать здесь запрос к БД
import firebase from 'firebase/app'
export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo (state, info) {
      state.info = info
    },
    clearInfo (state) {
      state.info = {}
    }
  },
  actions: {
    // метод из action для обновления данных пользовтеля из БД
    async updateinfo ({ dispatch, commit, getters }, toUpdate) {
      try {
        // вызываем с помощью dispatch ( т.к. getUid это метод прописаный в action) метод getUid для получения uid текущего пользователя
        const uid = await dispatch('getUid')
        const updateData = { ...getters.info, ...toUpdate }
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // метод из action для получения данных пользовтеля из БД и вызова мутации для изменения состояния info
    async fetchInfo ({ dispatch, commit }) {
      try {
        // вызываем с помощью dispatch ( т.к. getUid это метод прописаный в action) метод getUid для получения uid текущего пользователя
        const uid = await dispatch('getUid')
        // Получаем данные с сервера текущего пользователя
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        commit('setInfo', info)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: s => s.info
  }
}
