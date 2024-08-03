"use client"
import { IconUpload, IconX } from '@tabler/icons-react'
import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import data from '../data/bannerData.json';

interface EditModalCompPropsType {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>,
    setCurrentBannerId: Dispatch<SetStateAction<number>>,
    banners: bannerInfoType[],
    setBanners: Dispatch<SetStateAction<bannerInfoType[]>>,
    currentBannerId: number,
}

interface bannerInfoType {
    id: number,
    title: string,
    des: string,
    imageUrl: string,
    bgUrl: string,
    btnText: string,
    dark: string
}

function EditModalComp({ setOpenModal, openModal, setCurrentBannerId, currentBannerId, banners, setBanners }: EditModalCompPropsType) {

    const ref = useRef<HTMLInputElement>(null);

    const [bannerInfo, setBannerInfo] = useState<bannerInfoType>({
        id: 0,
        title: "",
        des: "",
        imageUrl: "",
        bgUrl: "",
        btnText: "",
        dark: ""
    });

    useEffect(() => {
        setBannerInfo(data.filter((item) => item.id == currentBannerId)[0])
    }, [openModal])


    const handleClick = () => {
        setBannerInfo({
            id: 0,
            title: "",
            des: "",
            imageUrl: "",
            bgUrl: "",
            btnText: "",
            dark: ""
        })
        setOpenModal(false);
        setCurrentBannerId(0);
    }

    const handleChange = (info: bannerInfoType) => {
        setBannerInfo(info);
    }

    const updateBanner = () => {
        const cbanner = banners.filter((banner) => banner.id == bannerInfo.id)[0];
        banners[banners.indexOf(cbanner)] = bannerInfo
        /*let newBanners = banners;
        newBanners[banners.indexOf(a)] = bannerInfo*/
        setOpenModal(false);
        setBannerInfo({
            id: 0,
            title: "",
            des: "",
            imageUrl: "",
            bgUrl: "",
            btnText: "",
            dark: ""
        })

    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBannerInfo((prevInfo) => ({
                    ...prevInfo,
                    imageUrl: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className={`${openModal == false && 'hidden'} fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`} aria-hidden="true"></div>

            <div className={`${openModal == false && 'hidden'} fixed inset-0 z-10 w-screen overflow-y-auto`}>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start justify-between">
                                <h1 className='text-gray-700'>Edit Banner</h1>
                                <button onClick={handleClick}><IconX /></button>
                            </div>

                            {openModal && bannerInfo &&
                                <>
                                    <div className='w-full py-12 px-6 flex mt-8 rounded-md shadow-md' style={{ background: `url('${bannerInfo.bgUrl}')no-repeat center center/cover` }}>
                                        <div className='flex flex-col w-[60%]'>
                                            <h1 className={`text-2xl font-bold mt-4 mb-4 ${bannerInfo.dark == "true" && 'text-white'}`}>{bannerInfo.title}</h1>
                                            <span className={`text-sm mb-8 ${bannerInfo.dark == "true" && 'text-white'}`}>{bannerInfo.des}</span>
                                            <button className={`py-2 px-4 border border-gray-700 w-1/2 rounded-md text-sm ${bannerInfo.dark == "true" && 'text-white'}`}>{bannerInfo.btnText}</button>
                                        </div>
                                        <div className='flex flex-row-reverse items-start w-[40%]' style={{ background: `${bannerInfo.dark == "true" ? 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)),' : ""}url('${bannerInfo.imageUrl}')no-repeat center 40%/100%` }}>
                                        </div>
                                    </div>

                                    <h1 className='text-gray-700 mt-8 mb-4'>Images</h1>
                                    <div className='flex'>
                                        <input type="file" className='hidden mr-2' ref={ref} onChange={handleImageChange} />
                                        <div className='w-1/5 cursor-pointer rounded-full h-[50px] bg-gray-300 flex items-center justify-center' onClick={() => ref.current?.click()} >
                                            <IconUpload />
                                        </div>
                                        {/*{banners.filter((item) => item.imageUrl != bannerInfo.imageUrl).map((banner) => {
                                            
                                            return (
                                                <div className='w-1/5 mr-2 cursor-pointer' onClick={() => handleChange({ ...bannerInfo, imageUrl: banner.imageUrl })} key={banner.id}>
                                                    <img src={banner.imageUrl} alt="Banner" className='rounded-full h-[50px]' />
                                                </div>
                                            )
                                        })}*/}

                                        {banners.map((item, i) => {
                                            let show = true;
                                            for (let j = i + 1; j < banners.length; j++) {
                                                if (banners[i].imageUrl == banners[j].imageUrl) {
                                                    show = false;
                                                    break;
                                                }
                                                if (banners[i].imageUrl == bannerInfo.imageUrl) {
                                                    show = false;
                                                    break;
                                                }
                                                else {
                                                    show = true;
                                                }
                                            }

                                            if (show) {

                                                return (
                                                    <div className='w-1/5 mr-2 cursor-pointer' onClick={() => handleChange({ ...bannerInfo, imageUrl: banners[i].imageUrl })} key={banners[i].id}>
                                                        <img src={banners[i].imageUrl} alt="Banner" className='rounded-full h-[50px]' />
                                                    </div>
                                                )

                                            }

                                        })}

                                    </div>

                                    <h1 className='text-gray-700 mt-8 mb-4'>Title</h1>
                                    <div className='w-full'>
                                        <input type="text" value={bannerInfo.title} onChange={(e) => handleChange({ ...bannerInfo, title: e.target.value })} className='w-full rounded-md px-4 py-2 border-2 border-gray-200 outline-none' />
                                    </div>
                                    <h1 className='text-gray-700 mt-4 mb-4'>Description</h1>
                                    <div className='w-full'>
                                        <input type="text" value={bannerInfo.des} onChange={(e) => handleChange({ ...bannerInfo, des: e.target.value })} className='w-full rounded-md px-4 py-2 border-2 border-gray-200 outline-none' />
                                    </div>
                                    <button className='mt-12 mb-4 py-2 w-full border-2 bg-slate-800 text-gray-100 rounded-md ' onClick={updateBanner}>Done</button>
                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditModalComp
