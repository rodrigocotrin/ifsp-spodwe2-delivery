import { useState } from 'react';
import { CornerDownRight, CheckCircle2, User } from 'lucide-react';
import dados from '../dados/bancoDeDados.json';

export default function Mensagens() {
  const [mensagens, setMensagens] = useState(dados.mensagens);
  const [inputsRespostas, setInputsRespostas] = useState({}); 
  const [historicoRespostas, setHistoricoRespostas] = useState({}); 

  const lidarComMudancaInput = (id, valor) => {
    setInputsRespostas({ ...inputsRespostas, [id]: valor });
  };

  const processarEnvioResposta = (id) => {
    const textoParaEnviar = inputsRespostas[id];
    if (!textoParaEnviar || textoParaEnviar.trim() === '') return;

    setHistoricoRespostas({ ...historicoRespostas, [id]: textoParaEnviar });
    setMensagens(mensagens.map(m => m.id === id ? { ...m, respondida: true } : m));
    setInputsRespostas({ ...inputsRespostas, [id]: '' });
  };

  return (
    <div className="conteudo-principal animar-entrada">
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--texto-escuro)', fontWeight: '800' }}>Módulo de Resolução SAC</h1>
        <p style={{ color: 'var(--texto-mutado)', fontSize: '1rem' }}>Plataforma B2B para tratativa de exceções de clientes e anomalias de pedido.</p>
      </header>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {mensagens.map(m => (
          <article 
            key={m.id} 
            style={{ 
              background: 'var(--fundo-card)', 
              padding: '32px', 
              borderRadius: '20px', 
              border: '1px solid var(--borda)', 
              borderLeft: m.respondida ? '8px solid #27AE60' : '8px solid var(--primaria)', 
              boxShadow: 'var(--sombra-leve)',
              transition: 'var(--transicao-suave)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: 'var(--fundo-app)', padding: '10px', borderRadius: '12px', color: 'var(--texto-escuro)' }}><User size={18}/></div>
                <strong style={{ color: 'var(--texto-escuro)', fontSize: '1.15rem', fontWeight: '800' }}>{m.cliente}</strong>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '800', padding: '6px 12px', borderRadius: '8px', background: 'var(--fundo-app)', color: 'var(--texto-mutado)', border: '1px solid var(--borda)' }}>{m.pedidoId}</span>
                <span style={{ color: 'var(--texto-mutado)', fontSize: '0.9rem', fontWeight: '600' }}>{m.horario}</span>
              </div>
            </div>
            
            <p style={{ color: 'var(--texto-escuro)', fontSize: '1rem', background: 'var(--fundo-app)', padding: '20px', borderRadius: '16px', border: '1px solid var(--borda)', marginBottom: '24px', lineHeight: '1.6' }}>
              {m.texto}
            </p>

            {historicoRespostas[m.id] && (
              <div style={{ padding: '20px', background: 'rgba(39, 174, 96, 0.05)', borderRadius: '16px', border: '1px solid rgba(39, 174, 96, 0.2)', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <strong style={{ fontSize: '0.95rem', color: '#27AE60', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800' }}>
                  <CheckCircle2 size={18}/> Log de Resolução Executiva:
                </strong>
                <p style={{ color: 'var(--texto-escuro)', fontSize: '1rem', paddingLeft: '26px' }}>{historicoRespostas[m.id]}</p>
              </div>
            )}

            {!m.respondida ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <textarea
                  placeholder="Elabore um parecer técnico para arquivamento no CRM..."
                  value={inputsRespostas[m.id] || ''}
                  onChange={(e) => lidarComMudancaInput(m.id, e.target.value)}
                  style={{ width: '100%', height: '110px', padding: '20px', borderRadius: '16px', border: '1px solid var(--borda)', background: 'var(--fundo-app)', color: 'var(--texto-escuro)', outline: 'none', resize: 'none', fontFamily: 'Poppins', fontSize: '0.95rem', transition: 'border-color 0.3s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primaria)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--borda)'}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-primario" style={{ padding: '14px 28px' }} onClick={() => processarEnvioResposta(m.id)}>
                    <CornerDownRight size={18} /> Consolidar Chamado #{m.id}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#27AE60', fontSize: '0.95rem', fontWeight: '800', marginTop: '16px', padding: '16px', background: 'rgba(39, 174, 96, 0.05)', borderRadius: '12px' }}>
                <CheckCircle2 size={18}/> Processo homologado e trancado em banco de dados.
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}