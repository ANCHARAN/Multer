import axios from "axios";

import ImageContainer from "./imageContainer";
import React, { useRef, useState } from "react";

const Form=():React.ReactNode=>{
const [result,setResult]=useState("");
const [targetInfo, setTargetInfo]=useState<string[]>([]);
const ref=useRef<HTMLFormElement>(null)
const handleSubmit=async(event:any)=>
{
event.preventDefault()
const formData=new FormData(event.target)
console.log(formData)
const res=await axios.post('http://localhost:3000/upload',formData,{
headers:{'Content-Type':'multipart/form-data'}  
})
const result1=await res.data;
setResult(result1.data)
ref?.current?.reset()
}
return(<>
  <form ref={ref} onSubmit={handleSubmit} id="uploadForm" encType={'multipart/form-data'} >
  <label>Image -
    <input type="file" accept="image/gif, image/jpeg, image/png image/jpg image/png" name="avatar" id="avatar" placeholder="Upload your image" multiple 
    onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{
      setResult("")
      let arr=[];
      const files=e.target.files
      console.log(files)
      if(e.target.files)
      {
      for(const file of e.target.files)
        {
        arr.push(URL.createObjectURL(file))
        }
      setTargetInfo(arr)
      }
    }}
    />
    </label>  
    <button type="submit">Upload Image</button>
  </form>
  <div>{result=="success"?result:<ImageContainer imgarr={targetInfo}/>}
  </div>
  </>
)
}

export default Form
//Try to create an image component in which takes in a parameter of the e.target.files[] completely and based on its length creates the img components.
