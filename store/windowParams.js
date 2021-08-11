export const state = () => ({
  width: null,
  height: null,
});

export const mutations = {
  SET_PARAMS(state, params) {
    state.width = params.width;
    state.height = params.height;
  },
};

export const actions = {
  updateParams({ commit }, params) {
    commit("SET_PARAMS", params);
  },
};

export const getters = {};
