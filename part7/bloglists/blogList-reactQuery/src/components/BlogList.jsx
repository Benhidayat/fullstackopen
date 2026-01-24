import Blog from "./Blog";
import useBlogs from "../features/blogs/useBlogs";

const BlogList = ({ updateBlog, removeBlog }) => {
    const { data, isLoading } = useBlogs()

    if (isLoading) {
        return <div>loading data...</div>
    }

    const blogs = data;
    
    return (
        <>
            {[...blogs].sort((a,b) => a.likes < b.likes ? -1 : 1 ).map(blog => {
                return <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
            })}
        </>
    )
};

export default BlogList;