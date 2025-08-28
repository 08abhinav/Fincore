import {client} from "@/lib/hono"
import { toast } from "sonner";
import { InferResponseType } from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query"

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?:string)=>{
    const queryClient = useQueryClient();
    const mutation = useMutation<
    ResponseType,
    Error
    >({
        mutationFn: async ()=>{
            const res = await client.api.categories[":id"]["$delete"]({param:{id}})
            return await res.json();
        },
        onSuccess: () =>{
            toast.success("Category Deleted ")
            queryClient.invalidateQueries({queryKey:["category", {id}]})
            queryClient.invalidateQueries({queryKey:["categories"]})
            queryClient.invalidateQueries({queryKey:["transactions"]})
        },
        onError: () =>{
            toast.error("Failed to delete category")
        }
    })
    return mutation;
}
 
