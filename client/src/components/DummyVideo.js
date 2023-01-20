import React, { useState} from 'react'
import Upload from "./assets/upload.png"
import Vid from "./videos/video1.mp4"

const DummyPlayer = () => {

  const [vid, setVid] = useState(null)


  const handleChange = (event) => {
    setVid(URL.createObjectURL(event.target.files[0]))

 
  
  }
  
  return (
<>
<div>


<input id="vid-upload" type="file" accept="mp4" hidden onChange={handleChange} />

</div>
<iframe className="videoD" src={Vid}></iframe>
</>
  )
}

export default DummyPlayer