import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <div className="sidebar">
        <div className="sidebar-header">
          <p className="font-bold text-4xl pt-[8%] mb-[6%]">ML Concepts</p>
          <input className="search-bar pl-2" type="text" placeholder="Search" />
        </div>
        <div className="sidebar-content">
          {Array(4).fill(0).map((_, i) => (
            <div key={i} className="sidebar-item">
              <p className="font-bold text-2xl">Transformer</p>
              <p className="pl-2">Lorem ipsum dolor sit amet consectetur. Varius porta augue neque morbi. Suscipit.</p>
            </div> 
          ))}  
        </div>
      </div>
      <div className="footer"> 
        <div className="footer-content">
          <Link href="" className="absolute right-8 top-5">Contribute</Link>
        </div>
      </div>
    </div>
  )
}
