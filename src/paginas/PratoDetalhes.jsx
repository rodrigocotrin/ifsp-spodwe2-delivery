import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, ShieldCheck } from 'lucide-react';
import dados from '../dados/bancoDeDados.json';

export default function PratoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const prato = dados.pratosPopulares.find(p => p.id === parseInt(id));

  if (!prato) return <div className="conteudo-principal"><h2>Registro ausente na memória técnica.</h2></div>;

  return (
    <div className="animar-entrada conteudo-principal" style={{ maxWidth: '800px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--texto-mutado)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '24px', fontWeight: '600' }}><ArrowLeft size={20} /> Painel Geral</button>
      <div style={{ background: 'var(--fundo-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)' }}>
        <div style={{ height: '380px', width: '100%' }}><img src={prato.imagem} alt={prato.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        <div style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <h1 style={{ fontSize: '2.2rem', color: 'var(--texto-escuro)', margin: 0 }}>{prato.nome}</h1>
            <span style={{ background: '#FFF5F0', color: 'var(--primaria)', padding: '8px 16px', borderRadius: '12px', fontWeight: '800', fontSize: '1.4rem' }}>R$ {prato.preco.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#27AE60', fontWeight: '700', fontSize: '1rem', marginBottom: '24px' }}><ShieldCheck size={18} /> Homologado na Instância Local</div>
          <p style={{ color: 'var(--texto-mutado)', fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '40px' }}>{prato.descricao}</p>
          <div style={{ padding: '24px', background: 'var(--fundo-app)', borderRadius: '16px', border: '1px solid var(--borda)' }}>
            <h4 style={{ color: 'var(--texto-escuro)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><Layers size={18}/> Mapeamento de Logística Interna</h4>
            <p style={{ color: 'var(--texto-mutado)', fontSize: '0.9rem' }}>Código Único: {prato.id} • Chave de Categoria Relacionada: {prato.categoriaId} • Índice de Rotação: {prato.avaliacao} • Rótulo: {prato.tag || "N/A"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}