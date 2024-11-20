import { UrlState } from "@/Context";
import { getUrl, deleteUrl } from "@/db/apiUrls";
import { getClicksForUrl } from "@/db/apiClicks";
import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import Header from "@/components/Header";
import { Copy, Download, LinkIcon, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LocationStats from "@/components/Location";
import DeviceStats from "@/components/DeviceStats";

const Link = () => {
  const { id } = useParams();
  const { user } = UrlState();
  // console.log("user_id", user?.id);

  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });
  console.log("Link page data:", url);
  if (error) {
    console.error("Error loading URL:", error);
  }

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";
  if (url) {
    link = url?.custom_url ? url?.custom_url : url?.short_url;
  }
  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color={"#36d7b7"} />
      )}
      <div className="flex flex-col gap-4 md:flex-row lg:flex-row md:gap-8 lg:gap-8 justify-between p-5">
        <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col gap-4 items-start rounded-lg ">
          <span className="text-3xl font-bold hover:underline cursor-pointer">
            {url?.title}
          </span>
          <a
            href={`https://urltrimmer.online/${link}`}
            target="_blank"
            className="text-wrap text-base md:text-2xl text-blue-400 font-extrabold hover:underline cursor-pointer"
          >
            https://urltrimmer.online/${link}
          </a>
          <a
            href={`${url?.original_url}`}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>
          <sapn className="flex items-end font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </sapn>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://urltrimmer.online/${
                    url?.custom_url ? url?.custom_url : url?.short_url
                  }`
                )
              }
            >
              <Copy size={20} />
            </Button>
            <Button variant="ghost" onClick={downloadImage}>
              <Download size={20} />
            </Button>
            <Button variant="ghost" onClick={() => fnDelete()}>
              {loadingDelete ? (
                <BeatLoader size={5} color="white" />
              ) : (
                <Trash size={20} />
              )}
            </Button>
          </div>
          <img
            src={url?.qr}
            alt="qr code"
            className="h-32 md:h-40 lg:h-60  object-contain ring ring-blue-500 self-start  p-1"
          />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 flex flex-col gap-4 items-start rounded-lg p-1">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Statistics</CardTitle>
            </CardHeader>
            {stats && stats.length > 0 ? (
              <CardContent>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Clicks</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col justify-between">
                    <p>{stats?.length}</p>
                  </CardContent>
                </Card>

                <CardTitle className="mt-4 mb-8">Location Date</CardTitle>
                <LocationStats stats={stats} />
                <CardTitle>Device Info</CardTitle>
                <DeviceStats stats={stats} />
              </CardContent>
            ) : (
              <CardContent>
                {loadingStats === false
                  ? "No Statistics yet"
                  : "Loading statistics ..."}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default Link;
