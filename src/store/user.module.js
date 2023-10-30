import { users } from "@/data";

const posts = users.reduce((posts, user) => {
  if (user.posts) {
    return posts.concat(user.posts);
  }
  return posts;
}, []);

export default {
  namespace: true,
  state: {
    users: [...users],
    feed: [...posts],
  },
  getters: {
    getAllPosts: function (state) {
      return state.feed;
    },
    getAllUsers: function (state) {
      return state.users;
    },
  },
  mutations: {
    ADD_POST(state, post) {
      state.feed.unshift(post);
    },
    DELETE_POST(state, id) {
      state.feed = state.feed.filter((post) => post.id !== id);
    },
    EDIT_POST(state, id, newText) {
      const post = state.feed.find((post) => post.id === id);
      post.texto = newText;
    },
    DELETE_ALL_POSTS(state) {
      state.feed = [];
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    FILTER_USERS_LIST(state, search) {
      state.users = state.users.filter((user) =>
        user.username.toLowerCase().startsWith(search.toLowerCase())
      );
    },
  },
  actions: {
    post(context, post) {
      context.commit("ADD_POST", post);
    },
    delete(context, id) {
      context.commit("DELETE_POST", id);
    },
    editar(context, id, changes) {
      context.commit("EDIT_POST", id, changes);
    },
    deleteAllPosts(context) {
      context.commit("DELETE_ALL_POSTS");
    },
    filtrar(context, search) {
      context.commit("FILTER_USERS_LIST", search);
    },
    setUser(context, user) {
      context.commit("ADD_USER", user);
    },
  },
};