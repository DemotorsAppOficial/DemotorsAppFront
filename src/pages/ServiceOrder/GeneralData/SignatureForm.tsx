import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { faPrint, faSignature, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { pdf } from '@react-pdf/renderer';
import { MyDocument, convertImageToBase64 } from '../../../hooks/usePDFDocument';
import Logo from '../../../images/logo/demotors_logo.png';
import LoadComponent from '../../../components/Load/LoadComponent';

const SignatureForm = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
    const [, setSignatureBase64] = useState<string | null>(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const COLOR_PINCEL = 'gray';
    const GROSOR = 2;

    const answers = useSelector((state: RootState) => state.questionForm.answers);

    const obtenerXReal = (clientX: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return 0;
        const rect = canvas.getBoundingClientRect();
        return clientX - rect.left;
    };

    const obtenerYReal = (clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return 0;
        const rect = canvas.getBoundingClientRect();
        return clientY - rect.top;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            setContext(ctx);
            canvas.width = canvas.parentElement?.clientWidth || 0;
            canvas.height = canvas.parentElement?.clientHeight || 0;
        }
    }, []);

    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = canvas.parentElement?.clientWidth || 0;
                canvas.height = canvas.parentElement?.clientHeight || 0;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const preventDefault = (e: Event) => e.preventDefault();

    const handleTouchStart = (evento: React.TouchEvent<HTMLCanvasElement>) => {
        if (!context) return;
        const touch = evento.touches[0];
        const xActual = obtenerXReal(touch.clientX);
        const yActual = obtenerYReal(touch.clientY);
        context.beginPath();
        context.fillStyle = COLOR_PINCEL;
        context.fillRect(xActual, yActual, GROSOR, GROSOR);
        context.closePath();
        setLastPosition({ x: xActual, y: yActual });
        setIsDrawing(true);
        window.addEventListener('touchmove', preventDefault, { passive: false });
        window.addEventListener('scroll', preventDefault, { passive: false });
    };

    const handleTouchMove = (evento: React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !context) return;
        const touch = evento.touches[0];
        const xActual = obtenerXReal(touch.clientX);
        const yActual = obtenerYReal(touch.clientY);
        context.beginPath();
        context.moveTo(lastPosition.x, lastPosition.y);
        context.lineTo(xActual, yActual);
        context.strokeStyle = COLOR_PINCEL;
        context.lineWidth = GROSOR;
        context.stroke();
        context.closePath();
        setLastPosition({ x: xActual, y: yActual });
        evento.preventDefault();
    };

    const handleTouchEndOrCancel = () => {
        setIsDrawing(false);
        window.removeEventListener('touchmove', preventDefault);
        window.removeEventListener('scroll', preventDefault);
    };

    const handleMouseDown = (evento: React.MouseEvent<HTMLCanvasElement>) => {
        if (!context) return;

        const xActual = obtenerXReal(evento.clientX);
        const yActual = obtenerYReal(evento.clientY);
        context.beginPath();
        context.fillStyle = COLOR_PINCEL;
        context.fillRect(xActual, yActual, GROSOR, GROSOR);
        context.closePath();
        setLastPosition({ x: xActual, y: yActual });
        setIsDrawing(true);
        window.addEventListener('mousemove', preventDefault, { passive: false });
        window.addEventListener('scroll', preventDefault, { passive: false });
    };

    const handleMouseMove = (evento: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing || !context) return;

        const xActual = obtenerXReal(evento.clientX);
        const yActual = obtenerYReal(evento.clientY);
        context.beginPath();
        context.moveTo(lastPosition.x, lastPosition.y);
        context.lineTo(xActual, yActual);
        context.strokeStyle = COLOR_PINCEL;
        context.lineWidth = GROSOR;
        context.stroke();
        context.closePath();
        setLastPosition({ x: xActual, y: yActual });
    };

    const handleMouseUpOrOut = () => {
        setIsDrawing(false);
        window.removeEventListener('mousemove', preventDefault);
        window.removeEventListener('scroll', preventDefault);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas && context) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const getCanvasBase64 = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            return canvas.toDataURL('image/png');
        }
        return '';
    };

    const handlePrint = async () => {
        setIsGeneratingPDF(true);
        const base64Signature = getCanvasBase64();
        setSignatureBase64(base64Signature);
    
        try {
            const logoBase64 = await convertImageToBase64(Logo);
            const document = <MyDocument logoBase64={logoBase64 || ""} signatureBase64={base64Signature || ""} answers={answers} />;
            const pdfBlob = await pdf(document).toBlob();
            const url = URL.createObjectURL(pdfBlob);
    
            const link = (window.document as Document).createElement('a');
            link.href = url;
            link.download = 'orden-servicio.pdf';
            link.click();
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    <FontAwesomeIcon icon={faSignature} /> &nbsp; Firma Orden de Servicio
                </h3>
            </div>
            <form action="#">
                <div className="p-6.5">
                    <div className="mb-4.5">
                        <canvas
                            id='canvas'
                            ref={canvasRef}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '25vh',
                                border: '0.5px solid #FFF'
                            }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUpOrOut}
                            onMouseOut={handleMouseUpOrOut}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEndOrCancel}
                            onTouchCancel={handleTouchEndOrCancel}
                        ></canvas>
                    </div>

                    <div className="flex justify-end gap-4.5 mb-5">
                        <button
                            type="button"
                            className="flex justify-center rounded border border-red-600 bg-red-600 py-2 px-6 font-medium text-white hover:bg-red-700 hover:shadow-lg dark:border-red-800 dark:bg-red-800 dark:text-white"
                            onClick={clearCanvas}
                        >
                            Limpiar &nbsp;
                            <FontAwesomeIcon icon={faTrash} style={{ marginTop: '5px' }} />
                        </button>
                        <button
                            type="button"
                            className="flex justify-center rounded border border-primary bg-primary py-2 px-6 font-medium text-white hover:bg-opacity-90 hover:shadow-lg"
                            onClick={handlePrint}
                            disabled={isGeneratingPDF}
                        >
                            Imprimir &nbsp;
                            {isGeneratingPDF ? <LoadComponent /> : <FontAwesomeIcon icon={faPrint} />}
                        </button>
                    </div>
                </div>
            </form>
            {isGeneratingPDF && <LoadComponent />}
        </div>
    );
};

export default SignatureForm;
