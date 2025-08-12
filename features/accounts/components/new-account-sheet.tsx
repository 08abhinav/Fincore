import { Sheet,
    SheetTitle,
    SheetHeader,
    SheetContent,
    SheetDescription
} from "@/components/ui/sheet";
import z from "zod";
import { insertAccountSchema } from "@/db/schema";
import { useNewAccount } from "../hooks/use-new-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertAccountSchema.pick({
    name: true,
});

type FormValues = z.input<typeof formSchema>

export const NewAccountSheet = ()=>{
    const {isOpen, onClose} = useNewAccount();
    const mutation = useCreateAccount();
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
                        New Account
                    </SheetTitle>
                    <SheetDescription  className="text-sm text-muted-foreground">
                        Create a new account to track your transactions.
                    </SheetDescription>
                </SheetHeader>
                <AccountForm defaultValues={{ name: "" }} 
                onSubmit={onSubmit} 
                disabled={mutation.isPending}/>
            </SheetContent>
        </Sheet>
    )
}