"use client";

import { Transformer } from "@/components/Transformer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Concept {
  name: string
  description: string
  component: React.FC
}

export default function Home() {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null)

  const params = useSearchParams();

  const concepts = useMemo(() => ({
    transformer: {
      name: "Transformer",
      description: "Lorem ipsum dolor sit amet consectetur. Varius porta augue neque morbi. Suscipit.",
      component: Transformer      
    }
  }), [])

  useEffect(() => {
    const section = params.get("section");
    if (section) {
      // @ts-ignore
      setSelectedConcept(concepts[section] ?? null)
    }
  }, [])

  return (
    <div className="">
      <div className="sidebar">
        <div className="sidebar-header">
          <p className="font-bold text-4xl pt-[8%] mb-[6%]">ML Concepts</p>
          <input className="search-bar pl-2" type="text" placeholder="Search" />
        </div>
        <div className="sidebar-content">
          {Object.values(concepts).map((concept, i) => (
            <Link key={i} href={`?section=${concept.name.toLowerCase()}`} className={`sidebar-item ${concept.name === selectedConcept?.name ? "sidebar-item-selected" : ""}`} onClick={() => setSelectedConcept(concept)}>
              <p className="font-bold text-2xl">{concept.name}</p>
              <p className="pl-2">{concept.description}</p>
            </Link> 
          ))}  
        </div>
      </div>
      <div className="main">
        {selectedConcept && <selectedConcept.component />}
      </div>
      <div className="footer"> 
        <div className="footer-content space-x-4">
          <Link href="https://www.buymeacoffee.com/broskicodes" target="_blank" className="">Support</Link>
          <Link href="" className="">Contribute</Link>
        </div>
      </div>
    </div>
  )
}
