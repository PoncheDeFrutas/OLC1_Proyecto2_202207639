import React, { useRef, useState } from 'react';

import Editor from '@monaco-editor/react';
import { POST, GET } from '../Services/Api.js';
import { Graphviz } from 'graphviz-react';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";


export function EditorT() {
    const editorRef = useRef(null);
    const [editorTemp, setEditorTemp] = useState("")
    const [result,setResult] = useState("")
    const [AST, setAST] = useState("")
    const [ERRORS, setERRORS] = useState("")
    const [Simbols, setSimbols] = useState("")
    const [view, setView] = useState("editor");

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        POST("http://localhost:3000/interpreter",editorRef.current.getValue()).then(res=>
        {
            setEditorTemp(editorRef.current.getValue())
            setAST("")
            setERRORS("")
            setSimbols("")
            setResult(res.result)
            setView("editor");
        })
    }

    function editor() {
        if (editorTemp) {
            setTimeout(() => {
                editorRef.current.setValue(editorTemp);
            }, 1000);
        } else {
            console.log("No hay texto para colocar en el editor.");
        }
        setView("editor");
    }

    function getAst() {
        if (AST === ""){
            GET("http://localhost:3000/ast").then(res=>
            {
                setAST(res.result)
                setView("ast");
            })
        } else{
            setView("ast");
        }
    }

    function getErrors(){
        if (ERRORS === ""){
            GET("http://localhost:3000/errors").then(res=>
            {
                setERRORS(res.result)
                setView("errors");
            })
        } else{
            setView("errors");
        }
    }

    function getSimbols(){
        if (Simbols === ""){
            GET("http://localhost:3000/simbols").then(res=>
            {
                setSimbols(res.result)
                setView("simbols");
            })
        } else{
            setView("simbols");
        }
    }

    function newArchive(){
        setResult("")
        setAST("")
        setERRORS("")
        setSimbols("")
        editorRef.current.setValue("")
        setView("editor");

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
        setView("editor");

    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                <button onClick={newArchive}>Nuevo Archivo</button>
                <button onClick={saveFile}>Guardar</button>
                <button onClick={editor}>Editor</button>
                <label htmlFor="file-upload" style={{display: 'inline-block', padding: '10px', backgroundColor: '#000000', color: 'white', cursor: 'pointer'}}>
                    Subir Archivo
                </label>
                <input id="file-upload" type="file" accept=".sc" onChange={openFile} style={{display: 'none'}}/>
                <button onClick={getErrors}>Errores</button>
                <button onClick={getSimbols}>Simbolos</button>
                <button onClick={showValue}>Interpretar</button>
                <button onClick={getAst}>AST</button>
            </div>

            {view === "editor" && (
                <div style={{display: 'flex', alignItems: "center"}}>
                    <Editor
                        height={"80vh"}
                        width={"50vw"}
                        defaultLanguage="javascript"
                        defaultValue="// some comment"
                        theme='vs-dark'
                        onMount={handleEditorDidMount}
                    />
                    <textarea value={result} cols={70} rows={35} readOnly/>
                </div>
            )}

            {view === "ast" && (
                <div style={{width: '85vw', height: '500px'}}>
                    <TransformWrapper
                        defaultScale={1}
                        defaultPositionX={0}
                        defaultPositionY={0}
                        maxScale={100}
                    >
                        {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                            <React.Fragment>
                                <div className="tools">
                                    <button onClick={() => zoomIn()}>+</button>
                                    <button onClick={() => zoomOut()}>-</button>
                                    <button onClick={() => resetTransform()}>x</button>
                                </div>
                                <TransformComponent>
                                    <div style={{width: '95vw', height: '500px', overflow: 'auto'}}>
                                        {AST && <Graphviz dot={AST}/>}
                                    </div>
                                </TransformComponent>
                            </React.Fragment>
                        )}
                    </TransformWrapper>
                </div>
            )}

            {view === "errors" && <div dangerouslySetInnerHTML={{__html: ERRORS}}/>}
            {view === "simbols" && <div dangerouslySetInnerHTML={{__html: Simbols}}/>}
        </>
    );
}