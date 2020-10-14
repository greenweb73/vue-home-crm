// Подключаем firebase так как будем делать здесь запрос к БД
import firebase from 'firebase/app'
export default {
  actions: {
    async createRecord ({ dispatch, commit }, record) {
      try {
        // Так как данная запись относится к конкретному пользователю - получаем его Id
        const uid = await dispatch('getUid')
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecords ({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        // Получаем из БД категории пользователя
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}
        return Object.keys(records).map(key => ({ ...records[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecordById ({ dispatch, commit }, id) {
      try {
        const uid = await dispatch('getUid')
        // Получаем из БД категории пользователя
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}
        return { ...record, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
