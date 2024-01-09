import React, { useState } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


export default function TestCkEditor() {

    const [data, setData] = useState({
        content: '',
        images: []
    });



      const handleChange = (event, editor) => {
        const data = editor.current.getData();
        setData({
          ...data,
          content: data,
        });
      };
    
      return (
        <div>
          <CKEditor
            editor={ClassicEditor}
            data={data}
            // config={editorConfig}
            onReady={(editor) => {
              editor.current.on('change', handleChange);
            }}
          />
          {data.images.map((imageSrc, index) => (
            <img key={index} src={imageSrc} alt="Image" />
          ))}
        </div>
      );
}
