import { useEffect, useState } from "react";
import { ClientsModel } from "../../../models/ClientsModel"


const SelectClient: React.FC<{ clients: ClientsModel[], onChangeTable: any }> = ({ clients, onChangeTable }) => {
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
    const [clientSelected, setClientSelected] = useState<number>(0)
    // if (loading) return <LoadComponent />;

    const changeTextColor = ({ target }) => {
        setIsOptionSelected(true);
        setClientSelected(parseInt(target.value))
    };

    useEffect(() => {
        console.log('Entre a aqui, ', clientSelected)
        onChangeTable(clientSelected)
    }, [clientSelected])

    return (
        <div className="w-full">
            <label className="mb-3 block text-black dark:text-white">
                Clientes
            </label>
            <div className="relative w-full z-20 bg-white dark:bg-form-input">
                <select
                    onChange={(e) => {
                        changeTextColor(e);
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                        }`}
                >
                    <option value="" disabled selected className="text-body dark:text-bodydark">
                        Nombres de los clientes
                    </option> 

                    {
                        clients.map((client) => (
                            <option key={client.ID_CLIENT} value={client.ID_CLIENT}>
                                { client.NAME_CLIENT }
                            </option>
                        ))
                    }
                </select>
            </div>
        </div>
    )

}

export default SelectClient