import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [toast, isToast] = useState(false);
  const [title, isTitle] = useState("");
  const [body, isBody] = useState("");
  const [author, isAuthor] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetch(`http://localhost:8000/blogs/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        isTitle(data.title);
        isBody(data.body);
        isAuthor(data.author);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        }
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    setIsPending(true);

    fetch("http://localhost:8000/blogs/" + id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    })
      .then(() => {
        isToast(true);
      })
      .then(() => {
        setTimeout(() => {
          console.log("new blog added");
          setIsPending(false);
          history.push("/");
        }, 1000);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#ddd] text-center mt-10">
        Edit Blog
      </h2>
      {toast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span className="text-[#ddd]">Edit Success</span>
          </div>
        </div>
      )}
      <div className="flex justify-center items-center mt-6">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body lg:w-[60vw] w-[80vw]">
            <form onSubmit={handleSubmit}>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={title}
                  onChange={(e) => isTitle(e.target.value)}
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Title
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <textarea
                  className="block p-20 pt-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={body}
                  onChange={(e) => isBody(e.target.value)}
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Blog Content
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={author}
                  onChange={(e) => isAuthor(e.target.value)}
                  required
                />
                <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Name Author
                </label>
              </div>
              {!isPending && (
                <button
                  type="submit"
                  className="text-white dark:bg-[#f1356d] dark:hover:bg-[#a4244b] dark:focus:[#f1356d] focus:ring-4 focus:outline-none focus:ring-[#f1356d] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              )}
              {isPending && (
                <button
                  type="submit"
                  className="text-white dark:bg-[#f1356d] dark:hover:bg-[#a4244b] dark:focus:[#f1356d] focus:ring-4 focus:outline-none focus:ring-[#f1356d] font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  Submiting...
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
