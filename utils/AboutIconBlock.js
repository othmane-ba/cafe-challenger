export default function AboutIconBlock({Icon, text}) {
  return (
    <div className="flex flex-1 p-1 bg-gray-100 py-4 px-2 border border-gray-300 rounded-md justify-center
    gap-2">
      <Icon className="text-secondary"/>
      <p className="whitespace-nowrap">{text}</p>
    </div>
  )
}
