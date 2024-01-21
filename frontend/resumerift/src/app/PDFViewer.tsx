interface PDFViewerProps
{
    Path: string 
}

export default function PDFViewer({Path} : PDFViewerProps)
{
    return (
        <>
            <iframe src={Path} width="100%" height="500px"/>
        </>
    );
}