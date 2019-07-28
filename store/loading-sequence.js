export const actions = {
  endLoading({ commit }) {
    commit('END_LOADING')
  },
  startCardTransitions({ commit }) {
    commit('START_CARD_TRANSITIONS')
  },
  animationFinished({ commit }) {
    commit('ANIMATION_FINISHED')
  },
  animationStarted({ commit }) {
    commit('ANIMATION_STARTED')
  }
}

export const mutations = {
  END_LOADING(state) {
    state.loading = false
  },
  ANIMATION_FINISHED(state) {
    state.animationFinished = true
  },
  ANIMATION_STARTED(state) {
    state.animationStarted = true
  },
  START_CARD_TRANSITIONS(state) {
    state.startCardTransitions = true
  }
}

export const state = () => ({
  animationStarted: false,
  animationFinished: false,
  loading: true,
  startCardTransitions: false
})

