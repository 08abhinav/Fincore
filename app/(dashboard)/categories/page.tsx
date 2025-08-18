"use client"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { columns } from "./columns"
import { DataTable } from "./data-table"

import { useNewCategory } from "@/features/categories/hooks/use-new-category"
import { useGetCategories } from "@/features/categories/api/use-get-categories"
import { useBulkDeleteCategory } from "@/features/categories/api/use-bulk-delete-categories"


const CategoriesPage = () => {
  const newCategory = useNewCategory();
  const categoryQuery = useGetCategories();
  const deleteCategory = useBulkDeleteCategory();
  const category = categoryQuery.data || [];

  const isDisabled = categoryQuery.isLoading || deleteCategory.isPending;

  if(categoryQuery.isLoading){
    return(
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48"/>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-8 text-slate-400 animate-spin"/>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between lg:gap-y-0">
          <CardTitle className="text-xl font-semibold line-clamp-1">
            Categories Page
          </CardTitle>
          <Button
            onClick={newCategory.onOpen}
            size="sm"
            className="flex items-center">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable 
            filterKey="name"
            columns={columns} 
            data={category}
            onDelete={(row)=>{
              const ids = row.map((r) => r.original.id);
              deleteCategory.mutate({ids})
            }}
            disabled={isDisabled} 
          />
        </CardContent>
      </Card>
    </div>

  )
}

export default CategoriesPage