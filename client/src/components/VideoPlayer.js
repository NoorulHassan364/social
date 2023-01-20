import React, { useState} from 'react'
import Upload from "./assets/upload.png"

const VideoPlayer = () => {

  const [vid, setVid] = useState(null)
  const [show, setShow] = useState(true);

  const handleChange = (event) => {
    setVid(URL.createObjectURL(event.target.files[0]))

 
  
  }
  const closer = () => {
    setShow(false)
   }

  return (
<>
<div>
  <label htmlFor="vid-upload" onClick={closer}>
  {show && ( <i className='button' > <span className='uploadWrap'><img className="Upload" src={Upload}/>Upload a video</span></i>
     )}  </label>
<input id="vid-upload" type="file" accept="mp4"hidden onChange={handleChange} />
</div>
<iframe className="video" src={vid}></iframe>


</>
  )
}

export default VideoPlayer