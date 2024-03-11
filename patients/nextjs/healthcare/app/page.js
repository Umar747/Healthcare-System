"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Doctor from "./_components/Doctor";
import Search from "./_components/SearchDoctors";
import SearchDoctors from "./_components/SearchDoctors";
import DoctorsList from "./_components/DoctorsList";
import Api from "./_category/Api";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const[doctorsList, setDoctorsList]=useState([])
  useEffect(()=>{
    getDoctorsList();
  }, [])

  const getDoctorsList=()=>{
    Api.getDoctorsList().then(resp=>{
      console.log(resp.data.data);
      setDoctorsList(resp.data.data);
    })
  }

  return (
    <div>
      <Doctor/>
      <SearchDoctors/>
      <DoctorsList doctorsList={doctorsList}/>
    </div>
  );
}
