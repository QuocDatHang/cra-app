import React, { useState } from 'react';

import { CKEditor } from '@ckeditor/ckeditor5-react';

import HTMLReactParser from 'html-react-parser';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default function CkEditor() {
    const [dataInput, setDataInput] = useState('')
    const handleClickBtn = () => {
        console.log("data input", dataInput);
    }

    function handleFileUpload(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append('image', file);
                        axios.post('http://localhost:8080/api/product-images', body, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })
                            .then((response) => {
                                console.log('my res', response.data.fileUrl);
                                resolve({ default: `${response.data.fileUrl}` })
                            })
                            .catch((error) => { 
                                console.log(error);
                            });
                    })
                })
            }
        }
    }

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return handleFileUpload(loader);
        };
    }

    return (
        <>
            <div className="container">
                <label htmlFor="">Content:</label>
                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor 5!</p>"
                        config={{
                            // plugins: [ImageResize],
                            // toolbar: ['image'],
                            extraPlugins: [uploadPlugin]
                        }}

                        onReady={(editor) => {
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


