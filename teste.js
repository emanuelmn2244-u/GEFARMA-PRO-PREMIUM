const { inicializarBanco } = require("./database.js");

async function testar() {

    try {

        const db = await inicializarBanco();

        const resultado = db.exec(`
            SELECT name
            FROM sqlite_master
            WHERE type = 'table'
            ORDER BY name
        `);

        console.log("=================================");
        console.log("BANCO TESTADO COM SUCESSO");
        console.log("=================================");

        console.log(resultado);

    } catch (erro) {

        console.error("ERRO NO BANCO:");
        console.error(erro);

    }

}

testar();