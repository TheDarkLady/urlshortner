import React, { useEffect, useState } from 'react'
import { BarLoader } from 'react-spinners'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import useFetch from '@/hooks/useFetch'
import { UrlState } from '@/Context'
import { getUrls } from '@/db/apiUrls'
import { getClicksForUrls } from '@/db/apiClicks'
import Linkcard from '@/components/LinkCard'
import Createlink from '@/components/Createlink'
function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  console.log("searchQuery", searchQuery);
  
  const {user} = UrlState();
  const {loading, error, data: urls, fn:fnUrls} = useFetch(getUrls, user?.id)
  console.log("Urls", urls);
  
  const {loading:loadingClicks, data: clicks, fn:fnClicks} = useFetch(getClicksForUrls, urls?.map(url => url.id));
  useEffect(()=>{
    fnUrls(user?.id)
  }, [])
  useEffect(()=>{
    if (urls?.length){
      fnClicks()
    }
  },[urls?.length])
  const filteredUrls = urls?.filter((url) => url.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()))
  console.log("filteredUrls", filteredUrls);
  
  return (
    <div className="p-10">
      {(loading || loadingClicks)  && <BarLoader width={"100%"} color={"#36d7b7"} />}
      <div className="grid grid-cols-2 gap-4 my-4">
      <Card>
        <CardHeader>
          <CardTitle>Links Created</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{urls?.length}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Clicks</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{clicks?.length===0 ? 0 : length}
          </p>
        </CardContent>
      </Card>
      </div >
      <div className='flex justify-between gap-4 my-10'>
        <h1 className='text-3xl font-extrabold'>My Links</h1>
        {/* <Button className="w-">Create Link</Button> */}
        <Createlink />
      </div>
      <div className='relative overflow-x-auto'>
        <Input type="text" placeholder="Filter for links..." value={searchQuery} onChange={e=> setSearchQuery(e.target.value)}/>
        <Filter className='absolute right-2 top-2 ' />
      </div>
      {error && <Error message={error.message}/>}

      {(filteredUrls || []).map((url, i) => {
        console.log("chaithu", url);
        
        return <Linkcard key={i} url={url} fetchUrls={fnUrls} />;
      })}
    </div>
  )
}

export default Dashboard
