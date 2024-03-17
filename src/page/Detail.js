import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const Detail = () => {
  const { id } = useParams();
  const {
    data: blog,
    isPending,
    error,
  } = useFetch("http://localhost:8000/blogs/" + id);
  return (
    <div>
      {blog && (
        <main className="pt-8 pb-16 lg:pt-16 lg:pb-24  antialiased">
          <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
            <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
              <header className="mb-4 lg:mb-6 not-format">
                <h1 className="mb-4 text-3xl font-extrabold leading-tight text-[#f1356d] lg:mb-6 lg:text-4xl ">
                  {blog.title}
                </h1>
                <div>
                  <a
                    href="#"
                    rel="author"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {blog.author}
                  </a>
                </div>
              </header>
              <p className="lead">{blog.body}</p>
            </article>
          </div>
        </main>
      )}
    </div>
  );
};

export default Detail;
