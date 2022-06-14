const fs = require("fs/promises");
const path = require("path");


const dbPath = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
    reader: async () => {
        try {
            const data = await fs.readFile(dbPath);
            return data.toString()
                ? JSON.parse(data.toString()).sort((a,b) => a.id-b.id) //обов"язково треба сортувати, щоб зберігався порядок ід
                : [];
            //можна написати тільки __dirname, але тоді він буде читати папку з сервісами,
            // тому шлях вказуємо рівня папки dataBase (path.join(__dirname, '..', 'dataBase')
            //але є варіант зсилатися на файл, в якому все запускаємо process.cwd()
        } catch (e) {
            console.error(e);
        }
    },

    writer: async (users) => {
        try {
            await fs.writeFile(dbPath, JSON.stringify(users))
        } catch (e) {
            console.error(e);
        }
    }
}
