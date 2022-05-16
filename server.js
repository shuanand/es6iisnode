import express from 'express';
  
const app = express();
  
app.get('/',(req,res) => {
const body = "testdata"
// Adds header
res.append('Content-Type', 'text/plain;charset=utf-8');
res.append('Connection', 'keep-alive')
res.append('Set-Cookie', 'divehours=fornightly')
res.append('Content-Length', Buffer.byteLength(body, 'utf-8'));
res.status(200).send(body);
})
  
const PORT = process.env.PORT||3000;
  
app.listen(PORT,() => {
    console.log(`Running on PORT ${PORT}`);
})