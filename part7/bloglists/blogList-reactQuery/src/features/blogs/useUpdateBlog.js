import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogKeys from "./blogKeys";
import blogService from '../../services/blogs';


const useUpdateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:async ({ id, blogObj }) => {
            const res = await blogService.updateBlog(id, blogObj);
            return res;
        },  
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: blogKeys.all });
        },
    });
};

export default useUpdateBlog;
