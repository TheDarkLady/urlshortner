import { UrlState } from '@/Context'
import React, { useEffect, useRef, useState } from 'react'
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
import useFetch from '@/hooks/useFetch';
import { createUrl } from '@/db/apiUrls';
import { BeatLoader } from 'react-spinners';

const Createlink = () => {
    const { user } = UrlState();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const ref = useRef();
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
    const {loading, error, data, fn:fnCreateUrl} = useFetch(createUrl,{...formValues,user_id: user?.id})

    useEffect(() => {
        if(error === null && data) {
            navigate(`/link/${data[0].id}`)
        }
    }, [error, data])
    
    const createNewLink =  async () => {
        setErrors([]);
        try {
            schema.validateSync(formValues, {abortEarly: false});
            const canvas = ref.current.canvasRef.current;  
            const blob = await new Promise((resolve) => canvas.toBlob(resolve)); 
            await fnCreateUrl(blob);
        } catch (e) {
            const newErrors = {};
            e?.inner?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    }
    return (
            <Dialog defaultOpen={longLink} onOpenChange={(res)=> {if(!res) setSearchParams({})}}>
                <DialogTrigger > 
                    <Button variant="destructive">Create New Link</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md" >
                    <DialogHeader>
                        <DialogTitle className="mb-5 font-bold text-xl">Create New</DialogTitle>
                        <Input id="title" placeholder="Short Link's Title" className="mb-4" value={formValues.title} onChange={handleChange} />
                        {errors.title && <Error message={errors.title} />}
                        <Input id="long_url" placeholder="Enter Long Link" className="mb-4" value={formValues.long_url} onChange={handleChange} />
                        {errors.long_url && <Error message={errors.long_url} />}
                        <div className='flex items-center gap-2'>
                            <Card className=" p-2">urltrimmer.online</Card> /
                            <Input id="custom_url" placeholder="Custom Link (Optional)" value={formValues.custom_url} onChange={handleChange} />
                            {errors && <Error message={errors
                                .message} />}
                        </div>
                    </DialogHeader>
                    {formValues?.long_url && <QRCode value={formValues.long_url} size={250 } ref={ref}/>}
                    <DialogFooter className="sm:justify-start">
                        <Button disabled={loading}  variant="destructive" onClick={createNewLink}>
                            {loading ? <BeatLoader size={10} color={"#fff"} /> : "Create"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
    )
}

export default Createlink
