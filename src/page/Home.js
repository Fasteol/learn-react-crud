import { useState } from "react";
import BlogList from "../component/BlogList";
import useFetch from "../useFetch";

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
    reFetch,
  } = useFetch("http://localhost:8000/blogs");

  const [toast, isToast] = useState(false);

  const handleDelete = (id) => {
    fetch("http://localhost:8000/blogs/" + id, {
      method: "DELETE",
    }).then(() => {
      isToast(true);
      reFetch();
      console.log("Delete succesed");
      setTimeout(() => {
        isToast(false);
      }, 1000);
    });
  };
  return (
    <div>
      {blogs && (
        <BlogList blogs={blogs} title="All Blogs!" onDelete={handleDelete} />
      )}
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span className="text-[#ddd]">Delete Success</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
