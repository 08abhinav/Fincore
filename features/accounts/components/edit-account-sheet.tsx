import { Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription
} from "@/components/ui/sheet";
import z from "zod";
import { insertAccountSchema } from "@/db/schema";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { useOpenAccount } from "../hooks/use-open-account";
import { useGetAccount } from "../api/use-get-account";
import { Loader2 } from "lucide-react";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>

export const EditAccountSheet = ()=>{
    const {isOpen, onClose, id} = useOpenAccount();

    const accountQuery = useGetAccount(id);
    const mutation = useCreateAccount();

    const isLoading = accountQuery.isLoading;

    const onSubmit = (values: FormValues)=>{
        mutation.mutate(values, {
            onSuccess: ()=>{
                onClose();
            }
        })
    }

    const defaultValues = accountQuery.data ? {
        name: accountQuery.data.name
    }:{name: "",}
    return(
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4 p-6">
                <SheetHeader className="space-y-2">
                    <SheetTitle className="text-xl font-semibold tracking-tight">
                        Edit Account
                    </SheetTitle>
                    <SheetDescription  className="text-sm text-muted-foreground">
                        Edit an existing account.
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="h-4 w-4 text-muted-foreground animate-spin"/>
                    </div>
                    ):(
                        <AccountForm
                        id={id} 
                        defaultValues={defaultValues} 
                        onSubmit={onSubmit} 
                        disabled={mutation.isPending}/>
                    )
                }
            </SheetContent>
        </Sheet>
    )
}