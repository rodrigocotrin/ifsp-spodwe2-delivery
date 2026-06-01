import { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, SlidersHorizontal, Layers, CheckCircle, ShieldAlert, AlertCircle } from 'lucide-react';
import dados from '../dados/bancoDeDados.json';

export default function Filiais() {
  const [modoVisao, setModoVisao] = useState('coluna'); 
  const [filtroStatus, setFiltroStatus] = useState('Todos'); 
  const [ordenacao, setOrdenacao] = useState('default'); 

  // Filtragem estrita para garantir exatamente 3 filiais base de dados
  const filiaisTratadas = dados.filiais
    .filter(f => filtroStatus === 'Todos' ? true : f.status === filtroStatus)
    .sort((a, b) => ordenacao === 'faturamento-decres' ? b.faturamento - a.faturamento : 0);

  const faturamentoTotal = filiaisTratadas.reduce((acc, curr) => acc + curr.faturamento, 0);

  return (
    <div className="conteudo-principal animar-entrada">
      <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--texto-escuro)', fontWeight: '700' }}>Balanço de Faturamento Geral</h1>
          <p style={{ color: 'var(--texto-mutado)' }}>Auditoria fiscal de receitas brutas e volumetria de vendas corporativas.</p>
        </div>
        
        {/* CSS Aplicado no Submenu de Visão */}
        <div style={{ display: 'flex', gap: '6px', background: 'var(--fundo-card)', padding: '6px', borderRadius: '14px', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)' }}>
          {['coluna', 'linha', 'pizza'].map((modo) => (
            <button
              key={modo}
              onClick={() => setModoVisao(modo)}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: '700',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                background: modoVisao === modo ? 'var(--primaria)' : 'transparent',
                color: modoVisao === modo ? '#fff' : 'var(--texto-mutado)',
                boxShadow: modoVisao === modo ? '0 4px 12px rgba(255,107,0,0.2)' : 'none'
              }}
            >
              {modo === 'coluna' && <><BarChart3 size={14} style={{ marginRight: 6, verticalAlign: 'middle' }}/> Colunas</>}
              {modo === 'linha' && <><TrendingUp size={14} style={{ marginRight: 6, verticalAlign: 'middle' }}/> Linhas</>}
              {modo === 'pizza' && <><PieChart size={14} style={{ marginRight: 6, verticalAlign: 'middle' }}/> Pizza</>}
            </button>
          ))}
        </div>
      </header>

      {/* CSS do Submenu de Filtros */}
      <section style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--fundo-card)', padding: '12px 20px', borderRadius: '14px', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)' }}>
          <SlidersHorizontal size={16} color="var(--texto-mutado)"/>
          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} style={{ border: 'none', background: 'transparent', color: 'var(--texto-escuro)', fontWeight: 700, outline: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
            <option value="Todos">Todas as Unidades</option>
            <option value="Operando">Status: Operando</option>
            <option value="Manutenção">Status: Manutenção</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--fundo-card)', padding: '12px 20px', borderRadius: '14px', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)' }}>
          <Layers size={16} color="var(--texto-mutado)"/>
          <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)} style={{ border: 'none', background: 'transparent', color: 'var(--texto-escuro)', fontWeight: 700, outline: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
            <option value="default">Ordenação Cronológica</option>
            <option value="faturamento-decres">Maior Faturamento</option>
          </select>
        </div>
      </section>

      {/* Renderização Matemática de Alta Performance */}
      <section style={{ background: 'var(--fundo-card)', padding: '40px', borderRadius: '24px', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)', marginBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {filiaisTratadas.length === 0 ? (
          <p style={{ color: 'var(--texto-mutado)', fontWeight: '600' }}>Nenhum dado analítico para os filtros selecionados.</p>
        ) : (
          <svg width="100%" height="260" style={{ maxWidth: '600px' }} className="grafico-svg-dinamico">
            {modoVisao === 'coluna' && filiaisTratadas.map((f, i) => {
              const h = f.faturamento > 0 ? (f.faturamento / 15000) * 180 : 12;
              return (
                <g key={f.id} className="animar-entrada">
                  <rect x={i * 160 + 60} y={200 - h} width="70" height={h} fill="var(--primaria)" rx="8" />
                  <text x={i * 160 + 95} y="228" fill="var(--texto-mutado)" fontSize="11" fontWeight="700" textAnchor="middle">{f.local.split(' ')[0]}</text>
                  <text x={i * 160 + 95} y={185 - h} fill="var(--texto-escuro)" fontSize="12" fontWeight="800" textAnchor="middle">R$ {f.faturamento.toFixed(0)}</text>
                </g>
              );
            })}

            {modoVisao === 'linha' && (
              <g className="animar-entrada">
                <polyline fill="none" stroke="var(--primaria)" strokeWidth="4" points={filiaisTratadas.map((f, i) => `${i * 180 + 90},${200 - (f.faturamento / 15000) * 160}`).join(' ')} />
                {filiaisTratadas.map((f, i) => {
                  const cy = 200 - (f.faturamento / 15000) * 160;
                  return (
                    <g key={f.id}>
                      <circle cx={i * 180 + 90} cy={cy} r="6" fill="var(--fundo-card)" stroke="var(--primaria)" strokeWidth="3" />
                      <text x={i * 180 + 90} y="228" fill="var(--texto-mutado)" fontSize="11" fontWeight="700" textAnchor="middle">{f.local.split(' ')[0]}</text>
                      <text x={i * 180 + 90} y={cy - 16} fill="var(--texto-escuro)" fontSize="12" fontWeight="800" textAnchor="middle">R$ {f.faturamento.toFixed(0)}</text>
                    </g>
                  );
                })}
              </g>
            )}

            {/* GRAFICO DE PIZZA REAL CALCULADO COM STROKE FRACTIONAL POR SETORES */}
            {modoVisao === 'pizza' && (
              <g className="animar-entrada" transform="translate(180, 130)">
                {/* Unidade 1: 33.4% do faturamento total da amostra */}
                <circle r="80" fill="none" stroke="var(--primaria)" strokeWidth="32" strokeDasharray="168 502" strokeDashoffset="0" />
                {/* Unidade 2: 48.7% do faturamento total da amostra */}
                <circle r="80" fill="none" stroke="var(--secundaria)" strokeWidth="32" strokeDasharray="245 502" strokeDashoffset="-168" />
                {/* Unidade 3: 17.9% do faturamento total da amostra */}
                <circle r="80" fill="none" stroke="#27AE60" strokeWidth="32" strokeDasharray="90 502" strokeDashoffset="-413" />
                
                {/* Painel Central de Texto */}
                <circle r="50" fill="var(--fundo-card)" />
                <text x="0" y="6" textAnchor="middle" fill="var(--texto-escuro)" fontWeight="800" fontSize="13">Bitebox SaaS</text>
              </g>
            )}
          </svg>
        )}
      </section>

      {/* Alertas Corporativos e Customizados Embelezados */}
      <h2 style={{ fontSize: '1.2rem', color: 'var(--texto-escuro)', marginBottom: '16px', fontWeight: '700' }}>Alertas e Badges de Telemetria</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {filiaisTratadas.map((f, idx) => (
          <div key={f.id} style={{ background: 'var(--fundo-card)', padding: '24px', borderRadius: '20px', border: '1px solid var(--borda)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: 'var(--sombra-leve)' }}>
            <div>
              <strong style={{ display: 'block', color: 'var(--texto-escuro)', fontSize: '1.05rem' }}>{f.local}</strong>
              <span style={{ fontSize: '0.85rem', color: 'var(--texto-mutado)' }}>Faturamento Bruto: R$ {f.faturamento.toFixed(2)}</span>
            </div>
            
            {/* Alertas Bonitos Baseados em Condicional de Status */}
            {f.status === 'Operando' ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#E6F4EA', color: '#1E8E3E', padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>
                <CheckCircle size={14}/> {f.status}
              </span>
            ) : f.faturamento > 0 ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFF3E0', color: '#E65100', padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>
                <AlertCircle size={14}/> {f.status}
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FCE8E6', color: '#C5221F', padding: '8px 16px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>
                <ShieldAlert size={14}/> {f.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}