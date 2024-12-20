import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface ImageGridProps {
  files: File[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ files }) => (
  <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
      <h3 className="font-medium text-black dark:text-white">
        <FontAwesomeIcon icon={faImage} /> &nbsp; Imágenes Cargadas
      </h3>
    </div>
    <div className="p-6.5">
      {files.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-md border border-stroke bg-gray-100 dark:bg-gray-800"
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <FontAwesomeIcon icon={faImage} />
                <span className="text-white">Vista previa</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-48 bg-gray-100 rounded-md">
          <FontAwesomeIcon icon={faImage} className="text-gray-400 text-5xl mb-2" />
          <span className="text-gray-600">Sin imágenes</span>
        </div>
      )}
    </div>
  </div>
);

export default ImageGrid;
