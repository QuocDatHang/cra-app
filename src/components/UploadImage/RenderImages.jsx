import React, { useEffect, useState } from 'react'

let arr = [];

export default function UploadImages() {
    const [selectedFiles, setSelectedFiles] = useState()
    const [previews, setPreviews] = useState()

    useEffect(() => {
        if (!selectedFiles) {
            // setPreviews(undefined)
            return
        }

        selectedFiles.forEach(item => {
            const imgUrl = URL.createObjectURL(item)
            arr.push(imgUrl)
            setPreviews([...arr])
        })

        return () => {
            arr.forEach(URL.revokeObjectURL)
        }
    }, [selectedFiles])

    const handleUpload = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFiles(undefined)
            return
        }
        setSelectedFiles(Array.from(e.target.files))
    }
    console.log(previews);

    return (
        <div className='container border h-50 mt-4'>
            <input className='d-none' type="file" id='file-input' multiple={true} onChange={handleUpload} />
            <label htmlFor="file-input">
                <img src="https://www.lifewire.com/thmb/tHjH9M19MsA9gFY-qcZvKYv5oG4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
                    style={{ width: '100px', height: '100px', cursor: 'pointer' }} alt="Error Image" />
            </label>
            {previews && previews.map((preview, index) => (
                <img key={index} src={preview} style={{ width: '150px', height: '150px' }} />))
            }
        </div>
    )
}
