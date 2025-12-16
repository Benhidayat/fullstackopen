import Blog from "./Blog";

const BlogList = ({ blogs, updateBlog }) => {
    return (
        <>
            {blogs.sort((a, b) => a.likes < b.likes ? -1 : 1 ).map(blog => {
                return <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
            })}
        </>
    )

};

export default BlogList;
