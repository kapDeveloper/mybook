import React from 'react'

function TabButton({ selectbtn, setselectbtn }) {
  return (
    <div className='flex items-center gap-2'>
      <button onClick={() => setselectbtn(0)} className={`min-h-[50px]  w-full rounded-lg text-white font-bold ${selectbtn == 0 ? "shadow-lightmodeclick dark:shadow-buttonclick" : "shadow-lightmode dark:shadow-customshadow"} `}>
        income
      </button>
      <button onClick={() => setselectbtn(1)} className={`min-h-[50px]  w-full rounded-lg text-white font-bold ${selectbtn == 1 ? "shadow-lightmodeclick dark:shadow-buttonclick" : "shadow-lightmode dark:shadow-customshadow"} `}>
        expense
      </button>
    </div>
  )
}

export default TabButton