"use client"

import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Button, InputLabel, Tab, Tabs, TextareaAutosize } from "@material-ui/core";
import Conditional from "../../Conditional";
import PDFViewer from "./PDFViewer";
import Markdown from "react-markdown";

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
    const [path, setPath] = useState("");

    const [resumeUploaded, setResumeUploaded] = useState(false);
    const [formPosted, setFormPosted] = useState(false);

    const [jobDescription, setJobDescription] = useState("");

    const md =`# Your Name\n## Contact Information\n- **Email:** your.email@example.com\n- **Phone:** (555) 123-4567\n- **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/yourname)\n- **GitHub:** [GitHub Profile](https://github.com/yourusername)
                `; 


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
        const response = await fetch(`http://${process.env.APIURL}/upload/job?id=id`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({"job_description": jobDescription}) 
        });          

        console.log((await response.json())); 
    };
        
    return (
        <div className="grid grid-rows-[8vh_92vh]">
            <Header/>
            <div className="bg-[#F2F5EA]">
                <div className={"grid grid-cols-2"}>
                    <div className="flex flex-col w-full h-full justify-center items-center mt-10">
                        <Conditional Condition={() => formPosted}>
                            <Tabs value={tabView} onChange={(e, val) => setTabView(val)}>
                                <Tab label="Original" {...tabProps(0)} />
                                <Tab label="Tuned" {...tabProps(1)} />
                            </Tabs>
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
                                    <input type="file" ref={pdfRef} onChange={async () => {
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
                            <Button variant="contained" onClick={async () => { await postForm(); setFormPosted(true); setTabView(1); }}>
                                Tune
                            </Button>
                        </Conditional>
                    </div>
                </div>
            </div>
        </div>
    );
} 