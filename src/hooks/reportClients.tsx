import { useEffect, useState } from "react"
import { postPDFReport } from "../services/reportClientPDF/reportClientPDFService"

export const useReportClients = ({ data }) => {

    const [result, setResult] = useState('')

    const fetchData = async () => {
        try {
            const response = await postPDFReport(data)
            return response
        } catch (e) {
            console.log('ERROR::', e)
        }
    }

    useEffect(() => {
        fetchData()
            .then((resp) => {
                setResult(resp)
            })
            .catch((e) => {
                setResult('')
            })
    }, [result])

    return {
        result
    }

}