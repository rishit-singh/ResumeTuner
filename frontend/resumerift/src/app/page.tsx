"use client"

import React, { useState } from "react";
import Header from "./Header";
import { Tab, Tabs } from "@material-ui/core";

function tabProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}
  
export default function Index()
{
    const [tabView, setTabView] = useState(0);

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
                    </div>
                </div>
            </div>
        </div>
    );
}