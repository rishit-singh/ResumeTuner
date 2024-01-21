"use client"

import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Button, InputLabel, Tab, Tabs, TextareaAutosize } from "@material-ui/core";
import Conditional from "../../Conditional";
import PDFViewer from "./PDFViewer";
import Markdown from "react-markdown";
import { Editor } from '@tinymce/tinymce-react';
import { waitForDebugger } from "inspector";
const showdown = require("showdown");

function tabProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Index()
{
    const [tabView, setTabView] = useState(0);

    const pdfRef = useRef<HTMLInputElement | null>(null);

    const [path, setPath] = useState<string>("");

    const [resumeUploaded, setResumeUploaded] = useState(false);

    const [formPosted, setFormPosted] = useState(false);

    const [jobDescription, setJobDescription] = useState("");

    const [md, setMd] = useState(`#### Loading`); 

    const [edit, setEdit] = useState(false); 

    const prevFile = useRef<File>();

    let id = "";

    const editorRef = useRef<object>();

    const uploadFile =  async () => {
            const formData: FormData = new FormData();

            id = await (await fetch(`http://${process.env.APIURL}/get_id`)).text();

            if (prevFile.current === undefined)
                prevFile.current = (pdfRef.current?.files as FileList)[0];

            formData.append("uploaded_file", prevFile.current);
            const response = await fetch(`http://${process.env.APIURL}/upload/resume?id=${id}`, {
                method: "POST",
                mode: "cors",
                body: formData 
            });          

            console.log((await response.json())); 
        };
        
    const postForm = async () => {
        const response = await fetch(`http://${process.env.APIURL}/upload/job?id=${id}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"job_description": jobDescription}) 
        });          

        console.log((await response.json())); 
    };

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([md], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = `tunedresume_${Date.now().toString()}.md`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
      }
    

    // if (formPosted)
        useEffect(() => {
            let interval: NodeJS.Timeout;
            (async () => {
                interval = setInterval(async () => {
                    try{
                        const result = (await (await fetch(`http://${process.env.APIURL}/job_state?id=id`)).json()).state[0].Result.join("");                
                        
                        setMd(result);
                    }
                    catch (e)
                    {
                    }
                }, 500)   
            })();

            return () => {
                clearInterval(interval);
            }
        }, [formPosted])

    
    const converter = new showdown.Converter();

    return (
        <div className="grid grid-rows-[8vh_92vh] bg-[#F2F5EA]">
            <Header/>
            <div className="bg-[#F2F5EA]">
                <div className={"grid grid-cols-2 bg-[#F2F5EA]"}>
                    <div className="flex flex-col w-full h-full justify-center items-center mt-10 bg-[#F2F5EA]">
                        <Conditional Condition={() => formPosted}>
                           <div className="flex flex-row gap-3"> 
                                <Tabs value={tabView} onChange={(e, val) => setTabView(val)}>
                                    <Tab label="Original" {...tabProps(0)} />
                                    <Tab label="Tuned" {...tabProps(1)} />
                                </Tabs>
                                <Conditional Condition={() => tabView == 1}>
                                    <Button variant="contained" onClick={() => setEdit(!edit)}>{(edit) ? "Preview" : "Edit"}</Button>
                                    <Button variant="contained" onClick={downloadTxtFile}>Save</Button>
                                </Conditional>
                            </div>
                        </Conditional>
                        <Conditional Condition={() => !formPosted}>
                            <Tabs value={tabView} onChange={(e, val) => setTabView(val)}>
                                <Tab label="Original" {...tabProps(0)} />
                            </Tabs>
                        </Conditional>

                        <Conditional Condition={() => tabView == 0}>
                            <Conditional Condition={() => path != ""}>
                                <div className={"mt-1  h-full"}>
                                    <PDFViewer Path={path} />
                                </div>
                            </Conditional>
                            <Conditional Condition={() => path == ""}>
                                <div className={"mt-1  h-full"}>
                                    No file selected
                                </div>
                            </Conditional>
                            <input
                                type="file"
                                hidden
                            />

                            <div className="mt-2 flex flex-row gap-2">
                                <span className="self-center">
                                    <InputLabel>{path}</InputLabel>
                                </span>
                                <Button variant="contained" component="label">
                                    <input type="file" ref={pdfRef} onChange={async (e) => {
                                            setPath((pdfRef.current?.files as FileList)[0].name);
                                            await uploadFile(); 
                                            setResumeUploaded(true);
                                        }} hidden/>Select File
                                </Button>
                            </div>
                        </Conditional>

                        <Conditional Condition={() => tabView == 1 && !edit}>
                            <Markdown className={"prose m-2 flex flex-col gap-1 overflow-y-auto max-h-screen h-[80vh]"}>
                                {md}
                            </Markdown>
                        </Conditional>
                        <Conditional Condition={() => tabView == 1 && edit}>
                            <Editor
                                apiKey="84xd6fx93webor1eyl9thqyjj945c9h2zegivy1fkosco9db"
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue={converter.makeHtml(md)} 
                                plugins="textpattern"
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor export ',
                                        'searchreplace visualblocks code fullscreen textpattern',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    textpattern_patterns: [
                                        {start: '*', end: '*', format: 'italic'},
                                        {start: '**', end: '**', format: 'bold'},
                                        {start: '#', format: 'h1'},
                                        {start: '##', format: 'h2'},
                                        {start: '###', format: 'h3'},
                                        {start: '####', format: 'h4'},
                                        {start: '#####', format: 'h5'},
                                        {start: '######', format: 'h6'},
                                        {start: '1. ', cmd: 'InsertOrderedList'},
                                        {start: '* ', cmd: 'InsertUnorderedList'},
                                        {start: '- ', cmd: 'InsertUnorderedList'}
                                     ]
                                }}
                            />
                        </Conditional>
                    </div>
                    <div className="flex flex-col w-full h-full justify-center items-center gap-5 mt-10">
                        <TextareaAutosize minRows={6} cols={70} placeholder="Enter your job description" style={{borderRadius: 5, padding: 10, resize: "vertical", maxHeight: "300px", minHeight: "200px"}}
                            onChange={(e) => {setJobDescription(e.target.value); console.log(jobDescription);}}/>
                        <Conditional Condition={(() => jobDescription != "" && resumeUploaded)}>
                            <div className={"flex flex-row gap-3"}>
                            {/* <Conditional Condition={(() => jobDescription != "" && resumeUploaded && formPosted)}> */}
                                {/* <Button variant="contained" onClick={async () => { await uploadFile(); await postForm(); }}>
                                    Regenerate
                                </Button> */}
                            {/* </Conditional> */}
                            <Button variant="contained" onClick={async () => { await postForm(); setEdit(false); setFormPosted(true); setTabView(1); console.log(md); }}>
                                Tune
                            </Button>
                            </div>
                        </Conditional>
                    </div>
                </div>
            </div>
        </div>
    );
} 