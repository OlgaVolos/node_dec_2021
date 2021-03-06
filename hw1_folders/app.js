const fs = require('fs/promises');
const path = require('path');


const reader = async (read) => {
    try{
        const files = await fs.readdir(read);

        for (const file of files) {

            const stat = await fs.stat(path.join(read, file));
            // console.log(stat);

            if(stat.isFile()){
                await fs.rename(path.join(read, file), path.join(__dirname, 'exitFolder', file))
            }
            if(stat.isDirectory()){
            await reader(path.join(read, file))
            }
        }

    } catch (e) {
        console.error(e)
    }
}

reader(path.join(__dirname, 'folder1'));

