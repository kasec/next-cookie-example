import { useRouter } from 'next/router'
const LOCAL_LOGIN_URL = 'http://localhost:3000/api/login' 
const REMOTE_LOGIN_URL = 'http://localhost:3001/login'
function HomePage() {
    const router = useRouter()
    
    const loginAction = function() {
      fetch(LOCAL_LOGIN_URL, {
        method: 'POST',
      }).then(resp => {
        return resp.json()
      }).then(resp => {
          console.log(resp)
          // router.push('/');
      });
    }
    const apiRestLogin = function() {
      fetch(REMOTE_LOGIN_URL)
        .then(resp => {
          return resp.json()
        }).then(resp => {
            console.log(resp)
            // router.push('/');
        });
    }
    return <div>
      Welcome to Next.js!
      <button onClick={loginAction}>login</button>
      <button onClick={apiRestLogin}>login to api rest</button>
    </div>
  }
  
  export default HomePage
  export async function getServerSideProps(ctx) {
    console.log('ctx.req.headers.cookie', ctx.req.headers.cookie);
    
    return {
      props: {},
    }
  }
  
  