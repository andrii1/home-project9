import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { apiURL } from '../../apiURL';
import './LandingPage.Style.css';

export const LandingPage = () => {
  const [exampleResources, setExampleResources] = useState([]);
  const [images, setImages] = useState([]);
  useEffect(() => {
    async function fetchExampleResources() {
      const response = await fetch(`${apiURL()}/exampleResources`);
      const examples = await response.json();
      setExampleResources(examples);
    }

    fetchExampleResources();
  }, []);

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(`${apiURL()}/cloudinary/images`);
      const json = await response.json();

      setImages(json.resources[0].url);
    }

    fetchImages();
  }, []);

  return (
    <div className="landing-page-container">
      <span>Landing Page</span>
      {exampleResources.map((example) => (
        <div key={example.id}>{example.title}</div>
      ))}
      123
      <div
        className="card-image"
        style={{
          backgroundImage: `url(${images})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '200px',
          border: '1px',
        }}
      />
      {images}
    </div>
  );
};
