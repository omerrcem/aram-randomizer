function Ads() {
};

export async function getServerSideProps ({ res }) {
  	res.setHeader('Content-Type', 'text/plain');
    res.write(`
      google.com, pub-7181315815609537, DIRECT, f08c47fec0942fa0
      rekmob.com,  54266,DIRECT
      reklamstore.com, 1054266, DIRECT
      appnexus.com, 1619, DIRECT
      adform.com, 1431, RESELLER
      pubmatic.com, 156547, RESELLER
      improvedigital.com, 1216, RESELLER
      rubiconproject.com, 17270, RESELLER, 0bfd66d529a55807
      google.com, pub-9959730754038026, RESELLER, f08c47fec0942fa0
      google.com, pub-5413329544040947, RESELLER, f08c47fec0942fa0
      appnexus.com, 10726, DIRECT, f5ab79cb980f11d1
      criteo.com, B-062648 , DIRECT, 9fac4a4a87c2a44f
      themediagrid.com, 7DIS96, DIRECT, 35d5010d7789b49d`);
    res.end();
  
  	return {
      props: {},
    };
};

export default Ads;
