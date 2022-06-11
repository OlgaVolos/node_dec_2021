const fileData = require('./dir/file'); //імпортуємо з відповідного файлу.
//запуститься все, що є у файлі, навіть те, що не експортується
fileData.greeting('Olya') //завжди треба перезапускати наш сервер
//***************************************************************

console.log(__dirname) //глобальна змінна - поточний шлях директорії
console.log(__filename) //глобальна змінна - назва запущеної папки

//************************************************

const fs = require('fs'); // файлова система, працює з файлами, вміє зчитувати, записувати і тд

const path = require('path') //вміє будувати шляхи до файлу

//************************************************************

// const util = require('util')
//
// const appendPromise = util.promisify(fs.appendFile); //вміє робити з колбекизованих функцій промісифіковані

// const folderWithDeletedData = path.join(__dirname,'dir', 'folder2', 'deleter.txt');
//
// appendPromise(folderWithDeletedData, 'Text data with promise \n').catch(reason => {
//     console.log(reason);
// })

//************************************************8

// const textPath = path.join(__dirname, 'dir', 'text.txt'); // не вміє створювати папку
//
// // const mkDirPath = path.join(__dirname, 'dir', 'folder2', 'innerfolder') //краще довгий шлях виносити окремо
//
// fs.mkdir(path.join(__dirname, 'dir', 'folder2', 'innerfolder'), {recursive: true}, err => {
//     if(err){
//         console.log(err);
//     }
// }) //створює папки задом наперед

//****************************************************

// fs.writeFile(textPath, 'hello', err => {
//     console.log(err);
// }) // створили файл, повністю перезаписує файл

//*****************************************************

// fs.appendFile(textPath, 'New hello \n', err => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log('done');
// }) //допише в існуючий файл

//******************************************************

// fs.readFile(textPath, (err, data)=> {
//     if(err){
//         console.log(err);
//         return
//     }
//     console.log(data.toString());
// })// вертаються дані з файлу

//*****************************************************

// const dirPath = path.join(__dirname, 'dir')
// fs. readdir(dirPath, (err, files) => {
//     if(err){
//         console.log(err);
//         return;
//     }
//     console.log(files);
//
//     files.forEach(file=>{
//         const filePath = path.join(dirPath, file)
//     fs.stat(filePath, (err1, stats) => {
//         console.log('------------------')
//         console.log(stats.isDirectory()) //дивиться, чи директорія
//         console.log(stats.isFile()) // дивиться, чи файл
//         console.log(stats.size) //розмір
//         console.log('------------------')
//     })
//     })
// }) // масив назв файлів або самі файли

//************************************************

// fs.rmdir(dirPath, err => {
//     console.log(err);
// }) // якщо директорія не пуста, то не стреться, перше треба стерти всі файли

//***************************************************

// fs.unlink(path.join(__dirname, 'dir', 'text.txt'), err => {
//     console.log(err);
// }) // стираємо файл

//******************************************************

// const folderWithDeletedData = path.join(__dirname,'dir', 'folder2', 'deleter.txt');

//*****************************************************

// fs.rename(textPath, folderWithDeletedData, err => {
//     console.log(err);
// })//переміщення або переіменовування  файлів

//**************************************************

const folderWithDeletedData = path.join(__dirname, 'dir', 'folder2', 'deleter.txt');

const readStream = fs.createReadStream(folderWithDeletedData);
const writeStream = fs.createWriteStream(folderWithDeletedData);
readStream.on("data", chunk => {
    writeStream.write(chunk) // одразу записуємо
}) //отримуємо шматки і по шматках шлемо
readStream.pipe(writeStream)// одразу приймаємо і відправляємо стрім


