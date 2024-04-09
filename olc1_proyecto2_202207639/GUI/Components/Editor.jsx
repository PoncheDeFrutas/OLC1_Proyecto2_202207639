import React, { useRef, useState } from 'react';

import Editor from '@monaco-editor/react';
import { POST } from '../Services/Api.js';

export function EditorT() {
    const editorRef = useRef(null);
    const [result,setResult] = useState("")

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        POST("http://localhost:3000/interpreter",editorRef.current.getValue()).then(res=>
        {
            console.log(res.result)
            setResult(res.result)
        })
    }

    return (
        <>
            <div style={{display:'flex',alignItems:"center"}}>
                <Editor
                    height={"60vh"}
                    width={"80vh"}
                    defaultLanguage="javascript"
                    defaultValue="// some comment"
                    theme='vs-dark'
                    onMount={handleEditorDidMount}
                />
                <textarea value={result} cols={70} rows={27} readOnly/>

            </div>
            <button onClick={showValue} style={{display:"flex",margin:"0 auto",marginTop:"5px"}}>Interpretar</button>
        </>
    );
}