import WindowControls from '@components/WindowControls';
import WindowWrapper from '@hoc/WindowWrapper';
import { Download } from 'lucide-react';
import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import ReactGA from 'react-ga4';

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
    const [totalPages, setTotalPages] = useState(0);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setTotalPages(numPages);
    };

    const trackDownloadClick = () => {
        ReactGA.event({
            category: 'Resume',
            action: 'Downloaded my Resume',
            label: 'Download button',
        });
    };

    return (
        <>
            <div id="window-header" className="">
                <a
                    href="files/resume.pdf"
                    download
                    className="cursor-pointer"
                    title="Download resume"
                    onClick={() => trackDownloadClick()}>
                    <Download className="icon" />
                </a>
                <h2>Resume.pdf</h2>

                <WindowControls target="resume" />
            </div>
            <div className="overflow-y-auto h-200 bg-zinc-90">
                <Document file="files/resume.pdf" onLoadSuccess={onDocumentLoadSuccess} className={'p-1 rounded-sm'}>
                    {Array.from({ length: totalPages }, (_, i) => {
                        const pageNum = i + 1;
                        const isEven = pageNum % 2 === 0;
                        return (
                            <Page
                                key={i + 1}
                                pageNumber={i + 1}
                                renderTextLayer
                                renderAnnotationLayer
                                className={`${isEven ? 'mb-10' : 'mb-2'} bg-black shadow-lg`}
                            />
                        );
                    })}
                </Document>
            </div>
        </>
    );
};

const ResumeWindow = WindowWrapper(Resume, 'resume');

export default ResumeWindow;
