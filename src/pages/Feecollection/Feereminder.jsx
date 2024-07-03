import React from 'react'

const Feereminder = () => {
  return (
<>
<div className='p-6'>
<div>
     <h1 className='text-2xl font-bold'>Fees Reminder</h1>
    </div>
    <div className="relative overflow-x-auto mt-4 ">
       <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
           <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                   <th scope="col" className="px-6 py-3">
                   
Action	

                   </th>
                   <th scope="col" className="px-6 py-3">
                   Reminder Type
                   </th>
                   <th scope="col" className="px-6 py-3">
                Days
                   </th>
                 

                   
                  
                  
   
   
               </tr>
           </thead>
           <tbody>
               <tr className="bg-white  ">
               <td className="px-6 py-4">
               <div class="flex items-center mb-4">
    <input id="default-radio-1" type="checkbox" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Active</label>
</div>
                      </td>
                   <td className="px-6 py-4">
                       Silver
                   </td>
                   <td className="px-6 py-4">
                    4
                   </td>
                 
                  
                  
                  
                  
                 
               </tr>
               
           </tbody>
       </table>
       <div className='flex justify-end'>
     <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex ">Save</button>
     </div>
   </div>
   </div>
</>
  )
}

export default Feereminder