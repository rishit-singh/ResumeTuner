"use client"

import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Button, InputLabel, Tab, Tabs, TextareaAutosize } from "@material-ui/core";
import Conditional from "../../Conditional";
import PDFViewer from "./PDFViewer";
import Markdown from "react-markdown";
import { waitForDebugger } from "inspector";

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

    let id = "";

    const uploadFile =  async () => {
            const formData: FormData = new FormData();

            id = await (await fetch(`http://${process.env.APIURL}/get_id`)).text();

            formData.append("uploaded_file", (pdfRef.current?.files as FileList)[0]);
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
                                <Button variant="contained" onClick={downloadTxtFile}>Save</Button>
                            </div>
                        </Conditional>
                        <Conditional Condition={() => !formPosted}>
                            <Tabs value={tabView} onChange={(e, val) => setTabView(val)}>
                                <Tab label="Original" {...tabProps(0)} />
                            </Tabs>
                        </Conditional>

                        <Conditional Condition={() => tabView == 0}>
                            <div className={"mt-1  h-full"}>
                                <PDFViewer Path={path} />
                            </div>
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

                        <Conditional Condition={() => tabView == 1}>
                                <Markdown className={"prose"}>
                                    {md}
                                </Markdown>
                        </Conditional>
                    </div>
                    <div className="flex flex-col w-full h-full justify-center items-center gap-5 mt-10">
                        <TextareaAutosize minRows={6} cols={70} placeholder="Enter your job description" style={{borderRadius: 5, padding: 10}}
                            onChange={(e) => {setJobDescription(e.target.value); console.log(jobDescription);}}/>
                        <Conditional Condition={(() => jobDescription != "" && resumeUploaded)}>
                            <div className={"flex flex-row"}>
                            <Conditional Condition={(() => jobDescription != "" && resumeUploaded && formPosted)}>
                                <Button variant="contained" onClick={async () => { await uploadFile(); await postForm(); }}>
                                    Regenerate
                                </Button>
                            </Conditional>
                            <Button variant="contained" onClick={async () => { await postForm(); setFormPosted(true); setTabView(1); console.log(md); }}>
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