import React, { useRef, useEffect } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import RawTool from '@editorjs/raw'
//import ImageTool from '@editorjs/image'
import axios from 'axios'
import { useGlobalContext } from '../hooks/useGlobalContext'

type TEditorProp = {
    blockdata: any;
}

const Editor = ({ blockdata }: TEditorProp) => {
    console.log(blockdata)
    const {setDescription} = useGlobalContext()
    const DEFAULT_INITIAL_DATA = {
        "time": new Date().getTime(),
        "blocks": [
            {
                "type": "header",
                "data": {
                    "text": "Let's start a awesome blog.🥳",
                    "level": 1
                }
            },
        ]
    }
    const ejInstance = useRef();
    const initEditor = (initData?: any) => {
        const editor = new EditorJS({
            holder: "editorjs",
            onReady: () => {
                ejInstance.current = editor
            },
            autofocus: true,
            data: initData || DEFAULT_INITIAL_DATA,
            onChange: async () => {
                let content = await editor.saver.save()
                let blogContent = JSON.stringify(content)
                setDescription(blogContent)
            },
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['link'],
                    config: {
                        placeholder: "Header"
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true
                },
                raw: {
                    class: RawTool,
                    inlineToolbar: true
                },
                // image:{
                //     class:ImageTool,
                //     config:{
                //         uploader:{
                //             async uploadByFile(image:any){
                //                 const formData = new FormData();
                //                 formData.append("image",image);
                //                 const resp = await axios.post(
                //                     `http://192.168.1.227:5000/api/blog-image`, 
                //                     formData,
                //                     {
                //                         headers: {
                //                             'Authorization': `c05a13fc-2e9a-4dbb-b31e-a34f7b7afe5d`
                //                         }
                //                     }
                //                 );
                //                 console.log(resp.data.data)
                //                 if(resp.data.data.success === 1){
                //                     return resp.data.data;
                //                 }
                //             }
                //         }
                //     }
                // }
            },
        });
    }



    useEffect(() => {
        if (ejInstance.current === null) {
            let parsedData;
            try {
                parsedData = blockdata ? JSON.parse(blockdata) : undefined;
                console.log(parsedData)
            } catch (e) {
                console.error("Error parsing blockdata:", e);
                parsedData = undefined;
            }
            initEditor(parsedData);
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);


    return (
        <div id='editorjs' className='bg-slate-100 border-[1px] border-slate-300 font-grot rounded-md px-6 py-4 font-urbanist'></div>
    )
}

export default Editor