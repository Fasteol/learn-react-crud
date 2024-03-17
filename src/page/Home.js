import { useState } from "react";
import BlogList from "../component/BlogList";
import useFetch from "../useFetch";
import axios from "axios";

const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
    reFetch,
  } = useFetch("https://vast-tan-capybara-boot.cyclic.app/blogs");

  const [toast, isToast] = useState(false);

  const handleDelete = (id) => {
    const token = localStorage.getItem("token"); // Ambil token dari localStorage
    const headers = {
      Authorization: `Bearer ${token}`, // Tambahkan token ke header Authorization
    };

    axios
      .delete(`https://vast-tan-capybara-boot.cyclic.app/blogs/${id}`, {
        headers: headers, // Gunakan header yang ditentukan
      })
      .then(() => {
        isToast(true);
        reFetch();
        console.log("Delete success");
        setTimeout(() => {
          isToast(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  return (
    <div className="relative">
      {isPending && (
        <div className=" inset-0 flex justify-center items-center z-50 min-h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
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
      {error && <div>Error bang....</div>}
    </div>
  );
};

export default Home;
