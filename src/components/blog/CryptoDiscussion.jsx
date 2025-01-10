import { useState, useEffect } from "react";
import Post from "./Post";
import PostForm from "./PostForm";

export default function CryptoDiscussion({ cryptoName }) {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  const currentUser = localStorage.getItem("userLogin"); // Récupérez le nom d'utilisateur depuis localStorage
  const storedPosts = JSON.parse(localStorage.getItem("allPosts"));
  useEffect(() => {
    setPosts(storedPosts.filter((post) => post.cryptoName === cryptoName));
  }, [cryptoName]);

  useEffect(() => {
    localStorage.setItem("allPosts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (post) => {
    const allPosts = JSON.parse(localStorage.getItem("allPosts"));
    setPosts([...allPosts, post]);
  };

  const updatePost = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  const deletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const likePost = (postId) => {
    const userLikes = JSON.parse(localStorage.getItem("userLikes"));

    const postIndex = posts.findIndex((post) => post.id === postId);
    const post = posts[postIndex];

    if (!userLikes[currentUser]?.includes(postId)) {
      setPosts([
        ...posts.slice(0, postIndex),
        { ...post, likes: post.likes + 1 },
        ...posts.slice(postIndex + 1),
      ]);
      userLikes[currentUser] = userLikes[currentUser] || [];
      userLikes[currentUser].push(postId);
      localStorage.setItem("userLikes", JSON.stringify(userLikes));
    } else {
      setPosts([
        ...posts.slice(0, postIndex),
        { ...post, likes: post.likes - 1 },
        ...posts.slice(postIndex + 1),
      ]);
      userLikes[currentUser] = userLikes[currentUser].filter(
        (id) => id !== postId
      );
      localStorage.setItem("userLikes", JSON.stringify(userLikes));
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "likes") {
      return b.likes - a.likes;
    }
    return 0;
  });

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Discussion</h2>
      <PostForm
        addPost={addPost}
        cryptoName={cryptoName}
        currentUser={currentUser}
      />
      <div className="flex mb-4">
        <button
          onClick={() => setSortBy("date")}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Trier par date
        </button>
        <button
          onClick={() => setSortBy("likes")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Trier par pertinence
        </button>
      </div>
      {sortedPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
          updatePost={updatePost}
          deletePost={deletePost}
          likePost={likePost}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
