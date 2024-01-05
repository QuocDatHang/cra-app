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

    // const imageConfiguration = {
    //     resizeOptions: [
    //         {
    //             name: 'resizeImage:original',
    //             value: null,
    //             label: 'Original'
    //         },
    //         {
    //             name: 'resizeImage:40',
    //             value: '40',
    //             label: '40%'
    //         },
    //         {
    //             name: 'resizeImage:60',
    //             value: '60',
    //             label: '60%'
    //         }
    //     ],
    //     toolbar: ['resizeImage'],
    // }


    // const handleFileUpload = async (loader) => {
    //     const file = await loader.file;
    //     const formData = new FormData();
    //     formData.append('image', file);
    //     try {
    //         const response = await fetch('http://localhost:8080/api/product-images', {
    //             method: 'POST',
    //             body: formData
    //         });
    //         if (!response.ok) {
    //             throw new Error('Upload failed');
    //         }
    //         const result = await response.json();
    //         const url = result.fileUrl;
    //         return `http://localhost:8080/api/product-images/${url}`
    //         // const editorInstance = ClassicEditor.instances[0];
    //         // const imageHtml = `<img src="${url}" alt="Uploaded Image">`;
    //         // editorInstance.setData(editorInstance.getData() + imageHtml);
    //         // const imageHtml = `<img src="${url}" alt="Uploaded Image">`;
    //         // setDataInput(imageHtml)
    //         // const data = new DataTransfer();
    //         // data.items.add(new File([file], url));
    //         // loader.file = data.files[0];
    //         // return loader.upload();
    //     } catch (error) {
    //         throw new Error('Upload failed');
    //     }
    // };

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
                        data=""
                        config={{
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


