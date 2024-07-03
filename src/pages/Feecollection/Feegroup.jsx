import React from 'react'
import { FaSearch } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { FiColumns } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";

const Feegroup = () => {
  return (
    <>
    <div className='bg-gray-300 lg:flex gap-2 p-4'>
       
   <div className='bg-white rounded-lg p-6 w-96  '>
       <h1 className='text-2xl font-bold mb-2'>Add Fees Group</h1>
   <form className="max-w-sm ">
         <div className="mb-5">
       <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
       <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
     </div>
     <div className="mb-5">
       
       <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
       <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description..."></textarea>
       
         </div>
   
     <div className='flex justify-end'>
     <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex ">Save</button>
     </div>
   </form>
   </div>
   
   
   
   <div className='px-6 py-2 bg-white w-full  rounded-lg'>
   <div>
               <h1 className='text-2xl font-bold'>Fees Group List</h1>
           </div>
          
       <div className='flex justify-between mt-2'>
   <form className="max-w-md ">   
    
       <div className="relative">
           <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
           <FaSearch />
           </div>
           <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...." required />
        
       </div>
   </form>
   
   <div className='flex gap-3 mt-4'>
   <FaCopy /> <FaRegFileExcel /> <FaFileCsv /><FaFilePdf /> <FiPrinter /><FiColumns />
   </div>
   </div>
   <div className="relative overflow-x-auto mt-4 ">
       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                   <th scope="col" className="px-6 py-3">
                   
Name

                   </th>
                   <th scope="col" className="px-6 py-3">
               Description
                   </th>
                  

                   <th scope="col" className="px-6 py-3">
                     Action
                   </th>
                  
                  
   
   
               </tr>
           </thead>
           <tbody>
               <tr className="bg-white  ">
               <td className="px-6 py-4">
                          Silver
                      </td>
                   <td className="px-6 py-4">
                       Silver
                   </td>
                
                
                  
                  
                  
                  
                   <td className="px-6 py-4">
                     <div className='flex gap-2'>
                  
   
                     <CiEdit />
                     <FaWindowClose />
                     </div>
                   </td>
               </tr>
               
           </tbody>
       </table>
   </div>
   </div>
   
   
   
   </div>
   
   
    
    </>
  )
}

export default Feegroup