/* =========================================================
   GEFARMA PRO PREMIUM
   MAIN.JS
   Processo principal do Electron
   ========================================================= */

const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");

const path = require("path");


/* =========================================================
   BANCO DE DADOS
   ========================================================= */

const {
    inicializarBanco
} = require("../database/database");


/* =========================================================
   PRODUTOS
   ========================================================= */

const {
    cadastrarProduto,
    listarProdutos,
    eliminarProduto,
    reativarProduto
} = require("../services/produtoService");

/* =========================================================
   FORNECEDORES
   ========================================================= */

const {
    cadastrarFornecedor,
    listarFornecedores,
    obterFornecedor,
    desativarFornecedor,
    reativarFornecedor
} = require("../services/fornecedorService");

/* =========================================================
   STOCK
   ========================================================= */

const {
    listarStock,
    obterStockProduto,
    listarLotes,
    registrarEntrada,
    registrarSaida,
    listarMovimentos
} = require("../services/stockService");

/* =========================================================
   COMPRAS
   ========================================================= */

const {
    cadastrarCompra,
    listarCompras
} = require("../services/compraService");


/* =========================================================
   JANELA PRINCIPAL
   ========================================================= */

let janelaPrincipal = null;


function criarJanela() {

    janelaPrincipal = new BrowserWindow({

        width: 1400,
        height: 850,

        minWidth: 1000,
        minHeight: 650,

        show: false,

        webPreferences: {

            contextIsolation: true,

            nodeIntegration: false,

            preload: path.join(
                __dirname,
                "../preload/preload.js"
            )
        }
    });


    /* =====================================================
       CARREGAR INTERFACE
       ===================================================== */

    janelaPrincipal.loadFile(
        path.join(
            __dirname,
            "../renderer/index.html"
        )
    );


    /* =====================================================
       MOSTRAR JANELA QUANDO ESTIVER PRONTA
       ===================================================== */

    janelaPrincipal.once(
        "ready-to-show",
        () => {

            janelaPrincipal.show();

        }
    );


    /* =====================================================
       EVENTO DE FECHAMENTO
       ===================================================== */

    janelaPrincipal.on(
        "closed",
        () => {

            janelaPrincipal = null;

        }
    );

}


/* =========================================================
   IPC — TESTE DO BANCO
   ========================================================= */

ipcMain.handle(
    "gefarma:banco:teste",
    async () => {

        try {

            return {
                sucesso: true,
                mensagem:
                    "Banco de dados conectado com sucesso."
            };

        } catch (erro) {

            console.error(
                "GEFARMA: erro no teste do banco:",
                erro
            );

            throw erro;

        }

    }
);


/* =========================================================
   IPC — PRODUTOS
   ========================================================= */


/* =====================================================
   LISTAR PRODUTOS
   ===================================================== */

ipcMain.handle(
    "gefarma:produtos:listar",
    async () => {

        try {

            return listarProdutos();

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao listar produtos:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   CADASTRAR PRODUTO
   ===================================================== */

ipcMain.handle(
    "gefarma:produtos:cadastrar",
    async (
        evento,
        dados
    ) => {

        try {

            return cadastrarProduto(
                dados
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao cadastrar produto:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   ELIMINAR / DESATIVAR PRODUTO
   ===================================================== */

ipcMain.handle(
    "gefarma:produtos:eliminar",
    async (
        evento,
        produtoId
    ) => {

        try {

            return eliminarProduto(
                produtoId
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao eliminar produto:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   REATIVAR PRODUTO
   ===================================================== */

ipcMain.handle(
    "gefarma:produtos:reativar",
    async (
        evento,
        produtoId
    ) => {

        try {

            return reativarProduto(
                produtoId
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao reativar produto:",
                erro
            );

            throw erro;

        }

    }
);

/* =========================================================
   IPC — FORNECEDORES
   ========================================================= */


/* =====================================================
   LISTAR FORNECEDORES
   ===================================================== */

ipcMain.handle(
    "gefarma:fornecedores:listar",
    async () => {

        try {

            return listarFornecedores();

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao listar fornecedores:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   CADASTRAR FORNECEDOR
   ===================================================== */

ipcMain.handle(
    "gefarma:fornecedores:cadastrar",
    async (
        evento,
        dados
    ) => {

        try {

            return cadastrarFornecedor(
                dados
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao cadastrar fornecedor:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   OBTER FORNECEDOR
   ===================================================== */

ipcMain.handle(
    "gefarma:fornecedores:obter",
    async (
        evento,
        fornecedorId
    ) => {

        try {

            return obterFornecedor(
                fornecedorId
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao obter fornecedor:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   DESATIVAR FORNECEDOR
   ===================================================== */

ipcMain.handle(
    "gefarma:fornecedores:desativar",
    async (
        evento,
        fornecedorId
    ) => {

        try {

            return desativarFornecedor(
                fornecedorId
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao desativar fornecedor:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   REATIVAR FORNECEDOR
   ===================================================== */

ipcMain.handle(
    "gefarma:fornecedores:reativar",
    async (
        evento,
        fornecedorId
    ) => {

        try {

            return reativarFornecedor(
                fornecedorId
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao reativar fornecedor:",
                erro
            );

            throw erro;

        }

    }
);

/* =========================================================
   IPC — COMPRAS
   ========================================================= */


/* =====================================================
   LISTAR COMPRAS
   ===================================================== */

ipcMain.handle(
    "gefarma:compras:listar",
    async () => {

        try {

            return listarCompras();

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao listar compras:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   CADASTRAR COMPRA
   ===================================================== */

ipcMain.handle(
    "gefarma:compras:cadastrar",
    async (
        evento,
        dados
    ) => {

        try {

            return cadastrarCompra(
                dados
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao cadastrar compra:",
                erro
            );

            throw erro;

        }

    }
);

/* =========================================================
   IPC — STOCK
   ========================================================= */


/* =====================================================
   LISTAR STOCK
   ===================================================== */

ipcMain.handle(
    "gefarma:stock:listar",
    async () => {

        try {

            return listarStock();

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao listar stock:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   OBTER STOCK DE UM PRODUTO
   ===================================================== */

ipcMain.handle(
    "gefarma:stock:obter",
    async (
        evento,
        produtoId
    ) => {

        try {

            return obterStockProduto(
                produtoId
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao obter stock:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   LISTAR LOTES
   ===================================================== */

ipcMain.handle(
    "gefarma:stock:lotes",
    async (
        evento,
        produtoId
    ) => {

        try {

            return listarLotes(
                produtoId
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao listar lotes:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   REGISTRAR ENTRADA DE STOCK
   ===================================================== */

ipcMain.handle(
    "gefarma:stock:entrada",
    async (
        evento,
        dados
    ) => {

        try {

            return registrarEntrada(
                dados
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao registrar entrada:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   REGISTRAR SAÍDA DE STOCK
   ===================================================== */

ipcMain.handle(
    "gefarma:stock:saida",
    async (
        evento,
        dados
    ) => {

        try {

            return registrarSaida(
                dados
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao registrar saída:",
                erro
            );

            throw erro;

        }

    }
);


/* =====================================================
   LISTAR MOVIMENTOS DE STOCK
   ===================================================== */

ipcMain.handle(
    "gefarma:stock:movimentos",
    async (
        evento,
        produtoId
    ) => {

        try {

            return listarMovimentos(
                produtoId
            );

        } catch (erro) {

            console.error(
                "GEFARMA: erro ao listar movimentos:",
                erro
            );

            throw erro;

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO DO GEFARMA
   ========================================================= */

app.whenReady()
    .then(
        async () => {

            try {

                console.log(
                    "===================================="
                );

                console.log(
                    "GEFARMA PRO PREMIUM"
                );

                console.log(
                    "Inicializando sistema..."
                );

                console.log(
                    "===================================="
                );


                /* =========================================
                   INICIALIZAR BANCO
                   ========================================= */

                await inicializarBanco();


                console.log(
                    "GEFARMA: banco de dados inicializado."
                );


                /* =========================================
                   CRIAR JANELA
                   ========================================= */

                criarJanela();


            } catch (erro) {

                console.error(
                    "GEFARMA: erro fatal na inicialização:",
                    erro
                );

            }

        }
    );


/* =========================================================
   MACOS — REABRIR APLICAÇÃO
   ========================================================= */

app.on(
    "activate",
    () => {

        if (
            BrowserWindow
                .getAllWindows()
                .length === 0
        ) {

            criarJanela();

        }

    }
);


/* =========================================================
   ENCERRAR APLICAÇÃO
   ========================================================= */

app.on(
    "window-all-closed",
    () => {

        if (
            process.platform !== "darwin"
        ) {

            app.quit();

        }

    }
);