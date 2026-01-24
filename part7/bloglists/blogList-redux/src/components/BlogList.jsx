import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = () => {

    const blogs = useSelector(state => state.blogs);
    
    return (
        <>
            {[...blogs].sort((a,b) => a.likes < b.likes ? -1 : 1 ).map(blog => {
                return <Blog key={blog.id} blog={blog} />
            })}
        </>
    )
};

export default BlogList;