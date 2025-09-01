import { cva, VariantProps } from 'class-variance-authority'
import React from 'react'
import { IconType } from 'react-icons/lib'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'
import { cn } from '@/lib/utils'

const boxVariant = cva(
    "shrink-0 rounded-md p-3",
    {
        variants:{
            variant:{
                default:"bg-blue-500/20",
                success:"bg-emerald-500/20",
                danger:"bg-blue-500/20",
                warning:"bg-yellow-500/20"
            }
        },
        defaultVariants:{
            variant: "default"
        }
    }
)

const iconVariant = cva(
    "size-6",
    {
        variants:{
            variant:{
                default:"bg-blue-500",
                success:"bg-emerald-500",
                danger:"bg-blue-500",
                warning:"bg-yellow-500"
            }
        },
        defaultVariants:{
            variant: "default"
        }
    }
)

type BoxVariants = VariantProps<typeof boxVariant>
type IconVariants = VariantProps<typeof iconVariant>

interface DataCardProps extends BoxVariants, IconVariants{
    icon: IconType;
    title: string;
    value?: number;
    dateRange: string;
    percentageChange?: number;
}

export const DataCard = ({
    icon: Icon,
    title,
    value = 0,
    variant,
    dateRange,
    percentageChange = 0
}: DataCardProps) => {
  return (
    <Card className='border-none drop-shadow-sm'>
        <CardHeader className='flex flex-row items-center justify-between gap-x-4'>
            <div className='space-y-2'>
                <CardTitle className='text-2xl line-clamp-1'>
                    {title}
                </CardTitle>
                <CardDescription className="line-clamp-1 text-sm text-muted-foreground italic tracking-wide">
                    {dateRange}
                </CardDescription>

            </div>
            <div className={cn(
                boxVariant({ variant }),
            )}>
                <Icon className={cn(iconVariant({variant}))}/>
            </div>
        </CardHeader>
    </Card>
  )
}
