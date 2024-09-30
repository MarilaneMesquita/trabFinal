// src/components/PhotoGallery.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link

const ACCESS_KEY = "XLsiO8w3dDo_v24JrMipEqiHlb6JEH7_Z456DHXNjew";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Adiciona estado para a foto selecionada

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}`
      );
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error("Erro ao buscar fotos:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${ACCESS_KEY}`
      );
      const data = await response.json();
      setPhotos(data.results || []);
      setHasSearched(data.results.length > 0);
    } catch (error) {
      console.error("Erro ao buscar fotos:", error);
      setPhotos([]);
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    fetchPhotos();
    setHasSearched(false);
  };

  const openModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="PhotoGallery">
      <h1>Galeria de Fotos</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar fotos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="button-search">
          Buscar
        </button>
        {hasSearched && photos.length > 0 && (
          <button type="button" onClick={handleReset}>
            Voltar
          </button>
        )}
      </form>
      <div className="gallery">
        {photos.length > 0 ? (
          photos.map((photo) => (
            <div
              key={photo.id}
              className="photo"
              onClick={() => openModal(photo)}
            >
              <img src={photo.urls.small} alt={photo.description} />
              <p>{photo.description || "Sem descrição"}</p>
              <p>Foto de {photo.user.name} no Unsplash</p>
              <Link to={`/photos/${photo.id}`}>
                <button>Ver Detalhes</button>
              </Link>
            </div>
          ))
        ) : (
          <div>
            <p>Nenhuma foto encontrada.</p>
            <button onClick={handleReset}>Voltar</button>
          </div>
        )}
      </div>
      {selectedPhoto && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img
              src={selectedPhoto.urls.full}
              alt={selectedPhoto.description}
            />
            <p>{selectedPhoto.description || "Sem descrição"}</p>
            <p>Foto de {selectedPhoto.user.name} no Unsplash</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
