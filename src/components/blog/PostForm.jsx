import { useState, useEffect } from "react";

export default function PostForm({ addPost, post, updatePost, cryptoName }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: post ? post.id : Date.now(),
      title,
      content,
      date: new Date().toISOString(),
      likes: post ? post.likes : 0,
      cryptoName: cryptoName,
      author: localStorage.getItem("userLogin"),
    };
    if (post) {
      updatePost(newPost);
    } else {
      addPost(newPost);
    }
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
        required
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenu"
        required
        className="w-full p-2 mb-2 border rounded"
      ></textarea>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        {post ? "Mettre à jour" : "Publier"}
      </button>
    </form>
  );
}
