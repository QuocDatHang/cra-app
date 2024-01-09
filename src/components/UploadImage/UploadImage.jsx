import axios from 'axios'
import React, { useEffect, useState } from 'react'

let arr = [];

export default function UploadImage() {
    const [images, setImages] = useState([])
    const [imgUrls, setImgUrls] = useState([])

    // useEffect(() => {
    //     if (images.length === 0) {
    //         return
    //     }
    //     const fetchImage = async () => {
    //         for (let i = 0; i < images.length; i++) {
    //             const formData = new FormData();
    //             formData.append('image', images[i])
    //             await axios.post('http://localhost:8080/api/product-images', formData)
    //                 .then(res => res.data.fileUrl)
    //                 .then(result => {
    //                     arr.push(result)
    //                     console.log('fetch success');
    //                 })
    //                 .catch(error => new Error(error))
    //         }
    //         setImgUrls(arr)
    //     }
    //     fetchImage();
    // }, [images])

    const handleUpload = async (e) => {
        let imagesImport = Array.from(e.target.files);
        console.log(imagesImport);

        for (let i = 0; i < imagesImport.length; i++) {
            const formData = new FormData();
            formData.append('image', imagesImport[i])
            const res = await axios.post('http://localhost:8080/api/product-images', formData)
            const result = await res.data.fileUrl
            arr.push(result)
            console.log('fetch success');
        }
        setImgUrls(arr);
    }
    console.log(imgUrls);


    return (
        <div className='container border h-50 mt-4'>
            <input className='d-none' type="file" id='file-input' multiple={true} onChange={e => handleUpload(e)} />
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
