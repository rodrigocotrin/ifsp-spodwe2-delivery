import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Settings, ClipboardList, Store, MessageSquare, Bell, Printer } from 'lucide-react';
import Home from './paginas/Home';
import Pratos from './paginas/Pratos';
import PratoDetalhes from './paginas/PratoDetalhes';
import Filiais from './paginas/Filiais';
import Mensagens from './paginas/Mensagens';
import dados from './dados/bancoDeDados.json';
import './index.css';

const formatarData = (dataStr) => {
  const partes = dataStr.split('-');
  if (partes.length !== 3) return dataStr;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
};

const Pedidos = () => (
  <div className="animar-entrada conteudo-principal">
    <h1 style={{ fontSize: '1.5rem', marginBottom: '24px', color: 'var(--texto-escuro)', fontWeight: '700' }}>Produção de Cozinha (KDS)</h1>
    <div style={{ display: 'grid', gap: '16px' }}>
      {dados.pedidos.map(p => (
        <div key={p.id} style={{ background: 'var(--fundo-card)', padding: '24px', borderRadius: '16px', border: '1px solid var(--borda)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--sombra-leve)' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--texto-escuro)' }}>Canal: {p.restaurante}</h3>
            <p style={{ color: 'var(--texto-mutado)', fontSize: '0.9rem' }}>Entrada: <strong>{formatarData(p.data)}</strong> • Cód: {p.id}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: '800', color: 'var(--primaria)', fontSize: '1.3rem', marginBottom: '8px' }}>R$ {p.total.toFixed(2)}</div>
            <span style={{ background: p.status === 'Entregue' ? '#E6F4EA' : '#FFF3E0', color: p.status === 'Entregue' ? '#1E8E3E' : '#E65100', padding: '6px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700' }}>{p.status}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const MockupFooter = ({ t, d }) => <div className="conteudo-principal animar-entrada"><h2>{t}</h2><p style={{color:'var(--texto-mutado)', marginTop:12}}>{d}</p></div>;

export default function App() {
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [notificacao, setNotificacao] = useState(null);
  
  // Elevação do Estado de Catálogo para nível Global (Muda no CRUD -> Propaga na Home automaticamente)
  const [pratosGlobais, setPratosGlobais] = useState(dados.pratosPopulares);

  useEffect(() => {
    if (temaEscuro) document.body.classList.add('tema-escuro');
    else document.body.classList.remove('tema-escuro');
  }, [temaEscuro]);

  const dispararAviso = (msg) => {
    setNotificacao(msg);
    setTimeout(() => setNotificacao(null), 3000);
  };

  return (
    <BrowserRouter>
      <div className="dashboard-layout">
        {notificacao && <div className="toast-container"><div className="toast"><Bell size={18} /> {notificacao}</div></div>}
        
        <aside className="sidebar">
          <div className="logo"><span style={{ fontSize: '2rem' }}>📦</span> Bitebox</div>
          <nav className="nav-links">
            <NavLink to="/" className={({ isActive }) => isActive ? "nav-item ativo" : "nav-item"}><LayoutDashboard size={20}/> Monitor Geral</NavLink>
            <NavLink to="/pratos" className={({ isActive }) => isActive ? "nav-item ativo" : "nav-item"}><Settings size={20}/> Cardápio (CRUD)</NavLink>
            <NavLink to="/pedidos" className={({ isActive }) => isActive ? "nav-item ativo" : "nav-item"}><ClipboardList size={20}/> Produção</NavLink>
            <NavLink to="/mensagens" className={({ isActive }) => isActive ? "nav-item ativo" : "nav-item"}><MessageSquare size={20}/> Mensagens SAC</NavLink>
            <NavLink to="/filiais" className={({ isActive }) => isActive ? "nav-item ativo" : "nav-item"}><Store size={20}/> Faturamento Rede</NavLink>
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
            
            <Route path="/sobre" element={<MockupFooter t="Sobre o Sistema" d="Bitebox SaaS Core v2.0 - Desenvolvido para gerenciamento e monitoramento comercial de ativos." />} />
            <Route path="/contato" element={<MockupFooter t="Suporte Corporativo" d="Módulo de homologação acadêmica. Contato via dev@bitebox.com.br" />} />
            <Route path="/termos" element={<MockupFooter t="Políticas de Licença" d="Uso exclusivo para avaliação das diretrizes da disciplina SPODWE2 no IFSP." />} />
          </Routes>
          
          <footer className="rodape animar-entrada">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primaria)' }}>📦 Bitebox</span><span style={{ color: 'var(--texto-mutado)', fontSize: '0.8rem', borderLeft: '1px solid var(--borda)', paddingLeft: '12px' }}>&copy; 2026 Controle Operacional</span></div>
            <div className="rodape-links">
              <Link to="/sobre" className="rodape-link">Sobre</Link>
              <Link to="/contato" className="rodape-link">Suporte</Link>
              <Link to="/termos" className="rodape-link">Termos</Link>
              <button onClick={() => window.print()} className="rodape-link" style={{background:'none', border:'none', cursor:'pointer', fontWeight: 600, display:'flex', alignItems:'center', gap:4}}><Printer size={14}/> Imprimir</button>
            </div>
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}