const axios = require('axios');
const BASE_URL = 'https://jaksho.com'

function generateSiteMap(champs) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${BASE_URL}/</loc>
     </url>
     <url>
       <loc>${BASE_URL}/roll</loc>
     </url>
     <url>
       <loc>${BASE_URL}/champions</loc>
     </url>
     ${champs
       .map((name) => {
         return `
       <url>
           <loc>${`${BASE_URL}/${name}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {

	const VERSION_URL = 'https://ddragon.leagueoflegends.com/realms/tr.json';

	const versionPromise = await axios.get(VERSION_URL);
	const version = versionPromise.data.css;

	const CHAMP_LIST_URL = `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`;
	const champPromise = await axios.get(CHAMP_LIST_URL);
	const champs = champPromise.data.data;
	// We generate the XML sitemap with the posts data
	const sitemap = generateSiteMap(Object.keys(champs));

	res.setHeader('Content-Type', 'text/xml');
	// we send the XML to the browser
	res.write(sitemap);
	res.end();

	return {
	props: {},
	};
}

export default SiteMap;