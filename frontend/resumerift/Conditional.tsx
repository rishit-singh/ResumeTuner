import { FC, ReactNode } from "react";

interface ConditionalProps
{
    Condition: () => boolean,
    children: ReactNode 
}

export default function Conditional({Condition, children} : ConditionalProps)
{
    if (Condition())
        return <>{children}</>;

    return (<></>);
}