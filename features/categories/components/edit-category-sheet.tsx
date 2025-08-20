import { Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription
} from "@/components/ui/sheet";
import z from "zod";
import { Loader2 } from "lucide-react";
import { insertCategorySchema } from "@/db/schema";
import { useOpenCategory } from "../hooks/use-open-category";

import { useGetCategory } from "../api/use-get-category";
import { useEditCategory } from "../api/use-edit-categories";
import { CategoryForm } from "./category-form";
import { useDeleteCategory } from "../api/use-delete-category";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = insertCategorySchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>

export const EditCategorySheet = ()=>{
    const {isOpen, onClose, id} = useOpenCategory();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You want to delete this category."
    )

    const categoryQuery = useGetCategory(id);
    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isLoading = categoryQuery.isLoading;
    const isPending = editMutation.isPending || deleteMutation.isPending

    const onSubmit = (values: FormValues)=>{
        editMutation.mutate(values, {
            onSuccess: ()=>{
                onClose();
            }
        })
    }

    const onDelete = async ()=>{
        const ok = await confirm();

        if(ok){
            deleteMutation.mutate(undefined, {
                onSuccess: ()=>{
                    onClose();
                }
            })
        }
    }

    const defaultValues = categoryQuery.data ? {
        name: categoryQuery.data.name
    }:{name: "",}
    return(
        <>
            <ConfirmDialog/>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent className="space-y-4 p-6">
                    <SheetHeader className="space-y-2">
                        <SheetTitle className="text-xl font-semibold tracking-tight">
                            Edit Category
                        </SheetTitle>
                        <SheetDescription  className="text-sm text-muted-foreground">
                            Edit an existing category.
                        </SheetDescription>
                    </SheetHeader>
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="h-4 w-4 text-muted-foreground animate-spin"/>
                        </div>
                        ):(
                            <CategoryForm
                                id={id} 
                                defaultValues={defaultValues} 
                                onSubmit={onSubmit} 
                                disabled={isPending}
                                onDelete={onDelete}
                            />
                        )
                    }
                </SheetContent>
            </Sheet>
        </>
    )
}