import cookie from 'cookie'
function HomePage() {
  const debuggAction = function() {
    fetch('http://localhost:3001/api/debugg')
      .then(console.log())
  }
  return <div>HOME
    <button onClick={debuggAction}>debugg</button>
  </div>
}
  
export default HomePage
export async function getServerSideProps(ctx) {
  const cookies = cookie.parse(ctx.req.headers.cookie || '')
  console.log('cookies', cookies);
  
  if(cookies['x-auth-cookie']) {
    return {
      props: {}
    }
  }
  else {
    ctx.res.writeHead(302, {
      Location: "/login",
    });
    ctx.res.end();
  }
  
}
  
  