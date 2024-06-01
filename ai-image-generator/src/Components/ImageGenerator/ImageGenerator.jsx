import React, { useRef, useState } from 'react';
import './ImageGenerator.css';
import defaultImage from '../../Assets/default.svg'

const apiKey = process.env.REACT_APP_API_KEY;

function ImageGenerator() {
    const [image_url, setImage_url] = useState("/");
    const [loading, setLoading] = useState(false);
    let inputRef = useRef(null);
    const imageGenerator = async () => {
        if (inputRef.current.value==="") {
            return 0;
        }
        setLoading(true)
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"Post",
                headers:{
                    "content-Type":"application/json",
                    Authorization:
                        `Bearer ${apiKey}`,
                    "User-Agent":"Chrome",
                },
                body:JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n:1,
                    size:"512x512",
                }),
            }
        );
        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false)
    }
  return (
    <div className='ai-image-generator'>
        <div className='header'>
            AI Image <span>Generator</span>
        </div>
        <div className="img-loading">
            <div className="image">
                <img src={image_url==="/" ? defaultImage : image_url} alt="" />
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}>

                    </div>
                    <div className={loading ? "loading-text": "display-none"}>
                        Loading...
                    </div>
                </div>
            </div>
        </div>
        <div className="search-box">
            <input type='text' ref={inputRef} className='search-input' placeholder='What do you want to see?. '/>
            <div className="generate-btn" onClick={()=>{imageGenerator()}}>
                Generate
            </div>

        </div>
    </div>
  )
}

export default ImageGenerator