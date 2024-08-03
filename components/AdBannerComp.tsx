import { IconPencil } from '@tabler/icons-react'
import React, { Dispatch, SetStateAction } from 'react'

interface BannerType {
  id: number,
  title: string,
  des: string,
  imgUrl: string,
  bgUrl: string,
  btnText: string,
  dark: string,
  openModal: boolean,
  setOpenModal: Dispatch<SetStateAction<boolean>>,
  setCurrentBannerId: Dispatch<SetStateAction<number>>
}

function AdBannerComp({ id, title, des, imgUrl, bgUrl, btnText, dark, setOpenModal, openModal, setCurrentBannerId }: BannerType) {

  const handleClick = (id: number) => {
    setOpenModal(true);
    setCurrentBannerId(id);
  }

  return (
    <div className='w-[45%] py-12 px-6 flex m-4 rounded-md shadow-md' style={{ background: `url('https://github.com/SahilAnvekar002/GrowEasyAssignment/blob/master/public/${bgUrl}')no-repeat center center/cover` }}>
      <div className='flex flex-col w-[60%] px-10'>
        <h1 className={`text-4xl font-bold mt-4 mb-6 ${dark == "true" && 'text-white'}`}>{title}</h1>
        <span className={`text-xl mb-16 ${dark == "true" && 'text-white'}`}>{des}</span>
        <button className={`py-2 px-4 border border-gray-700 w-1/2 rounded-md ${dark == "true" && 'text-white'}`}>{btnText}</button>
      </div>
      <div className='flex flex-row-reverse items-start w-[40%]' style={{ background: `${dark == "true" ? 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.5)),' : ""}url('${imgUrl}')no-repeat center 40%/100%` }}>
        <button className='-mt-8' onClick={() => handleClick(id)}><IconPencil className={`${dark == "true" && 'text-white'}`} /></button>
      </div>
    </div>
  )
}

export default AdBannerComp
