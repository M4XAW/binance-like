import { useState, useEffect } from "react";
import PostForm from "./PostForm";

export default function Post({
  post,
  updatePost,
  deletePost,
  likePost,
  currentUser,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const userLikes = JSON.parse(localStorage.getItem("userLikes")) || {};
    setIsLiked(userLikes[currentUser]?.includes(post.id));
  }, [currentUser, post.id]);

  const handleLike = () => {
    likePost(post.id);
    setIsLiked(!isLiked);
  };

  const handleDelete = () => {
    deletePost(post.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (updatedPost) => {
    updatePost(updatedPost);
    setIsEditing(false);
  };

  const isAuthor = post.author === currentUser;

  return (
    <div className="p-4 mb-4 border rounded shadow">
      {isEditing ? (
        <PostForm
          post={post}
          updatePost={handleUpdate}
          cryptoName={post.cryptoName}
        />
      ) : (
        <>
          <h3 className="text-xl font-bold mb-2">{post.title}</h3>
          <p className="mb-2">{post.content}</p>
          <p className="text-sm text-gray-500 mb-2">
            Date: {new Date(post.date).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mb-2">Likes: {post.likes}</p>
          <div className="flex space-x-2">
            <button onClick={handleLike} className="text-red-500">
              {isLiked ? "❤" : "🤍"}
            </button>
            {isAuthor && (
              <>
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-yellow-500 text-white rounded"
                >
                  Modifier
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Supprimer
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
