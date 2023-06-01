function Ads() {
};

export async function getServerSideProps ({ res }) => {
  	res.setHeader('Content-Type', 'text/plain');
    res.write(() => 'google.com, pub-7181315815609537, DIRECT, f08c47fec0942fa0');
    res.end();
  
  	return {
      props: {},
    };
};

export default Ads;
