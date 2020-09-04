import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "edit_blogpost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    case "delete_blogpost":
      return state.filter((blogPost) => blogPost.id !== action.payload);

    // case "add_blogpost":
    //   return [
    //     ...state,
    //     {
    //       id: Math.floor(Math.random() * 99999),
    //       name: action.payload.name,
    //       description: action.payload.description,
    //     },
    //   ];
    default:
      return state;
  }
};

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");
    dispatch({ type: "get_blogposts", payload: response.data });
    // response.data === [{}, {}, {}]
  };
};

const addBlogPost = (dispatch) => {
  return async (name, description, callback) => {
    await jsonServer.post("/blogposts", { name, description });
    // dispatch({ type: "add_blogpost", payload: { name, description } });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return async (id, name, description, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { name, description });
    dispatch({ type: "edit_blogpost", payload: { id, name, description } });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  {
    addBlogPost,
    deleteBlogPost,
    editBlogPost,
    getBlogPosts,
  },
  []
);
