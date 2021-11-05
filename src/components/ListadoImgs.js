import React from 'react';
import Imagen from './Imagen';

const ListadoImgs = ({imagenes}) => {

    return(
        <div className="col-12 p-5 row">
            {imagenes.map(img => (
                <Imagen 
                    key={img.id}
                    imagen = {img}
                />
            ) )}
        </div>
    );
};

export default ListadoImgs;