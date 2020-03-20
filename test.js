/**
const test = require('ava');
const http = require('http');

function request(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res.on('data', (buffer) => {
        resolve(buffer.toString('utf8'));
      });  
    }).on('error', (e) => {
      reject(e);
    });
  });
}
 
test('home page should contain a form', async t => {
  // condition de passage: la page contient un formulaire HTML
  // plus concretement: la reponse à HTTP `GET /` doit contenir `<form`
  const html = await request('http://localhost:3000/');
  t.regex(html, /<form/);
});
 */

const test = require('ava');
const axios = require('axios');




test('formulaire is detected', async t => {
    const result =  await axios.get('https://md-nodeapp.herokuapp.com/');

  try{

    var html = result.data.toString('utf8');
    t.regex(html, /<form/);
  }catch(err) {
      console.log(err)
  }
    
});

test('replay is valide', async t => {
const result = await axios.post('https://md-nodeapp.herokuapp.com/ville', {nom_ville:"paris"});
try{

    var html = result.data.toString('utf8');
    t.regex(html, /paris/);
  }catch(err) {
      console.log(err)
  }
console.log(result.data.toString().includes("Paris"));

  });

  test('Erreur page display', async t => {
    const result = await axios.post('https://md-nodeapp.herokuapp.com/ville', {nom_ville:"existepas"});
    try{
    
        var html = result.data.toString('utf8');
        t.regex(html, /Erreur/);
      }catch(err) {
          console.log(err)
      }
    
      });