import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function UploadImage() {
    const [images, setImages] = useState([])
    const [imgUrls, setImgUrls] = useState([])

    useEffect(() => {
        if (images.length === 0) {
            return
        }
        const fetchImage = async () => {
            let arr = [];
            console.log(images.length);
            for (let i = 0; i < images.length; i++) {
                console.log('call api');
                const formData = new FormData();
                formData.append('image', images[i])
                await axios.post('http://localhost:8080/api/product-images', formData)
                    .then(res => res.data.fileUrl)
                    .then(result => {
                        console.log(result);
                        arr.push(result)
                    })
                    .catch(error => new Error(error))
            }
            setImgUrls(arr)
        }
        fetchImage();
    }, [images])


    return (
        <div className='container border h-50 mt-4'>
            <input className='d-none' type="file" id='file-input' multiple={true} onChange={e => setImages(e.target.files)} />
            <label htmlFor="file-input">
                <img src="https://www.lifewire.com/thmb/tHjH9M19MsA9gFY-qcZvKYv5oG4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
                    style={{ width: '100px', height: '100px', cursor: 'pointer' }} alt="Error Image" />
            </label>
            {
                imgUrls && imgUrls.length > 0 && imgUrls.map(imgUrl => (
                    <img key={imgUrl} src={imgUrl} style={{ width: '150px', height: '150px' }} alt="Error" />
                ))
            }
        </div>
    )
}
