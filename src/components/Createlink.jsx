import { UrlState } from '@/Context'
import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from './ui/button';
import { Input } from './ui/input';
import Error from './Error';
import { Card } from './ui/card';
import * as yup from "yup";
import { QRCode } from 'react-qrcode-logo';

const Createlink = () => {
    const { user } = UrlState();
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    const longLink = searchParams.get("createNew");
    const [formValues, setFormValues] = useState({
        title: "",
        long_url: longLink ? longLink : "",
        custom_url: "",
    })

    const schema = yup.object().shape({
        title:yup.string().required("Title is required"),
        long_url: yup.string().required("Long Url is required"),
        custom_url: yup.string(),
    })
    const handleChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.id]: e.target.value
        })
    }
    return (
            <Dialog defaultOpen={longLink} onOpenChange={(res)=> {if(!res) setSearchParams({})}}>
                <DialogTrigger>
                    <Button variant="destructive" >Create New Link</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md" >
                    <DialogHeader>
                        <DialogTitle className="mb-5 font-bold text-xl">Create New</DialogTitle>
                        <Input id="title" placeholder="Short Link's Title" className="mb-4" value={formValues.title} onChange={handleChange} />
                        <Error message={searchParams.get("error")} />
                        <Input id="long_url" placeholder="Enter Long Link" className="mb-4" value={formValues.long_url} onChange={handleChange} />
                        <Error message={searchParams.get("error")} />
                        <div className='flex items-center gap-2'>
                            <Card className=" p-2">urltrimmer.online</Card> /
                            <Input id="custom_url" placeholder="Custom Link (Optional)" value={formValues.custom_url} onChange={handleChange} />
                        </div>
                    </DialogHeader>
                    {formValues?.long_url && <QRCode value={formValues.long_url} size={250}/>}
                    <DialogFooter className="sm:justify-start">
                        <Button  variant="destructive">Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    )
}

export default Createlink
