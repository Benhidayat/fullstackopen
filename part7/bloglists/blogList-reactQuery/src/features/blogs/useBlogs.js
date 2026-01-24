import { useQuery } from "@tanstack/react-query";
import blogKeys from './blogKeys';
import blogService from '../../services/blogs';

const useBlogs = () => {
    return useQuery({
        queryKey: blogKeys.all,
        queryFn: blogService.getAll
    });
};

export default useBlogs;
