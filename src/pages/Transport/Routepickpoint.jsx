import React from 'react';
import { IoIosAdd } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { FiColumns } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { IoIosMenu } from "react-icons/io";

const Routepickpoint = () => {
  return (
    <>
    <div className='flex justify-between p-6'>
        <div>
            <h1 className='text-2xl font-bold'>Route Pickup Point</h1>
        </div>
        <div>
        <button className="bg-blue-500  hover:bg-blue-700 text-white  py-2 px-4 rounded flex items-center">
<IoIosAdd />
Add 
</button>
        </div>
    </div>
<div className='p-6 flex justify-between'>
    <div>
<form className="max-w-md ">   
 
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <FaSearch />
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search visitor..." required />
     
    </div>
</form>
</div>
<div className='flex gap-3'>
<FaCopy /> <FaRegFileExcel /> <FaFileCsv /><FaFilePdf /> <FiPrinter /><FiColumns />
</div>
</div>
<div>
    

<div className="relative overflow-x-auto p-8">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-2 py-3">
             
Route	
                </th>
                <th scope="col" className="px-2 py-3">
                Pickup Point	
                </th>
                <th scope="col" className="px-2 py-3">
                Monthly Fees ($) 
                </th>
                <th scope="col" className="px-2 py-3">
                Distance (km)
                </th>
                <th scope="col" className="px-2 py-3">
                Pickup Time
                </th>
            
                <th scope="col" className="px-2 py-3">
               Action
                </th>
               


            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-2 py-4">
                    Silver
                </td>
                <td className="px-2 py-4">
                    Silver
                </td>
                <td className="px-2 py-4">
                    Laptop
                </td>
                <td className="px-2 py-4">
                    Silver
                </td>
                <td className="px-2 py-4">
                    Laptop
                </td>
                
                
               
                <td className="px-2 py-4">
                  <div className='flex gap-2'>
                  <IoIosMenu />

                  <CiEdit />
                  <AiOutlineCloseSquare />
                  </div>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>

</div>
    </>
  )
}

export default Routepickpoint