import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-4  border-t-[1px] border-gray-300">
      <div className="container-wrapper flex justify-center space-x-1 text-base sm:text-base">
        <p className="">Copyright @2022 By</p>
        <Link href='https://www.newdevmaroc.com/' passHref>
        <a className="text-secondary">Newdev Maroc</a></Link>
      </div>
    </footer>
  )
}
