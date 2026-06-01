import { Link } from 'react-router-dom';

export default function Rodape() {
  return (
    <footer className="rodape animar-entrada">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primaria)' }}>📦 Bitebox</span>
        <span style={{ color: 'var(--texto-mutado)', fontSize: '0.8rem', borderLeft: '1px solid var(--borda)', paddingLeft: '12px' }}>
          &copy; 2026 Engenharia Digital
        </span>
      </div>
      
      <div className="rodape-links">
        <Link to="/sobre" className="rodape-link">Sobre a Empresa</Link>
        <Link to="/contato" className="rodape-link">Fale Conosco</Link>
        <Link to="/help" className="rodape-link">Termos de Uso</Link>
      </div>
    </footer>
  );
}