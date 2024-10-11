import React from 'react';

const brands = [
  { src: "assets/images/brand/strapi.png", alt: "Strapi" },
  { src: "assets/images/brand/mapbox.png", alt: "Mapbox" },
  { src: "assets/images/brand/stenciljs.png", alt: "StencilJS" },
  { src: "assets/images/brand/spotify.png", alt: "Spotify" },
  { src: "assets/images/brand/woocommerce.png", alt: "WooCommerce" },
  { src: "assets/images/brand/slack.png", alt: "Slack" },
  { src: "assets/images/brand/strapi.png", alt: "Strapi" },
  { src: "assets/images/brand/mapbox.png", alt: "Mapbox" },
  { src: "assets/images/brand/stenciljs.png", alt: "StencilJS" },
  { src: "assets/images/brand/spotify.png", alt: "Spotify" },
  { src: "assets/images/brand/woocommerce.png", alt: "WooCommerce" },
  { src: "assets/images/brand/slack.png", alt: "Slack" }
];

const BrandArea = () => {
  return (
    <div className="rainbow-brand-area rainbow-section-gap">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title rating-title text-center">
              <p className="b1 mb--0 small-title">
                Trusted by 800,000+ HIGHLY PRODUCTIVE Companies
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 mt--10">
            <marquee behavior="scroll" direction="left" scrollamount="12">
              <ul className="d-flex list-unstyled mb-0">
                {brands.map((brand, index) => (
                  <li className="mx-4" key={index}>
                    <a href="#">
                      <img
                        src={brand.src}
                        alt={brand.alt}
                        className="img-fluid"
                        style={{ width: '200px', height: 'auto' }}
                      />
                    </a>
                  </li>
                ))}
                
              </ul>
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandArea;
