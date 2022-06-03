export default function FormItem({labelText, inputType, inputPlaceholder, min,value}) {
  return (
    <label className="flex flex-col text-left gap-1">
      <span>{labelText}</span>
      {
        inputType ? (
          <input 
            className="bg-gray-200 rounded-md py-2 px-3 outline-none focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
            type={inputType} 
            min={min}
            value={value}
            placeholder={inputPlaceholder}/>
        ) : (
          <textarea 
            className="bg-gray-200 rounded-md py-2 px-3 outline-none resize-none h-24 focus:ring-1 focus:ring-secondary focus:ring-opacity-50" 
            value={value}
            placeholder={inputPlaceholder}/>  
        )
      }
    </label>
  )
}
