import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { Copy, Delete, Download, Trash } from 'lucide-react'
import useFetch from '@/hooks/useFetch'
import { deleteUrl } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'
const Linkcard = ({url, fetchUrls}) => {
  console.log("fetch Url", fetchUrls);
  console.log(" Link card url", url);
  
  const downloadImage = () => {
    
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  }

  const {loading:loadingDelete, fn:fnDelete} = useFetch(deleteUrl, url?.id,)
  return (

    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-grey-900 rounded-lg mt-10'>
        {console.log("Image url", url?.qr)}
        {console.log("Complete url object:", url)}

      <img src={url?.qr} alt="qr code" className='h-32 object-contain ring ring-blue-500 self-start'/>
      <Link to={`/link/${url?.id}`} className='flex flex-col flex-1'>
      <span className='text-3xl  font-bold hover:underline cursor-pointer'>{url?.title}</span>
      <span className='text-wrap text-base md:text-2xl text-blue-400 font-extrabold hover:underline cursor-pointer'>https://urltrimmer.online/{url?.custom_url? url?.custom_url : url?.short_url}</span>
      <span className='flex items-center gap-1 hover:underline cursor-pointer'>{url?.original_url}</span>
      <span className='flex items-end font-extralight text-sm flex-1'>{new Date(url?.created_at).toLocaleString()}</span>
      <span></span>
      </Link>
      <div className='flex gap-2'>
        <Button variant="ghost" onClick={()=> navigator.clipboard.writeText(`https://urltrimmer.online/${url?.custom_url? url?.custom_url : url?.short_url}`)}>
          <Copy size={20}  />
        </Button>
        <Button variant="ghost" onClick={downloadImage}>
          <Download size={20} />
        </Button>
        <Button variant="ghost" onClick={()=> fnDelete().then(()=> fetchUrls())}   >
          {loadingDelete ? <BeatLoader size={5} color="white" /> : <Trash size={20} />}
        </Button>
      </div>

    </div>
  )
}

export default Linkcard
