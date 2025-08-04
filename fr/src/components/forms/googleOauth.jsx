import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

function googleOAuth() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <GoogleLogin
        onSuccess={credentialResponse => {
          fetch('https://club-events-1.onrender.com/api/auth/google', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: credentialResponse.credential })
          })
          .then(res => res.json())
          .then(data => {
            console.log(data);
          });
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
}

export default googleOAuth;
