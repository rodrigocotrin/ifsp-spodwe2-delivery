import { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, SlidersHorizontal, Layers, CheckCircle, ShieldAlert, AlertCircle } from 'lucide-react';
import dados from '../dados/bancoDeDados.json';

export default function Filiais() {
  const [modoVisao, setModoVisao] = useState('coluna'); 
  const [filtroStatus, setFiltroStatus] = useState('Todos'); 
  const [ordenacao, setOrdenacao] = useState('faturamento-decres'); 

  const filiaisTratadas = dados.filiais
    .filter(f => filtroStatus === 'Todos' ? true : f.status === filtroStatus)
    .sort((a, b) => ordenacao === 'faturamento-decres' ? b.faturamento - a.faturamento : 0);

  const faturamentoTotal = filiaisTratadas.reduce((acc, curr) => acc + curr.faturamento, 0);

  let offsetAcumulado = 0;
  const raioPie = 90;
  const circunferenciaPie = 2 * Math.PI * raioPie;

  return (
    <div className="conteudo-principal animar-entrada">
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.8rem)', color: 'var(--texto-escuro)', fontWeight: '900' }}>Inteligência de Rede Fiscal</h1>
          <p style={{ color: 'var(--texto-mutado)', fontSize: '1rem' }}>Relatórios estatísticos de alta performance e auditoria de fluxo de caixa.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', background: 'var(--fundo-card)', padding: '8px', borderRadius: '16px', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)', flexWrap: 'wrap', width: '100%', maxWidth: 'max-content' }}>
          {['coluna', 'linha', 'pizza'].map((modo) => (
            <button
              key={modo}
              onClick={() => setModoVisao(modo)}
              style={{
                padding: '12px 20px',
                borderRadius: '12px',
                fontSize: '0.9rem',
                fontWeight: '800',
                border: 'none',
                cursor: 'pointer',
                transition: 'var(--transicao-suave)',
                background: modoVisao === modo ? 'var(--texto-escuro)' : 'transparent',
                color: modoVisao === modo ? 'var(--fundo-card)' : 'var(--texto-mutado)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1 1 auto',
                gap: '8px'
              }}
            >
              {modo === 'coluna' && <BarChart3 size={16}/>}
              {modo === 'linha' && <TrendingUp size={16}/>}
              {modo === 'pizza' && <PieChart size={16}/>}
              <span style={{ display: 'none' }} className="texto-botao-modo">{modo.charAt(0).toUpperCase() + modo.slice(1)}</span>
              <span className="texto-botao-modo-visivel">{modo.charAt(0).toUpperCase() + modo.slice(1)}</span>
            </button>
          ))}
        </div>
      </header>

      <section style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--fundo-card)', padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)' }}>
          <SlidersHorizontal size={18} color="var(--primaria)"/>
          <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', color: 'var(--texto-escuro)', fontWeight: 800, outline: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
            <option value="Todos">Auditoria Total</option>
            <option value="Operando">Nós Operantes</option>
            <option value="Manutenção">Nós em Manutenção</option>
          </select>
        </div>

        <div style={{ flex: '1 1 250px', display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--fundo-card)', padding: '16px 24px', borderRadius: '16px', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)' }}>
          <Layers size={18} color="var(--primaria)"/>
          <select value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', color: 'var(--texto-escuro)', fontWeight: 800, outline: 'none', cursor: 'pointer', fontSize: '0.95rem' }}>
            <option value="faturamento-decres">Prioridade de Faturamento</option>
            <option value="default">Indexação Original</option>
          </select>
        </div>
      </section>

      <section style={{ background: 'var(--fundo-card)', padding: 'clamp(24px, 5vw, 48px)', borderRadius: '24px', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)', marginBottom: '48px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '360px', overflow: 'hidden' }}>
        {filiaisTratadas.length === 0 ? (
          <p style={{ color: 'var(--texto-mutado)', fontWeight: '700', fontSize: '1.1rem', textAlign: 'center' }}>Filtro retornou conjunto vazio na matriz de dados.</p>
        ) : (
          <svg width="100%" height="100%" viewBox="0 0 700 320" style={{ maxWidth: '700px', overflow: 'visible' }} className="grafico-svg-dinamico">
            {modoVisao === 'coluna' && filiaisTratadas.map((f, i) => {
              const h = f.faturamento > 0 ? (f.faturamento / 15000) * 220 : 16;
              const espacamento = 700 / filiaisTratadas.length;
              const xPos = (i * espacamento) + (espacamento / 2) - 45;
              return (
                <g key={f.id}>
                  <rect x={xPos} y={260 - h} width="90" height={h} fill={f.cor} rx="12" />
                  <text x={xPos + 45} y="295" fill="var(--texto-mutado)" fontSize="14" fontWeight="800" textAnchor="middle">{f.local.split(' ')[0]}</text>
                  <text x={xPos + 45} y={245 - h} fill="var(--texto-escuro)" fontSize="15" fontWeight="900" textAnchor="middle">R$ {f.faturamento.toFixed(0)}</text>
                </g>
              );
            })}

            {modoVisao === 'linha' && (
              <g>
                <polyline fill="none" stroke="var(--primaria)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" points={filiaisTratadas.map((f, i) => {
                  const espacamento = 700 / filiaisTratadas.length;
                  const xPos = (i * espacamento) + (espacamento / 2);
                  const yPos = 260 - (f.faturamento / 15000) * 220;
                  return `${xPos},${yPos}`;
                }).join(' ')} />
                {filiaisTratadas.map((f, i) => {
                  const espacamento = 700 / filiaisTratadas.length;
                  const xPos = (i * espacamento) + (espacamento / 2);
                  const yPos = 260 - (f.faturamento / 15000) * 220;
                  return (
                    <g key={f.id}>
                      <circle cx={xPos} cy={yPos} r="8" fill="var(--fundo-card)" stroke="var(--primaria)" strokeWidth="4" />
                      <text x={xPos} y="295" fill="var(--texto-mutado)" fontSize="14" fontWeight="800" textAnchor="middle">{f.local.split(' ')[0]}</text>
                      <text x={xPos} y={yPos - 20} fill="var(--texto-escuro)" fontSize="15" fontWeight="900" textAnchor="middle">R$ {f.faturamento.toFixed(0)}</text>
                    </g>
                  );
                })}
              </g>
            )}

            {modoVisao === 'pizza' && (
              <g transform="translate(350, 160)">
                {filiaisTratadas.map((f) => {
                  const fracao = f.faturamento / faturamentoTotal;
                  const dash = fracao * circunferenciaPie;
                  const gap = circunferenciaPie - dash;
                  const currentOffset = offsetAcumulado;
                  offsetAcumulado += dash;
                  return (
                    <circle 
                      key={f.id}
                      r={raioPie} 
                      fill="none" 
                      stroke={f.cor} 
                      strokeWidth="50" 
                      strokeDasharray={`${dash} ${gap}`} 
                      strokeDashoffset={-currentOffset}
                      transform="rotate(-90)"
                    />
                  );
                })}
                <circle r="65" fill="var(--fundo-card)" style={{ filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.1))' }} />
                <text x="0" y="-5" textAnchor="middle" fill="var(--texto-mutado)" fontWeight="700" fontSize="12" letterSpacing="1px">TOTAL</text>
                <text x="0" y="20" textAnchor="middle" fill="var(--texto-escuro)" fontWeight="900" fontSize="18">R$ {(faturamentoTotal / 1000).toFixed(1)}k</text>
              </g>
            )}
          </svg>
        )}
      </section>

      <h2 style={{ fontSize: '1.4rem', color: 'var(--texto-escuro)', marginBottom: '24px', fontWeight: '800' }}>Diagnóstico de Unidades</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {filiaisTratadas.map((f) => (
          <div key={f.id} style={{ background: 'var(--fundo-card)', padding: '28px', borderRadius: '20px', border: '1px solid var(--borda)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: 'var(--sombra-leve)', transition: 'var(--transicao-suave)' }} onMouseOver={e => e.currentTarget.style.borderColor = f.cor} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--borda)'}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: f.cor, flexShrink: 0 }}></div>
              <div>
                <strong style={{ display: 'block', color: 'var(--texto-escuro)', fontSize: '1.15rem', fontWeight: '800', marginBottom: '4px' }}>{f.local}</strong>
                <span style={{ fontSize: '0.9rem', color: 'var(--texto-mutado)', fontWeight: '600' }}>Receita Bruta: R$ {f.faturamento.toFixed(2)}</span>
              </div>
            </div>
            
            {f.status === 'Operando' ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(39, 174, 96, 0.1)', color: '#27AE60', padding: '10px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '800', border: '1px solid rgba(39, 174, 96, 0.2)' }}>
                <CheckCircle size={16}/> {f.status}
              </span>
            ) : f.faturamento > 0 ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(242, 147, 57, 0.1)', color: '#F29339', padding: '10px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '800', border: '1px solid rgba(242, 147, 57, 0.2)' }}>
                <AlertCircle size={16}/> {f.status}
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(231, 76, 60, 0.1)', color: '#E74C3C', padding: '10px 16px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '800', border: '1px solid rgba(231, 76, 60, 0.2)' }}>
                <ShieldAlert size={16}/> {f.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}