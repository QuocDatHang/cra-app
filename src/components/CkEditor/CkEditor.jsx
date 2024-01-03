import React, { useState } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import HTMLReactParser from 'html-react-parser';


export default function CkEditor() {
    const [dataInput, setDataInput] = useState('')
    const handleClickBtn = () => {
        console.log("data input", dataInput);
    }

    const handleFileUpload = async (loader) => {
        const file = await loader.file;
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await fetch('http://localhost:8080/api/product-images', {
                method: 'POST',
                body: formData
            });
            if (!response.ok) {
                throw new Error('Upload failed');
            }
            const data = await response.json();
            console.log(data);
            const url = data.fileUrl;
            console.log(url);
            return url;
        } catch (error) {
            throw new Error('Upload failed');
        }
    };

    return (
        <>
            <div className="container">
                <label htmlFor="">Content:</label>
                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        // config={{
                        //     // Cấu hình tải lên tệp tin
                        //     ckfinder: {
                        //       uploadUrl: 'http://localhost:8080/api/product-images',
                        //       options: {
                        //         resourceType: 'Images',
                        //       },
                        //     },
                        //   }}
                        onReady={(editor) => {
                            // Đăng ký sự kiện tải lên tệp tin
                            editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                                return {
                                    upload: handleFileUpload(loader),
                                };
                            };
                        }}
                        onBlur={(event, editor) => {
                            const data = editor.getData();
                            setDataInput(data)
                        }}
                    />
                </div>

                <div>
                    <button type="button" className="btn btn-success mt-2" onClick={handleClickBtn}>Save</button>
                </div>
                <div className="container bg-warning w-100 mt-4">
                    <p>This is content</p>
                    {HTMLReactParser(dataInput)}
                </div>
            </div>

        </>
    )
}


