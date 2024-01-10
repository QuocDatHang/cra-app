import axios from 'axios'
import React, { useState } from 'react'
import Loading from '../Loading/Loading';
import { toast } from 'react-toastify';

let arr = [];

export default function UploadImage() {
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([])

    const handleUpload = (e) => {
        let imagesImport = Array.from(e.target.files);
        if (imagesImport.length > 0) {
            setLoading(true)
        }
        imagesImport.forEach(async (item) => {
            const formData = new FormData();
            formData.append('image', item)
            const res = await axios.post('http://localhost:8080/api/product-images', formData)
            if (res.status == '200') {
                const result = await res.data
                arr.push(result);
                setImages([...arr]);
                setLoading(false)
                toast.success('Upload successful!')
            }
            else {
                toast.error('Upload fail!')
            }
        })
    }

    const handleDelete = async (id) => {
        setLoading(true)
        arr = images.filter(image => image.id != id);
        setImages([...arr])
        const res = await axios.delete(`http://localhost:8080/api/product-images/${id}`)
        if (res.status == '200') {
            toast.success('Delete image success')
            setLoading(false)
        }
        else {
            toast.error('Delete fail!')
            setLoading(false)
        }
    }

    return (
        <div className='container d-flex border mt-4' style={{height: '165px'}}>
            {loading ? <Loading /> :
                <>
                    <input className='d-none' type="file" id='file-input' multiple={true} onChange={handleUpload} />
                    <label htmlFor="file-input">
                        <img src="https://www.lifewire.com/thmb/tHjH9M19MsA9gFY-qcZvKYv5oG4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
                            style={{ width: '160px', height: '160px', cursor: 'pointer'}} alt="Error Image" />
                    </label>
                </>
            }
            {
                images && images.map(image => (
                    <div className='m-2' key={image.id}>
                        <img src={image.fileUrl} style={{ width: '150px', height: '150px', borderRadius: '15px' }} alt="Error" />
                        <i onClick={() => handleDelete(image.id)} className='fa-solid fa-circle-minus align-top' style={{ color: 'grey', cursor: 'pointer' }} />
                    </div>
                ))
            }

        </div>
    )
}
