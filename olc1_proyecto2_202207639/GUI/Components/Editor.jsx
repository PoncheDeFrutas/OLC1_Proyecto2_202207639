import React, { useRef, useState } from 'react';

import Editor from '@monaco-editor/react';
import { POST, GET } from '../Services/Api.js';
import { Graphviz } from 'graphviz-react';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";


export function EditorT() {
    const editorRef = useRef(null);
    const [result,setResult] = useState("")
    const [AST, setAST] = useState("")
    const [ERRORS, setERRORS] = useState("")
    const [Simbols, setSimbols] = useState("")
    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        POST("http://localhost:3000/interpreter",editorRef.current.getValue()).then(res=>
        {
            console.log(res.result)
            setAST("")
            setERRORS("")
            setSimbols("")
            setResult(res.result)
        })
    }

    function getAst() {
        GET("http://localhost:3000/ast").then(res=>
        {
            console.log("AST")
            console.log(res.result)
            setAST(res.result)
        })
    }

    function getErrors(){
        GET("http://localhost:3000/errors").then(res=>
        {
            console.log("Errores")
            console.log(res.result)
            setERRORS(res.result)
        })
    }

    function getSimbols(){
        GET("http://localhost:3000/simbols").then(res=>
        {
            console.log("Simbolos")
            console.log(res.result)
            setSimbols(res.result)
        })
    }

    function newArchive(){
        setResult("")
        setAST("")
        setERRORS("")
        setSimbols("")
        editorRef.current.setValue("")
    }

    function saveFile() {
        const fileName = prompt("Por favor, ingresa el nombre del archivo:");
        if (fileName) {
            const content = editorRef.current.getValue();
            const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName + '.sc';
            link.click();
            URL.revokeObjectURL(url);
        }
    }

    function openFile(event) {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.sc')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                editorRef.current.setValue(e.target.result);
            };
            reader.readAsText(file);
        } else {
            console.log("No se seleccionó un archivo .sc");
        }
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                <button onClick={newArchive}>Nuevo Archivo</button>
                <button onClick={saveFile}>Guardar</button>
                <input type="file" accept=".sc" onChange={openFile}/>
                <button onClick={getErrors}>Errores</button>
                <button onClick={getSimbols}>Simbolos</button>
                <button onClick={showValue}>Interpretar</button>
                <button onClick={getAst}>AST</button>
            </div>

            <div style={{display: 'flex', alignItems: "center"}}>
                <Editor
                    height={"80vh"}
                    width={"50vw"}
                    defaultLanguage="javascript"
                    defaultValue="// some comment"
                    theme='vs-dark'
                    onMount={handleEditorDidMount}
                />
                <textarea value={result} cols={70} rows={27} readOnly/>
            </div>


            <div style={{width: '90vw', height: '500px'}}>
                <TransformWrapper
                    defaultScale={1}
                    defaultPositionX={0}
                    defaultPositionY={0}
                    maxScale={20}
                >
                    {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                        <React.Fragment>
                            <div className="tools">
                                <button onClick={() => zoomIn()}>+</button>
                                <button onClick={() => zoomOut()}>-</button>
                                <button onClick={() => resetTransform()}>x</button>
                            </div>
                            <TransformComponent>
                                <div style={{width: '80vw', height: '500px', overflow: 'auto'}}>
                                    {AST && <Graphviz dot={AST}/>}
                                </div>
                            </TransformComponent>
                        </React.Fragment>
                    )}
                </TransformWrapper>
            </div>
            <div dangerouslySetInnerHTML={{__html: ERRORS}}/>
            <div dangerouslySetInnerHTML={{__html: Simbols}}/>
        </>
    );
}