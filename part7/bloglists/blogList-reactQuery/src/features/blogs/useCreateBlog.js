import { useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from '../../services/blogs';
import blogKeys from "./blogKeys";

const useCreateBlog = ()=> {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async ({title, author, url}) => {
            const res = await blogService.create({ title, author, url });
            return res;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: blogKeys.all });
        },

    });
    return mutation;
};

export default useCreateBlog;