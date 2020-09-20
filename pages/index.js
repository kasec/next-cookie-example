import cookie from 'cookie'
const LOCAL_LOGIN_URL = 'http://localhost:3000/api/debugg'
const REMOTE_LOGIN_URL = 'http://localhost:3001/debug'
function HomePage() {
  let req = (url) => new Request(url, {
    mode: 'cors', //just a safe-guard indicating our intentions of what to allow
    credentials: 'include', //when will the cookies and authorization header be sent
  });
  const debuggAction = function() {
    fetch(req(LOCAL_LOGIN_URL))
      .then(console.log)
  }
  const debuggRemoteAction = function() {
    fetch(req(REMOTE_LOGIN_URL))
      .then(console.log)
  }
  return <div>HOME
    <p>
      <button onClick={debuggAction}>debugg</button>
    </p>
    <p>
      <button onClick={debuggRemoteAction}>debugg remote api</button>
    </p>
  </div>
}
  
export default HomePage
export async function getServerSideProps(ctx) {
  const cookies = cookie.parse(ctx.req.headers.cookie || '')
  console.log('cookies', cookies);
  
  if(cookies['rest-auth-cookie'] || cookies['x-auth-cookie'] ) {
    return { props: {'some': 'some'} }
  }
  else {
    ctx.res.writeHead(302, {
      Location: "/login",
    });
    ctx.res.end();  
  }
  return { props: {'some': 'some'} }
}
  
  