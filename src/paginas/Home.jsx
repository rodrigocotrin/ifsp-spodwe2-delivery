import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sun, Moon } from 'lucide-react';
import dados from '../dados/bancoDeDados.json';

export default function Home({ toggleTema, temaEscuro, pratosCompartilhados }) {
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState(null);

  const pratosFiltrados = pratosCompartilhados
    .filter(prato => categoriaAtiva ? prato.categoriaId === categoriaAtiva : true)
    .filter(prato => prato.nome.toLowerCase().includes(busca.toLowerCase()));

  return (
    <div className="conteudo-principal animar-entrada">
      <header className="topbar" style={{ marginBottom: '48px' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
          <Search size={20} color="var(--texto-mutado)" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Pesquisar registro de insumo..." 
            className="barra-pesquisa" 
            style={{ paddingLeft: '56px', width: '100%' }} 
            value={busca} 
            onChange={(e) => setBusca(e.target.value)} 
          />
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <button className="btn-tema" onClick={toggleTema}>{temaEscuro ? <Sun size={20} /> : <Moon size={20} />}</button>
          <div className="perfil-box">
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: '800', color: 'var(--texto-escuro)', fontSize: '0.95rem' }}>{dados.usuario.nome}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--texto-mutado)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{dados.usuario.cargo}</div>
            </div>
            <img src={dados.usuario.foto} alt="Perfil" />
          </div>
        </div>
      </header>

      <section className="banner-bitebox" style={{ marginBottom: '48px' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1>Bitebox Operations</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--texto-mutado)', maxWidth: '600px', lineHeight: '1.6' }}>Hub centralizado para monitoramento tático de suprimentos, rotação de estoque e telemetria de vendas.</p>
        </div>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ marginBottom: '24px', color: 'var(--texto-escuro)', fontSize: '1.4rem', fontWeight: '800' }}>Segmentação de Ativos ({dados.categorias.length})</h2>
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

      <section>
        <h2 style={{ marginBottom: '24px', color: 'var(--texto-escuro)', fontSize: '1.4rem', fontWeight: '800' }}>Metrificação de Produtos Homologados</h2>
        <div className="grid-pratos">
          {pratosFiltrados.map(prato => (
            <Link to={`/prato/${prato.id}`} key={prato.id} className="prato-card">
              {prato.tag && <span className="tag-desconto">{prato.tag}</span>}
              <div style={{ height: '200px', borderRadius: '12px', marginBottom: '20px', overflow: 'hidden' }}>
                <img src={prato.imagem} alt={prato.nome} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={e => e.target.style.transform = 'scale(1.05)'} onMouseOut={e => e.target.style.transform = 'scale(1)'} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', color: 'var(--texto-escuro)', fontWeight: '800' }}>{prato.nome}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.35rem', fontWeight: '900', color: 'var(--primaria)' }}>R$ {prato.preco.toFixed(2)}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--texto-mutado)', fontWeight: '600' }}>ID: {prato.id}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}