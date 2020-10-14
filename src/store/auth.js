import firebase from 'firebase/app'

export default {
  actions: {
    async login ({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        // commit - позволяет изменять state
        commit('setError', e)
        throw e
      }
    },
    async register ({ dispatch, commit }, { email, password, name }) {
      try {
        // Создаем пользователя
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        // Получаем ID пользователя
        const uid = await dispatch('getUid')
        // Завписывааем в БД данные пользователя
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 100000,
          name
        })
      } catch (e) {
        // commit - позволяет изменять state
        commit('setError', e)
        throw e
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  }
}
