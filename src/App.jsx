import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Settings, ClipboardList, Store, MessageSquare, Bell, Printer, CheckCircle, Clock } from 'lucide-react';
import Home from './paginas/Home';
import Pratos from './paginas/Pratos';
import PratoDetalhes from './paginas/PratoDetalhes';
import Filiais from './paginas/Filiais';
import Mensagens from './paginas/Mensagens';
import dados from './dados/bancoDeDados.json';
import logoBitebox from './imagens/logo.png';
import './index.css';

const formatarData = (dataStr) => {
  const partes = dataStr.split('-');
  if (partes.length !== 3) return dataStr;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
};

const AtualizadorDeTitulo = () => {
  const location = useLocation();
  useEffect(() => {
    const rotas = {
      '/': 'Bitebox SaaS | Visão Geral',
      '/pratos': 'Bitebox SaaS | Gestão de Catálogo (CRUD)',
      '/pedidos': 'Bitebox SaaS | Fluxo de Produção',
      '/mensagens': 'Bitebox SaaS | Central de Chamados',
      '/filiais': 'Bitebox SaaS | Inteligência de Faturamento'
    };
    if (location.pathname.startsWith('/prato/')) {
      document.title = 'Bitebox SaaS | Detalhes do Ativo';
    } else {
      document.title = rotas[location.pathname] || 'Bitebox SaaS';
    }
  }, [location]);
  return null;
};

const Pedidos = () => {
  const [listaPedidos, setListaPedidos] = useState(dados.pedidos);

  const avancarStatus = (id) => {
    setListaPedidos(listaPedidos.map(p => {
      if (p.id === id) {
        if (p.status === 'Pendente') return { ...p, status: 'Em Preparo' };
        if (p.status === 'Em Preparo') return { ...p, status: 'Entregue' };
      }
      return p;
    }));
  };

  return (
    <div className="animar-entrada conteudo-principal">
      <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.8rem)', marginBottom: '32px', color: 'var(--texto-escuro)', fontWeight: '800' }}>Fluxo Operacional de Produção</h1>
      <div style={{ display: 'grid', gap: '20px' }}>
        {listaPedidos.map(p => (
          <div key={p.id} style={{ background: 'var(--fundo-card)', padding: '24px 32px', borderRadius: '16px', border: '1px solid var(--borda)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', boxShadow: 'var(--sombra-leve)', transition: 'var(--transicao-suave)' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--texto-escuro)', marginBottom: '4px', fontWeight: '800' }}>{p.restaurante}</h3>
              <p style={{ color: 'var(--texto-mutado)', fontSize: '0.9rem' }}>Data: <strong>{formatarData(p.data)}</strong> &bull; Identificador: {p.id}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '32px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                <div style={{ fontWeight: '900', color: 'var(--texto-escuro)', fontSize: '1.4rem', marginBottom: '8px' }}>R$ {p.total.toFixed(2)}</div>
                <span style={{ background: p.status === 'Entregue' ? 'rgba(39, 174, 96, 0.1)' : p.status === 'Em Preparo' ? 'rgba(242, 147, 57, 0.1)' : 'rgba(231, 76, 60, 0.1)', color: p.status === 'Entregue' ? '#27AE60' : p.status === 'Em Preparo' ? '#F29339' : '#E74C3C', padding: '6px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', border: `1px solid ${p.status === 'Entregue' ? 'rgba(39, 174, 96, 0.2)' : p.status === 'Em Preparo' ? 'rgba(242, 147, 57, 0.2)' : 'rgba(231, 76, 60, 0.2)'}` }}>{p.status}</span>
              </div>
              <button onClick={() => avancarStatus(p.id)} disabled={p.status === 'Entregue'} style={{ background: p.status === 'Entregue' ? 'var(--fundo-app)' : 'var(--primaria)', color: p.status === 'Entregue' ? 'var(--texto-mutado)' : '#FFF', border: 'none', padding: '14px 20px', borderRadius: '12px', fontWeight: '700', cursor: p.status === 'Entregue' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'var(--transicao-suave)', flex: '1 1 auto', minWidth: '180px' }}>
                {p.status === 'Entregue' ? <CheckCircle size={18} /> : <Clock size={18} />}
                {p.status === 'Pendente' ? 'Iniciar Preparo' : p.status === 'Em Preparo' ? 'Finalizar Entrega' : 'Concluído'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MockupFooter = ({ t, d }) => <div className="conteudo-principal animar-entrada"><h2 style={{fontSize: 'clamp(1.5rem, 4vw, 2rem)'}}>{t}</h2><p style={{color:'var(--texto-mutado)', marginTop:16, fontSize: '1.1rem'}}>{d}</p></div>;

export default function App() {
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [notificacao, setNotificacao] = useState(null);
  const [pratosGlobais, setPratosGlobais] = useState(dados.pratosPopulares);

  useEffect(() => {
    if (temaEscuro) document.body.classList.add('tema-escuro');
    else document.body.classList.remove('tema-escuro');
  }, [temaEscuro]);

  const dispararAviso = (msg) => {
    setNotificacao(msg);
    setTimeout(() => setNotificacao(null), 3500);
  };

  return (
    <BrowserRouter>
      <AtualizadorDeTitulo />
      <div className="dashboard-layout">
        {notificacao && <div className="toast-container"><div className="toast"><Bell size={18} /> {notificacao}</div></div>}
        
        <header className="mobile-header">
          <Link to="/" className="logo-container">
            <img src={logoBitebox} alt="Bitebox Logo" className="logo-img" />
            <span className="logo-texto">Bitebox</span>
          </Link>
          <div className="perfil-box" style={{ padding: '4px', borderRadius: '10px' }}>
            <img src={dados.usuario.foto} alt="Perfil" style={{ width: '32px', height: '32px' }} />
          </div>
        </header>

        <aside className="sidebar">
          <Link to="/" className="logo-container">
            <img src={logoBitebox} alt="Bitebox Logo" className="logo-img" />
            <span className="logo-texto">Bitebox</span>
          </Link>
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item ativo" : "nav-item"}><LayoutDashboard size={20}/> <span>Visão Geral</span></NavLink>
            <NavLink to="/pratos" className={({ isActive }) => isActive ? "nav-item ativo" : "nav-item"}><Settings size={20}/> <span>Catálogo</span></NavLink>
            <NavLink to="/pedidos" className={({ isActive }) => isActive ? "nav-item ativo" : "nav-item"}><ClipboardList size={20}/> <span>Produção</span></NavLink>
            <NavLink to="/mensagens" className={({ isActive }) => isActive ? "nav-item ativo" : "nav-item"}><MessageSquare size={20}/> <span>Suporte</span></NavLink>
            <NavLink to="/filiais" className={({ isActive }) => isActive ? "nav-item ativo" : "nav-item"}><Store size={20}/> <span>Financeiro</span></NavLink>
          </nav>
        </aside>

        <div className="layout-direito">
          <Routes>
            <Route path="/" element={<Home toggleTema={() => setTemaEscuro(!temaEscuro)} temaEscuro={temaEscuro} pratosCompartilhados={pratosGlobais} />} />
            <Route path="/prato/:id" element={<PratoDetalhes pratosCompartilhados={pratosGlobais} />} />
            <Route path="/pratos" element={<Pratos onAviso={dispararAviso} pratosCompartilhados={pratosGlobais} setPratosCompartilhados={setPratosGlobais} />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/mensagens" element={<Mensagens />} />
            <Route path="/filiais" element={<Filiais />} />
            <Route path="/sobre" element={<MockupFooter t="Engenharia Digital B2B" d="Bitebox SaaS Core v3.0 - Arquitetura de alta performance para monitoramento de ativos comerciais." />} />
            <Route path="/contato" element={<MockupFooter t="Suporte Executivo" d="Canal exclusivo para clientes Enterprise via dev@rodrigocotrin.com" />} />
            <Route path="/termos" element={<MockupFooter t="Governança de Dados" d="Sistema auditado para homologação estrita de requisitos funcionais." />} />
          </Routes>
          
          <footer className="rodape animar-entrada">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={logoBitebox} alt="Bitebox" style={{ width: '24px', height: '24px', opacity: 0.8 }} />
              <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primaria)', letterSpacing: '-0.5px' }}>Bitebox</span>
              <span style={{ color: 'var(--texto-mutado)', fontSize: '0.85rem', borderLeft: '2px solid var(--borda)', paddingLeft: '16px' }}>&copy; 2026 IFSP Sistemas de Informação</span>
            </div>
            <div className="rodape-links">
              <Link to="/sobre" className="rodape-link">Sobre</Link>
              <Link to="/contato" className="rodape-link">Suporte</Link>
              <Link to="/termos" className="rodape-link">Termos</Link>
              <button onClick={() => window.print()} className="rodape-link" style={{background:'none', border:'none', cursor:'pointer', fontWeight: 600, display:'flex', alignItems:'center', gap:6, padding:0, fontSize:'0.9rem'}}><Printer size={16}/> Imprimir</button>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}