import {z} from "zod"
import { Trash } from "lucide-react"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { insertTransactionSchema } from "@/db/schema"
import {zodResolver} from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Select from "@/components/Select"
import { DatePicker } from "@/components/date-picker"
import { Textarea } from "@/components/ui/textarea"
import { AmountInput } from "@/components/amount-input"
import { converAmountToMili } from "@/lib/utils"

const formSchema = z.object({
    date: z.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    amount: z.string(),
    payee: z.string(),
    notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({
    id: true,
})

type FormValues = z.input<typeof formSchema>
type ApiFormValues = z.input<typeof apiSchema>

type Props = {
    id?: string;
    disabled?: boolean;
    defaultValues?: FormValues;
    accountOptions: {label: string, value: string}[];
    categoryOptions: {label: string, value: string}[];
    onDelete?: ()=> void;
    onCreateCategory: (name: string)=>void;
    onCreateAccount: (name: string)=> void;
    onSubmit: (values: ApiFormValues)=> void;
};

export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    categoryOptions, 
    onCreateAccount, 
    onCreateCategory
}: Props)=>{
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            date: defaultValues?.date ?? new Date(),
            accountId: defaultValues?.accountId ?? "",
            categoryId: defaultValues?.categoryId ?? null,
            amount: defaultValues?.amount ?? "",
            payee: defaultValues?.payee ?? "",
            notes: defaultValues?.notes ?? null,
        },
    })

    const handleSubmit = (values: FormValues)=>{
        const amount = parseFloat(values.amount)
        const amountInMili = converAmountToMili(amount);
        
        onSubmit({
            ...values,
            amount: amountInMili
        })
    }

    const handleDelete = ()=>{
        onDelete?.();
    }
    return(
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5 pt-2">

                <FormField
                    name= "date"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormControl>
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )} 
                />

                <FormField
                    name= "accountId"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>
                                Account
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select an account"
                                    value={field.value}
                                    options={accountOptions}
                                    onCreate={onCreateAccount}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )} 
                />

                <FormField
                    name= "categoryId"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>
                                Category
                            </FormLabel>
                            <FormControl>
                                <Select
                                    placeholder="Select a category"
                                    value={field.value}
                                    options={categoryOptions}
                                    onCreate={onCreateCategory}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )} 
                />

                <FormField
                    name= "payee"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>
                                Payee
                            </FormLabel>
                            <FormControl>
                               <Input
                                {...field}
                                disabled={disabled}
                                placeholder="Add a payee"
                               />
                            </FormControl>
                        </FormItem>
                    )} 
                />
                
                <FormField
                    name= "amount"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>
                                Amount
                            </FormLabel>
                            <FormControl>
                               <AmountInput
                                {...field}
                                disabled={disabled}
                                placeholder="0.00"
                               />
                            </FormControl>
                        </FormItem>
                    )} 
                />

                <FormField
                    name= "notes"
                    control={form.control}
                    render={({field})=>(
                        <FormItem>
                            <FormLabel>
                                Notes
                            </FormLabel>
                            <FormControl>
                               <Textarea
                                {...field}
                                value={field.value ?? ""}
                                disabled={disabled}
                                placeholder="Optional notes"
                               />
                            </FormControl>
                        </FormItem>
                    )} 
                />

                <Button className="w-full mt-2" disabled={disabled}>
                    {id? "Save changes": "Create Transaction"}
                </Button>
                {!!id && 
                    (<Button 
                        type="button"
                        disabled={disabled}
                        onClick={handleDelete}
                        className="w-full mt-4"
                        variant="outline">
                        <Trash className="size-4 mr-2"/>
                        Delete Transaction
                    </Button>)
                }
            </form>
        </Form>
    )
}