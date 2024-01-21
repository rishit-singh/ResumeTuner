"use client"

import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { Button, Tab, Tabs } from "@material-ui/core";
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
    const [tabView, setTabView] = useState(1);

    const pdfRef = useRef<HTMLInputElement | null>(null);
    const [path, setPath] = useState("");

    const md =`# Your Name\n## Contact Information\n- **Email:** your.email@example.com\n- **Phone:** (555) 123-4567\n- **LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/yourname)\n- **GitHub:** [GitHub Profile](https://github.com/yourusername)
                `; 


    const uploadFile =  async () => {
            const formData: FormData = new FormData();

            formData.append("uploaded_file", (pdfRef.current?.files as FileList)[0]);
            const response = await fetch(`http://${process.env.APIURL}/upload/resume?id=ec9b549f-b24f-4c1a-bdc2-244deee34364`, {
                method: "POST",
                mode: "cors",
                body: formData 
            });          

            console.log((await response.json())); 
        };
    
    return (
        <div className="grid grid-rows-[8vh_92vh]">
            <Header/>
            <div className="bg-[#F2F5EA]">
                <div className={"grid grid-cols-2"}>
                    <div className="flex flex-col w-full h-full justify-center items-center mt-10">
                        <Tabs value={tabView} onChange={(e, val) => setTabView(val) }>
                            <Tab label="Original" {...tabProps(0)}/>
                            <Tab label="Tuned" {...tabProps(1)}/>
                        </Tabs>

                        <Conditional Condition={() => tabView == 0}>
                            <PDFViewer Path={path}/>
                            <input type="file" ref={pdfRef} onChange={() => setPath((pdfRef.current?.files as FileList)[0].name)}></input>
                            <Button variant="contained" onClick={async () => await uploadFile()}>Upload</Button>
                        </Conditional>

                        <Conditional Condition={() => tabView == 1}>
                                <Markdown className={"prose"}>
                                    {md}
                                </Markdown>
                        </Conditional>
                    </div>
                </div>
            </div>
        </div>
    );
} 