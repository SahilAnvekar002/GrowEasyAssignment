"use client"
import AdBannerComp from "@/components/AdBannerComp";
import { useEffect, useState } from "react";
import data from '../data/bannerData.json';
import EditModalComp from "@/components/EditModalComp";

export default function Home() {

  const [banners, setBanners] = useState(data);
  const [openModal, setOpenModal] = useState(false);
  const [currentBannerId, setCurrentBannerId] = useState(0);

  useEffect(() => {
    //console.log("yo")
  }, [banners])
  
  return (
    <>
      <div className="flex flex-wrap justify-center">
        {banners?.length > 0 && banners?.map((banner) => {
          return (
            <AdBannerComp key={banner.id} id={banner.id} title={banner.title} des={banner.des} imgUrl={banner.imageUrl} bgUrl={banner.bgUrl} btnText={banner.btnText} dark={banner.dark} setOpenModal={setOpenModal} openModal={openModal} setCurrentBannerId={setCurrentBannerId}/>
          )
        })}
      </div>
      <EditModalComp openModal={openModal} setOpenModal={setOpenModal} setCurrentBannerId={setCurrentBannerId} currentBannerId={currentBannerId} banners={banners} setBanners={setBanners}/>
    </>
  );
}
