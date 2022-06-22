import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

config();
// Express init
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/friend', require('./routes/friend'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/likes', require('./routes/likes'));
app.use('/api/global', require('./routes/global'));

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log('Server is running on port: ' + PORT);
});
