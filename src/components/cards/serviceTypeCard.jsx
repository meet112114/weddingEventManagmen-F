import React from 'react'
import Cat from "../../assets/web-images/chef.png"
import Dec from "../../assets/web-images/decoration.png"
import Inv from "../../assets/web-images/invitation.png"
import Cam from "../../assets/web-images/camera.png"
import Mak from "../../assets/web-images/makeup.png"
import Jwl from "../../assets/web-images/jewellery.png"

import './serviceTypeCard.css'

const ServiceTypeCard = () => {

    

  return (
    <div className='S-C-C'>
        <div className='S-C-C-box'>
            <img className='S-C-C-img' src={Cat}/>
            <h3 className='S-C-C-text'>Cateres</h3>
        </div>

        <div className='S-C-C-box'>
            <img className='S-C-C-img' src={Dec}/>
            <h3 className='S-C-C-text'>Decorators</h3>
        </div>

        <div className='S-C-C-box'>
            <img className='S-C-C-img' src={Inv}/>
            <h3 className='S-C-C-text'>Invitations</h3>
        </div>

        <div className='S-C-C-box'>
            <img className='S-C-C-img' src={Cam}/>
            <h3 className='S-C-C-text'>Photography</h3>
        </div>

        <div className='S-C-C-box'>
            <img className='S-C-C-img' src={Mak}/>
            <h3 className='S-C-C-text'>Makeup</h3>
        </div>

        <div className='S-C-C-box'>
            <img className='S-C-C-img' src={Jwl}/>
            <h3 className='S-C-C-text'>Jwellery</h3>
        </div>
    </div>
  )
}

export default ServiceTypeCard