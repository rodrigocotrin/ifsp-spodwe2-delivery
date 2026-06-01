import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sun, Moon, Eye } from 'lucide-react';
import dados from '../dados/bancoDeDados.json';

export default function Home({ toggleTema, temaEscuro, pratosCompartilhados }) {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);

  // Filtro simultâneo por texto e categoria baseado nas 8 categorias exigidas
  const pratosFiltrados = pratosCompartilhados
    .filter(prato => categoriaAtiva ? prato.categoriaId === categoriaAtiva : true)
    .filter(prato => prato.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="conteudo-principal animar-entrada">
      <header className="topbar" style={{ marginBottom: '40px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
          <Search size={20} color="var(--texto-mutado)" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Pesquisar insumo ou produto no catálogo..." 
            className="barra-pesquisa" 
            style={{ paddingLeft: '50px', width: '100%' }} 
            value={busca} 
            onChange={(e) => setBusca(e.target.value)} 
          />
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button className="btn-tema" onClick={toggleTema}>{temaEscuro ? <Sun size={20} /> : <Moon size={20} />}</button>
          <div className="perfil-box">
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '700', color: 'var(--texto-escuro)' }}>{dados.usuario.nome}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--texto-mutado)', fontWeight: '500' }}>{dados.usuario.cargo}</div>
            </div>
            <img src={dados.usuario.foto} alt="Perfil" />
          </div>
        </div>
      </header>

      <section className="banner-bitebox" style={{ marginBottom: '40px' }}>
        <div>
          <h1>Bitebox SaaS Core</h1>
          <p>Monitoramento tático de suprimentos, rotação de estoque e categorias ativas de venda.</p>
        </div>
      </section>

      {/* As 8 Categorias Solicitadas Remanescentes */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', color: 'var(--texto-escuro)' }}>Categorias de Insumos ({dados.categorias.length})</h2>
        <div className="grid-categorias">
          {dados.categorias.map(cat => (
            <div 
              key={cat.id} 
              className={`categoria-card ${categoriaAtiva === cat.id ? 'ativa' : ''}`} 
              onClick={() => setCategoriaAtiva(categoriaAtiva === cat.id ? null : cat.id)}
            >
              <span className="categoria-icone">{cat.icone}</span>
              <div className="categoria-nome">{cat.nome}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Listagem Reativa dos 10 Pratos Sincronizada em Tempo Real com o CRUD */}
      <section>
        <h2 style={{ marginBottom: '20px', color: 'var(--texto-escuro)' }}>Metrificação de Produtos Cadastrados</h2>
        <div className="grid-pratos">
          {pratosFiltrados.map(prato => (
            <Link to={`/prato/${prato.id}`} key={prato.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="prato-card">
                {prato.tag && <span className="tag-desconto">{prato.tag}</span>}
                <div style={{ height: '180px', borderRadius: '12px', marginBottom: '16px', overflow: 'hidden' }}>
                  <img src={prato.imagem} alt={prato.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', color: 'var(--texto-escuro)' }}>{prato.nome}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primaria)' }}>R$ {prato.preco.toFixed(2)}</span>
                  <button style={{ background: 'var(--borda)', border: 'none', padding: '10px', borderRadius: '10px', color: 'var(--texto-escuro)', display: 'flex', alignItems: 'center' }} onClick={(e) => e.preventDefault()}><Eye size={18} /></button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}