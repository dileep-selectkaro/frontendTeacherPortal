import React from 'react';
import { FaSearch } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { FaFileCsv } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa6";
import { FiPrinter } from "react-icons/fi";
import { FiColumns } from "react-icons/fi";
import { CiEdit } from "react-icons/ci";
import { FaWindowClose } from "react-icons/fa";

const Assignveh = () => {
  return (
    <>
    <div className='bg-gray-300 lg:flex gap-2 p-4'>
       
   <div className='bg-white rounded-lg p-6 w-96  '>
       <h1 className='text-2xl font-bold'>Assign Vehicle On Route</h1>
   <form className="max-w-sm ">
    
   
     <div className="mb-5">
    
<form className="max-w-sm mx-auto">
  <label for="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Route</label>
  <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Select </option>
   
  </select>
</form>

     </div>
  
     <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vehicle</label>
         <div className="mb-2">
      
       <input id="horizontal-list-radio-license" type="checkbox" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
            <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">VH677Y </label>
           
     </div>
     <div className="mb-2">
      
      <input id="horizontal-list-radio-license" type="checkbox" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
           <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">VH67YU </label>
          
    </div>
    <div className="mb-5">
      
      <input id="horizontal-list-radio-license" type="checkbox" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
           <label for="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">VH677U8 </label>
          
    </div>
    
     <div className='flex justify-end'>
     <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex ">Save</button>
     </div>
   </form>
   </div>
   
   
   
   <div className='px-6 py-2 bg-white w-full  rounded-lg'>
   <div>
               <h1 className='text-2xl font-bold'>Vehicle Route List</h1>
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
                   
Route

                   </th>
                   <th scope="col" className="px-6 py-3">
               Vehicle
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
                       Laptop
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

export default Assignveh