import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogKeys from "./blogKeys";
import blogService from '../../services/blogs';

const useDeleteBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: blogService.deleteBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: blogKeys.all });
        },
    });
}

export default useDeleteBlog;
