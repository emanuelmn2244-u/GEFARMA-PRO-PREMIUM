// =====================================================
// GEFARMA PRO PREMIUM
// BANCO DE DADOS
// =====================================================

const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");
const { app } = require("electron");


// =====================================================
// VARIÁVEL GLOBAL DO BANCO
// =====================================================

let db = null;


// =====================================================
// CAMINHO DO BANCO
// =====================================================

function obterCaminhoBanco() {

    return path.join(
        app.getPath("userData"),
        "gefarma.db"
    );

}


// =====================================================
// INICIALIZAR BANCO
// =====================================================

async function inicializarBanco() {

    if (db) {

        return db;

    }


    // =================================================
    // INICIAR SQL.JS
    // =================================================

    const SQL = await initSqlJs();


    // =================================================
    // CAMINHO DO FICHEIRO
    // =================================================

    const caminhoBanco =
        obterCaminhoBanco();


    // =================================================
    // CARREGAR BANCO EXISTENTE
    // =================================================

    if (
        fs.existsSync(caminhoBanco)
    ) {

        console.log(
            "GEFARMA: banco existente encontrado."
        );


        const ficheiroBanco =
            fs.readFileSync(
                caminhoBanco
            );


        db = new SQL.Database(
            ficheiroBanco
        );


    } else {

        console.log(
            "GEFARMA: criando novo banco de dados."
        );


        db = new SQL.Database();

    }


    // =================================================
    // CARREGAR SCHEMA
    // =================================================

    const caminhoSchema =
        path.join(
            __dirname,
            "schema.sql"
        );


    const schema =
        fs.readFileSync(
            caminhoSchema,
            "utf8"
        );


    db.run(schema);


    // =================================================
    // GARANTIR QUE O BANCO FICA GRAVADO
    // =================================================

    salvarBanco();


    console.log(
        "GEFARMA: banco de dados pronto."
    );


    console.log(
        "GEFARMA: localização:",
        caminhoBanco
    );


    return db;

}


// =====================================================
// OBTER BANCO
// =====================================================

function obterBanco() {

    if (!db) {

        throw new Error(
            "O banco de dados ainda não foi inicializado."
        );

    }


    return db;

}


// =====================================================
// GUARDAR BANCO NO DISCO
// =====================================================

function salvarBanco() {

    if (!db) {

        throw new Error(
            "Não existe banco de dados para guardar."
        );

    }


    const caminhoBanco =
        obterCaminhoBanco();


    const dados =
        db.export();


    fs.writeFileSync(
        caminhoBanco,
        Buffer.from(dados)
    );


    console.log(
        "GEFARMA: banco de dados guardado."
    );

}


// =====================================================
// EXPORTAR
// =====================================================

module.exports = {

    inicializarBanco,

    obterBanco,

    salvarBanco,

    obterCaminhoBanco

};