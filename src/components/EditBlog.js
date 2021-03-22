import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const EditBlog = () => {
  const history = useHistory();
  const { id } = useParams();
  const [data, isPending, error] = useFetch(
    `http://localhost:8000/blogs/${id}`
  );
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setIsProcessing(true);

    fetch("http://localhost:8000/blogs/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      setIsProcessing(false);
      console.log("blog updated");
      history.push("/blog/" + id);
    });
  };

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setAuthor(data.author);
      setBody(data.body);
    }
  }, [data]);

  return (
    <div className="create">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {data && (
        <>
          <h2>Edit blog</h2>
          <form onSubmit={handleSubmit}>
            <label>Blog title: </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Author: </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <label>Blog content: </label>
            <textarea
              required
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button type="submit" disabled={isProcessing}>
              {isProcessing ? "Updating..." : "Edit blog"}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default EditBlog;
