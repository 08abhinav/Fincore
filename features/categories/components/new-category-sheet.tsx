import { Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription
} from "@/components/ui/sheet";
import z from "zod";
import { insertCategorySchema } from "@/db/schema";
import { useNewCategory } from "../hooks/use-new-category";
import { CategoryForm } from "./category-form";
import { useCreateCategory } from "../api/use-create-category";

const formSchema = insertCategorySchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>

export const NewCategorySheet = ()=>{
    const {isOpen, onClose} = useNewCategory();
    const mutation = useCreateCategory();
    const onSubmit = (values: FormValues)=>{
        mutation.mutate(values, {
            onSuccess: ()=>{
                onClose();
            }
        })
    }
    return(
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 p-6">
                <SheetHeader className="space-y-2">
                    <SheetTitle className="text-xl font-semibold tracking-tight">
                        New Category
                    </SheetTitle>
                    <SheetDescription  className="text-sm text-muted-foreground">
                        Create a new category to organize your transactions.
                    </SheetDescription>
                </SheetHeader>
                <CategoryForm defaultValues={{ name: "" }} 
                    onSubmit={onSubmit} 
                    disabled={mutation.isPending}/>
            </SheetContent>
        </Sheet>
    )
}