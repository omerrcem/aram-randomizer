function Robots() {
};

export async function getServerSideProps ({ res }) {
  	res.setHeader('Content-Type', 'text/plain');
    res.write(
`User-agent: *
Allow: /
Sitemap: https://www.jaksho.com/sitemap.xml`
		);
    res.end();
  
  	return {
      props: {},
    };
};

export default Robots;
