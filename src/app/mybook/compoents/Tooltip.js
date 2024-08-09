import React from 'react'

function Tooltip({ children, text, fn, rt, tp }) {
    return (
        <div className='relative group'>
            {children}
            <div onClick={() => fn()} className={`w-[100px] hidden group-hover:block z-50 absolute ${tp ? tp : "-top-2"} cursor-pointer  bg-lightmode dark:bg-darkmode shadow-lightmode dark:active:shadow-lightmodeclick dark:shadow-customshadow active:shadow-buttonclick rounded-lg p-2 ${rt ? "right-2" : "left-0"} capitalize`}>
                {text}
            </div>
        </div>

    )
}

export default Tooltip