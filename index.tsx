import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import * as ReactDOM from 'react-dom';
import { usePdf } from '@mikecousins/react-pdf';

const GET_PDF_API_ENDPOINT = 'http://127.0.0.1:50991/';

type ApiResponse = {
    /** filename */
    name: string;
    /** base64 encoded pdf */
    bin: string;
}

type PdfRenderProps = {
    file: string;
};

const PdfRender: React.FC<PdfRenderProps> = ({ file }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { pdfDocument, pdfPage } = usePdf({
        file,
        canvasRef,
    });

    return (
        <div style={{ border: '1px solid black' }}>
            <canvas ref={canvasRef} />
        </div>
    );
};

const App: React.FC = () => {
    const [file, setFile] = useState<string | null>(null);

    useEffect(() => {
        fetch(GET_PDF_API_ENDPOINT)
            .then(response => response.json())
            .then((data: ApiResponse) => {
                setFile(`data:application/pdf;base64,${data.bin}`);
            });
    }, []);

    return file ? <PdfRender file={file} /> : <div>loading...</div>;
};

ReactDOM.render(<App />, document.querySelector('#app'));
