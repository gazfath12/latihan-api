const http = require('http');  
let data = [{ name: 'hafidz', usia: 16 }];  
const server = http.createServer(function (req, res) {  
  const { url, method } = req;  
  console.log(method);  
  
  if (url === '/api/user') {  
    // handle post for inserting new user  
    if (method.toLowerCase() === 'post') {  
      let body = '';  
      req.on('data', (chunk) => {  
        body += chunk.toString();  
      });  
      req.on('end', () => {  
        let { name, usia } = JSON.parse(body);  
        data.push({ name, usia });  
        res.writeHead(200, {  
          'Content-Type': 'application/json',  
        });  
        res.end(JSON.stringify({ msg: 'Menambahkan data' }));  
      });  
    
    // handle put for updating an existing user  
    } else if (method.toLowerCase() === 'put') {  
      let body = '';  
      req.on('data', (chunk) => {  
        body += chunk.toString();  
      });  
      req.on('end', () => {  
        const { name, usia } = JSON.parse(body);  
        const userIndex = data.findIndex(user => user.name === name);  
        
        if (userIndex !== -1) {  
          data[userIndex].usia = usia; // update the user's age  
          res.writeHead(200, {  
            'Content-Type': 'application/json',  
          });  
          res.end(JSON.stringify({ msg: 'Data pengguna diperbarui' }));  
        } else {  
          res.writeHead(404, {  
            'Content-Type': 'application/json',  
          });  
          res.end(JSON.stringify({ msg: 'Pengguna tidak ditemukan' }));  
        }  
      });  

    // handle get for retrieving all user data  
    } else if (method.toLowerCase() === 'get') {  
      res.writeHead(200, {  
        'Content-Type': 'application/json',  
      });  
      res.end(JSON.stringify({ msg: 'lihat data', data }));  

    // handle delete for removing a user  
    } else if (method.toLowerCase() === 'delete') {  
      let body = '';  
      req.on('data', (chunk) => {  
        body += chunk.toString();  
      });  
      req.on('end', () => {  
        const { name } = JSON.parse(body);  
        const userIndex = data.findIndex(user => user.name === name);  
        
        if (userIndex !== -1) {  
          data.splice(userIndex, 1); // remove the user  
          res.writeHead(200, {  
            'Content-Type': 'application/json',  
          });  
          res.end(JSON.stringify({ msg: 'Pengguna telah dihapus' }));  
        } else {  
          res.writeHead(404, {  
            'Content-Type': 'application/json',  
          });  
          res.end(JSON.stringify({ msg: 'Pengguna tidak ditemukan' }));  
        }  
      });  

    } else {  
      // jika method tidak dikenali  
      res.writeHead(405, {  
        'Content-Type': 'application/json',  
      });  
      res.end(JSON.stringify({ msg: 'Method tidak dikenali' }));  
    }  
  } else {  
    // jika url/alamat tidak dikenali  
    res.writeHead(404, {  
      'Content-Type': 'application/json',  
    });  
    res.end(JSON.stringify({ error: 'Alamat tidak ditemukan' }));  
  }  
});  

server.listen(3000, () => {  
  console.log('server run on httgit initp://localhost:3000');  
});