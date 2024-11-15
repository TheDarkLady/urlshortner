import React from 'react'

const Linkcard = ({url, fetchUrls}) => {
  return (

    <div>
        {console.log("Image", url?.qr)};
      <img src={url?.qr} alt="qr code"/>
    </div>
  )
}

export default Linkcard
