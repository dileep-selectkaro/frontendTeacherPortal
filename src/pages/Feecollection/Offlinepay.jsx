import React from 'react';

import { FaSearch } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { FiColumns } from "react-icons/fi";
import { IoIosMenu } from "react-icons/io";

const Offlinepay = () => {
  return (
    <>
  
        <div className=' p-6'>
            <h1 className='text-2xl font-bold'>Offline Bank Payments</h1>
        
        
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
                Request ID	
                </th>
                <th scope="col" className="px-2 py-3">
                Admission No
                </th>
                <th scope="col" className="px-2 py-3">
                Name	
                </th>
                <th scope="col" className="px-2 py-3">
                Class	
                </th>

                <th scope="col" className="px-2 py-3">
                Payment Date	
                </th>
                <th scope="col" className="px-2 py-3">
                Submit Date	Amount ($)	
                </th>
                <th scope="col" className="px-2 py-3">
                Status	
                </th>
                <th scope="col" className="px-2 py-3">
                Status Date		
                </th>
                <th scope="col" className="px-2 py-3">
                Payment ID	
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
                    $2999
                </td>
              
                <td className="px-2 py-4">
                    $2999
                </td>
                <td className="px-2 py-4">
                    $2999
                </td>
                <td className="px-2 py-4">
                    $2999
                </td>
                <td className="px-2 py-4">
                    $2999
                </td>
                <td className="px-2 py-4">
                    $2999
                </td>
               
                <td className="px-2 py-4">
                  <div className='flex gap-2'>
                  <IoIosMenu />

                  
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

export default Offlinepay