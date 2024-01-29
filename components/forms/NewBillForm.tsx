'use client'
import React from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
} from "@/components/ui/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
const NewBillForm = ({ clerkId }: { clerkId: string }) => {
    return (
        <div>NewBillForm</div>
    )
}

export default NewBillForm