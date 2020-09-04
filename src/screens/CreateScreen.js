import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen = ({ navigation }) => {
  const { addBlogPost } = useContext(Context);
  return (
    <BlogPostForm
      onSubmit={(name, description) => {
        addBlogPost(name, description, () => navigation.navigate("Index"));
      }}
    />
  );
};

export default CreateScreen;
