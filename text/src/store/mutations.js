const state = {
    breadcrumb: String
};

const mutations = {
    updateBreadcrumb (state, breadcrumb) {
        state.breadcrumb = breadcrumb;
    }
};

const getters = {
    breadcrumb (state) {
        return state.breadcrumb;
    }
};

export default {
    state, mutations, getters
};
