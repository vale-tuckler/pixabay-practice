import React from 'react';
import ListadoImgs from './ListadoImgs';

const Imagen  = ({imagen}) => {

    //Extraer las variables
    const { largeImageURL, likes, previewURL, tags, views, } = imagen;

    return(
        <div className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className = "card">
                <img src = {previewURL} alt={tags} className = "card-img-top" />

                <div className="card-body">
                    <div className="card-text">{likes} Me Gusta</div>
                    <div className="card-text">{views} Vistas</div>
                </div>

                <div className="card-footer">
                    <a 
                        href={largeImageURL}
                        target="_blank"
                        rel = "noopener noreferrer"
                        className = "btn btn-success btn-block"
                    >Ver imagen</a>
                </div>
            </div>
        </div>
    );    
};

export default Imagen;