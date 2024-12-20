const ViewImageServiceOrder = ({
    file
}) => {
    return (
        <div>
            <h1>Galería de Imágenes</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div key={1} style={{ margin: '10px' }}>
                    <img
                        src={file}
                        alt={`Imagen ${1}`}
                        style={{ width: '400px', height: '400px', objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewImageServiceOrder