import {client} from "@/lib/hono"
import { toast } from "sonner";
import { InferResponseType } from "hono";
import {useMutation, useQueryClient} from "@tanstack/react-query"

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>;

export const useDeleteTransaction = (id?:string)=>{
    const queryClient = useQueryClient();
    const mutation = useMutation<
    ResponseType,
    Error
    >({
        mutationFn: async ()=>{
            const res = await client.api.transactions[":id"]["$delete"]({param:{id}})
            return await res.json();
        },
        onSuccess: () =>{
            toast.success("Transaction Deleted")
            queryClient.invalidateQueries({queryKey:["transaction", {id}]})
            queryClient.invalidateQueries({queryKey:["transactions"]})
        },
        onError: () =>{
            toast.error("Failed to delete transaction")
        }
    })
    return mutation;
}
 
