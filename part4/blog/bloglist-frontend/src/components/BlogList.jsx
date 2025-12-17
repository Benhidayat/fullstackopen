import Blog from "./Blog";

const BlogList = ({ blogs, updateBlog, removeBlog }) => {
    return (
        <>
            {blogs.sort((a, b) => a.likes < b.likes ? -1 : 1 ).map(blog => {
                return <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
            })}
        </>
    )

};

export default BlogList;
