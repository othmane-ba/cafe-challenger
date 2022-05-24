import Head  from "next/head";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({children, title, subtitle}) {
  return (
    <div className="relative max-w-screen h-screen w-full flex flex-col">
      <Head>
        <title>Cafe challenger</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className="mt-[80px] md:relative z-40 flex-1">
        <div className="text-center flex flex-col h-full">
          <div>
            <h2 className="text-secondary text-xl font-semibold mt-5">{title}</h2>
            <h3 className="text-primary text-3xl font-semibold uppercase">{subtitle}</h3>
          </div>
        
          <div className=" flex-1">
            {children}
          </div>
        </div>
      </main>

      <Footer/>
    </div>
  )
}
