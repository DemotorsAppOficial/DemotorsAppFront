import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faImage } from '@fortawesome/free-solid-svg-icons';
import SelectCategoryImages from '../../../components/Forms/SelectGroup/SelectCategoryImages';
interface FileUploadProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filesLength: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange, filesLength }) => (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
                <FontAwesomeIcon icon={faImage} /> &nbsp; Carga de Imágenes
            </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
        <SelectCategoryImages />

            <div>
                <label className="mb-3 block text-black dark:text-white">
                    Seleccionar tus Imágenes
                </label>
                <input
                    accept="image/*"
                    multiple
                    type="file"
                    className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    onChange={onFileChange}
                />

            </div>

            {filesLength > 0 && (
                <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2.5 rounded-md bg-meta-3 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    <FontAwesomeIcon icon={faUpload} /> &nbsp; Cargar Imágenes
                </button>
            )}
        </div>
    </div>
);

export default FileUpload;
