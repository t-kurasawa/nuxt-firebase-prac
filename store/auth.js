export const state = () => ({
    user: null
})
 
export const mutations = {
    setUser(state, value) {
        state.user = value
    }
}

export const actions = {
    commitUser(context, value) {
        context.commit('setUser', value)
    }
}