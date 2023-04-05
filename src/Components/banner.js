import React from "react";
import bannerImg from './img/banner.png';
import './banner.css'
 
/**
 * Banner page
 * 
 * defines what is to be placed on the top of the page
 * 
 * @author Henry Schofiled
 */
function BannerPage() {
   
   return (
    <div className="BannerPage">
     <img src={bannerImg} className="bannerImg" alt="bannerImg" />
     </div>
   )
}
 
export default BannerPage;