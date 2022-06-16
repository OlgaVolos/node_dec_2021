const express = require('express');
const {userRouter} = require("./routes");

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/users', userRouter);
app.use('*', (req, res) => {
   return  res.status(404).json('Page not found')
}) // будуть відпрацьовувати, коли все, що існувало вище, не буде існувати

app.listen(5000, () => {
    console.log('Started on port 5000')
})
