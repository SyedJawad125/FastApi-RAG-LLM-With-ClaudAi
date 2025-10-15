import React from 'react'
import NavbarCom from "@/components/NavbarCom";
import PublicContactPageCom from "@/components/PublicContactPageCom";
import TopNavbarCom from "@/components/TopNavbarCom";
import FooterCom from "@/components/FooterCom";




const page = () => {
  return (
    <div>
      <TopNavbarCom/>
      <NavbarCom/>
      <PublicContactPageCom/>
      {/* <FooterCom/> */}
    </div>
  )
}

export default page