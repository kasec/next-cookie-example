import cookie from 'cookie'
export default (req, res) => {
    if (req.method === 'POST') {
        let bit;
        fetch('http://localhost:3001/login')
            .then(response => {
                bit = cookie.parse(response.headers.get('set-cookie'))['x-auth-cookie']
                return response.json()
            })
            .then(result => {
                res.setHeader('Set-Cookie', cookie.serialize('local-auth-cookie', bit, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    maxAge: 100,
                    path: '/'
                }));
                res.json(result)
            })
    }
    else {
        res.end('HTTP METHOD NOT FOUND')
    }
}
  