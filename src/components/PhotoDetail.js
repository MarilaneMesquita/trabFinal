// src/components/PhotoDetail.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ACCESS_KEY = "XLsiO8w3dDo_v24JrMipEqiHlb6JEH7_Z456DHXNjew";

const PhotoDetail = () => {
  const [photo, setPhoto] = useState(null);
  const [relatedPhotos, setRelatedPhotos] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchPhotoDetails = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=${ACCESS_KEY}`
        );
        const data = await response.json();
        setPhoto(data);

        // Buscar fotos relacionadas
        const relatedResponse = await fetch(
          `https://api.unsplash.com/photos/${id}/related?client_id=${ACCESS_KEY}`
        );
        const relatedData = await relatedResponse.json();
        setRelatedPhotos(relatedData.results);
      } catch (error) {
        console.error("Erro ao buscar detalhes da foto:", error);
      }
    };

    fetchPhotoDetails();
  }, [id]);

  if (!photo) return <p>Carregando...</p>;

  return (
    <div className="photo-details">
      <h1>Detalhes da foto</h1>
      <img src={photo.urls.full} alt={photo.description} />
      <h2>{photo.description || "Sem descrição"}</h2>
      <p>Foto de {photo.user.name} no Unsplash</p>
      <p>Likes: {photo.likes}</p>
      <p>Tirado em: {new Date(photo.created_at).toLocaleDateString()}</p>
      <Link to={"/"}>
        <button> Voltar </button>
      </Link>
      <div className="wrapper-photos">
        <h1>Fotos relacionadas</h1>
        <div className="related-photos">
          {relatedPhotos.length > 0 ? (
            relatedPhotos.map((relatedPhoto) => (
              <div key={relatedPhoto.id} className="related-photo">
                <Link to={`/photos/${relatedPhoto.id}`}>
                  <img
                    src={relatedPhoto.urls.small}
                    alt={relatedPhoto.description}
                  />
                </Link>
              </div>
            ))
          ) : (
            <p>Nenhuma foto semelhante encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoDetail;
