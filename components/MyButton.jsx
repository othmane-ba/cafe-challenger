export default function MyButton({text}) {
  return (
    <button 
      className="bg-primary hover:bg-secondary relative z-[999] text-white py-2 px-5 text-l rounded-md transition-all whitespace-nowrap max-w-[150px]">
      {text}
    </button>
  )
}
