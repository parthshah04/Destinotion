import React from 'react';
import NextHead from 'next/head';
import PropTypes from 'prop-types';

const defaultDescription = 'Discover your next destination and have more fun exploring the world.';
const defaultOGURL = '';
const defaultOGImage = '';

const Head = ({ title, description, url, ogImage }) => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{title || 'Destination - Have More Fun'}</title>
    <meta name="description" content={description || defaultDescription} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {/* Favicons */}
    <link rel="icon" href="/favicon/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
    <link rel="mask-icon" href="/favicon/favicon-mask.svg" color="#49B882" />
    <link rel="manifest" href="/favicon/site.webmanifest" />

    {/* Google Fonts for Branding */}
    <link
      href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto:wght@400;500;700&display=swap"
      rel="stylesheet"
    />

    {/* Open Graph Tags for SEO & Social Sharing */}
    <meta property="og:url" content={url || defaultOGURL} />
    <meta property="og:title" content={title || 'Destination - Have More Fun'} />
    <meta property="og:description" content={description || defaultDescription} />
    <meta property="og:image" content={ogImage || defaultOGImage} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />

    {/* Twitter Card Tags */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content={url || defaultOGURL} />
    <meta name="twitter:image" content={ogImage || defaultOGImage} />
  </NextHead>
);

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  ogImage: PropTypes.string,
};

export default Head;
