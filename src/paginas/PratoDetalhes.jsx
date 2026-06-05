import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, ShieldCheck } from 'lucide-react';

export default function PratoDetalhes({ pratosCompartilhados }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const prato = pratosCompartilhados.find(p => p.id === parseInt(id));

  if (!prato) return <div className="conteudo-principal"><h2>Registro bloqueado ou purgado.</h2></div>;

  return (
    <div className="animar-entrada conteudo-principal" style={{ maxWidth: '850px' }}>
      <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'var(--texto-mutado)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '32px', fontWeight: '700', fontSize: '1rem' }}><ArrowLeft size={20} /> Voltar ao Painel Geral</button>
      <div style={{ background: 'var(--fundo-card)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)' }}>
        <div style={{ height: '400px', width: '100%' }}><img src={prato.imagem} alt={prato.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
        <div style={{ padding: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
            <h1 style={{ fontSize: '2.4rem', color: 'var(--texto-escuro)', margin: 0, fontWeight: '900' }}>{prato.nome}</h1>
            <span style={{ background: 'rgba(255, 107, 0, 0.1)', color: 'var(--primaria)', padding: '10px 20px', borderRadius: '12px', fontWeight: '900', fontSize: '1.5rem', border: '1px solid rgba(255, 107, 0, 0.2)' }}>R$ {prato.preco.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#27AE60', fontWeight: '800', fontSize: '1.05rem', marginBottom: '32px' }}><ShieldCheck size={20} /> Autenticado na Instância SaaS</div>
          <p style={{ color: 'var(--texto-mutado)', fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '48px' }}>{prato.descricao}</p>
          <div style={{ padding: '28px', background: 'var(--fundo-app)', borderRadius: '16px', border: '1px solid var(--borda)' }}>
            <h4 style={{ color: 'var(--texto-escuro)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '1.1rem', fontWeight: '800' }}><Layers size={20}/> Telemetria Interna</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', color: 'var(--texto-mutado)', fontSize: '0.95rem' }}>
              <div><strong>Hash de Identificação:</strong> {prato.id}</div>
              <div><strong>Índice de Categoria:</strong> {prato.categoriaId}</div>
              <div><strong>Nível de Retenção:</strong> {prato.avaliacao} / 5.0</div>
              <div><strong>Rótulo Operacional:</strong> {prato.tag || "N/A"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}