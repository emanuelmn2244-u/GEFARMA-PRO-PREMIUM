-- =====================================================
-- GEFARMA PRO PREMIUM
-- ESTRUTURA INICIAL DO BANCO
-- =====================================================


-- =====================================================
-- PRODUTOS
-- =====================================================

CREATE TABLE IF NOT EXISTS produtos (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    codigo TEXT NOT NULL UNIQUE,

    codigo_barras TEXT UNIQUE,

    nome TEXT NOT NULL,

    principio_ativo TEXT,

    dosagem TEXT,

    forma_farmaceutica TEXT,

    categoria TEXT,

    fabricante TEXT,

    unidade TEXT DEFAULT 'UN',

    preco_compra REAL DEFAULT 0,

    preco_venda REAL DEFAULT 0,

    stock_minimo REAL DEFAULT 0,

    ativo INTEGER DEFAULT 1,

    criado_em TEXT NOT NULL,

    atualizado_em TEXT NOT NULL
);


-- =====================================================
-- LOTES
-- =====================================================

CREATE TABLE IF NOT EXISTS lotes (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    produto_id INTEGER NOT NULL,

    numero_lote TEXT NOT NULL,

    validade TEXT,

    quantidade REAL DEFAULT 0,

    preco_compra REAL DEFAULT 0,

    criado_em TEXT NOT NULL,

    FOREIGN KEY (produto_id)
        REFERENCES produtos(id),

    UNIQUE (
        produto_id,
        numero_lote
    )
);


-- =====================================================
-- MOVIMENTOS DE STOCK
-- =====================================================

CREATE TABLE IF NOT EXISTS stock_movimentos (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    produto_id INTEGER NOT NULL,

    lote_id INTEGER,

    tipo TEXT NOT NULL,

    quantidade REAL NOT NULL,

    preco_unitario REAL DEFAULT 0,

    valor_total REAL DEFAULT 0,

    origem TEXT,

    documento TEXT,

    observacao TEXT,

    criado_em TEXT NOT NULL,

    FOREIGN KEY (produto_id)
        REFERENCES produtos(id),

    FOREIGN KEY (lote_id)
        REFERENCES lotes(id)
);


-- =====================================================
-- ÍNDICES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_produtos_nome
ON produtos(nome);


CREATE INDEX IF NOT EXISTS idx_produtos_codigo_barras
ON produtos(codigo_barras);


CREATE INDEX IF NOT EXISTS idx_lotes_produto
ON lotes(produto_id);


CREATE INDEX IF NOT EXISTS idx_movimentos_produto
ON stock_movimentos(produto_id);


CREATE INDEX IF NOT EXISTS idx_movimentos_data
ON stock_movimentos(criado_em);

-- =====================================================
-- COMPRAS
-- =====================================================

CREATE TABLE IF NOT EXISTS compras (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    fornecedor_id INTEGER,

    numero_compra TEXT NOT NULL UNIQUE,

    data_compra TEXT NOT NULL,

    total REAL DEFAULT 0,

    estado TEXT DEFAULT 'CONCLUIDA',

    observacao TEXT,

    criado_em TEXT NOT NULL,

    FOREIGN KEY (fornecedor_id)
        REFERENCES fornecedores(id)
);


-- =====================================================
-- ITENS DAS COMPRAS
-- =====================================================

CREATE TABLE IF NOT EXISTS compra_itens (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    compra_id INTEGER NOT NULL,

    produto_id INTEGER NOT NULL,

    lote_id INTEGER,

    quantidade REAL NOT NULL,

    preco_unitario REAL NOT NULL,

    total REAL NOT NULL,

    FOREIGN KEY (compra_id)
        REFERENCES compras(id),

    FOREIGN KEY (produto_id)
        REFERENCES produtos(id),

    FOREIGN KEY (lote_id)
        REFERENCES lotes(id)
);


-- =====================================================
-- ÍNDICES DAS COMPRAS
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_compras_fornecedor
ON compras(fornecedor_id);

CREATE INDEX IF NOT EXISTS idx_compras_data
ON compras(data_compra);

CREATE INDEX IF NOT EXISTS idx_compra_itens_compra
ON compra_itens(compra_id);

CREATE INDEX IF NOT EXISTS idx_compra_itens_produto
ON compra_itens(produto_id);

-- =====================================================
-- FORNECEDORES
-- =====================================================

CREATE TABLE IF NOT EXISTS fornecedores (

    id INTEGER PRIMARY KEY AUTOINCREMENT,

    nome TEXT NOT NULL,

    telefone TEXT,

    email TEXT,

    nif TEXT,

    endereco TEXT,

    ativo INTEGER DEFAULT 1,

    criado_em TEXT NOT NULL,

    atualizado_em TEXT NOT NULL
);


-- =====================================================
-- ÍNDICES DOS FORNECEDORES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_fornecedores_nome
ON fornecedores(nome);

CREATE INDEX IF NOT EXISTS idx_fornecedores_nif
ON fornecedores(nif);