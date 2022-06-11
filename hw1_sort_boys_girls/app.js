// const fs = require('fs');
// const path = require('path');


// const girlsSortFiles = () => {
//
//     fs.readdir(path.join('./girls'), (err, files) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(files);
//         files.forEach((file) => {
//             const girlsPath = path.join(__dirname, 'girls', file);
//             fs.readFile(girlsPath, (err, data) => {
//                 if (err) return console.log(err)
//
//                 const user = JSON.parse(data.toString());
//
//                 if (user.gender === 'male') {
//                     fs.rename(girlsPath, path.join(__dirname, 'boys', file), err1 => {
//                         if(err) return console.log(err)
//                     })
//                 }
//             })
//         })
//     })
// }
// const boysSortFiles = () => {
//
//     fs.readdir(path.join('./boys'), (err, files) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(files);
//         files.forEach((file) => {
//             const boysPath = path.join(__dirname, 'boys', file);
//             fs.readFile(boysPath, (err, data) => {
//                 if (err) return console.log(err)
//
//                 const user = JSON.parse(data.toString());
//
//                 if (user.gender === 'female') {
//                     fs.rename(boysPath, path.join(__dirname, 'girls', file), err1 => {
//                         if(err) return console.log(err)
//                     })
//                 }
//             })
//         })
//     })
// }
//
// girlsSortFiles();
// boysSortFiles();

//***************************************************************************************************//

// const sortFiles = (read, gender, write) => {
//
//     fs.readdir(path.join(__dirname, read), (err, files) => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(files);
//         files.forEach((file) => {
//             const readFolderName = path.join(__dirname, read, file);
//             fs.readFile(readFolderName, (err, data) => {
//                 if (err) return console.log(err)
//
//                 const user = JSON.parse(data.toString());
//
//                 if (user.gender === gender) {
//                     fs.rename(readFolderName, path.join(__dirname, write, file), err1 => {
//                         if(err) return console.log(err)
//                     })
//                 }
//             })
//         })
//     })
// }
// sortFiles('girls', 'male', 'boys');
// sortFiles('boys', 'female', 'girls');

//**************************************************************************//

const fs = require('fs/promises');
const path = require('path');

const sortFiles = async (read, gender, write) => {
    try {
        const files = await fs.readdir(path.join(__dirname, read))

        for (const file of files) {
            const readFolderName = path.join(__dirname, read, file);
            const data = await fs.readFile(readFolderName)
            const user = JSON.parse(data.toString());

            if (user.gender === gender) {
                await fs.rename(readFolderName, path.join(__dirname, write, file))
            }
        }
    } catch (e) {
        console.error(e)
    }
}

sortFiles('girls', 'male', 'boys').catch();
sortFiles('boys', 'female', 'girls').catch();


//fs.readFile(path.join(__dirname, 'girls', file), (err, data))
// __dirname вказує на поточну папку
