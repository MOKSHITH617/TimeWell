const Product = require('../models/Product');

// Generates XML sitemap combining static routing paths and dynamic product slugs
const generateSitemapXml = async (hostUrl) => {
  const products = await Product.find({ isAvailable: true }).select('slug category updatedAt');
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main Static Paths -->
  <url>
    <loc>${hostUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${hostUrl}/mattresses</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${hostUrl}/sofas</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${hostUrl}/factory</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${hostUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;

  products.forEach(product => {
    // Maps category to correct route structure prefix
    const pathPrefix = product.category === 'mattress' ? 'mattresses' : 'sofas';
    const lastMod = product.updatedAt ? product.updatedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    xml += `  <url>
    <loc>${hostUrl}/${pathPrefix}/${product.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  });

  xml += `</urlset>`;
  return xml;
};

module.exports = { generateSitemapXml };
