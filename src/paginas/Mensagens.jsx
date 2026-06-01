import { useState } from 'react';
import { MessageSquare, CornerDownRight, CheckCircle2, User, ShieldAlert } from 'lucide-react';
import dados from '../dados/bancoDeDados.json';

export default function Mensagens() {
  const [mensagens, setMensagens] = useState(dados.mensagens);
  const [inputsRespostas, setInputsRespostas] = useState({}); 
  const [historicoRespostas, setHistoricoRespostas] = useState({}); 

  const lidarComMudancaInput = (id, valor) => {
    setInputsRespostas({
      ...inputsRespostas,
      [id]: valor
    });
  };

  const processarEnvioResposta = (id) => {
    const textoParaEnviar = inputsRespostas[id];
    if (!textoParaEnviar || textoParaEnviar.trim() === '') return;

    // Salva a resposta individualmente vinculada ao ID do chamado
    setHistoricoRespostas({
      ...historicoRespostas,
      [id]: textoParaEnviar
    });

    // Altera o status da mensagem específica para respondida
    setMensagens(mensagens.map(m => m.id === id ? { ...m, respondida: true } : m));
    
    // Limpa o input específico
    setInputsRespostas({
      ...inputsRespostas,
      [id]: ''
    });
  };

  return (
    <div className="conteudo-principal animar-entrada">
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '1.6rem', color: 'var(--texto-escuro)', fontWeight: '700' }}>Chamados Técnicos (SAC)</h1>
        <p style={{ color: 'var(--texto-mutado)' }}>Responda às requisições e modificações operacionais dos clientes da cozinha.</p>
      </header>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {mensagens.map(m => (
          <article 
            key={m.id} 
            style={{ 
              background: 'var(--fundo-card)', 
              padding: '28px', 
              borderRadius: '20px', 
              border: '1px solid var(--borda)', 
              borderLeft: m.respondida ? '6px solid #27AE60' : '6px solid var(--primaria)', 
              boxShadow: 'var(--sombra-leve)',
              transition: 'var(--transicao-suave)'
            }}
          >
            <div style={{ display: 'flex', justifyScontent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'var(--fundo-app)', padding: '8px', borderRadius: '50%', color: 'var(--texto-escuro)' }}><User size={16}/></div>
                <strong style={{ color: 'var(--texto-escuro)', fontSize: '1.05rem' }}>{m.cliente}</strong>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginLeft: 'auto' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: '700', padding: '4px 10px', borderRadius: '8px', background: 'var(--fundo-app)', color: 'var(--texto-mutado)' }}>{m.pedidoId}</span>
                <span style={{ color: 'var(--texto-mutado)', fontSize: '0.85rem' }}>{m.horario}</span>
              </div>
            </div>
            
            <p style={{ color: 'var(--texto-escuro)', fontSize: '0.95rem', background: 'var(--fundo-app)', padding: '16px', borderRadius: '12px', border: '1px solid var(--borda)', marginBottom: '20px', lineHeight: '1.6' }}>
              {m.texto}
            </p>

            {/* Alerta Personalizado de Resposta Injetada */}
            {historicoRespostas[m.id] && (
              <div style={{ padding: '16px', background: 'rgba(39, 174, 96, 0.05)', borderRadius: '14px', border: '1px solid rgba(39, 174, 96, 0.2)', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <strong style={{ fontSize: '0.85rem', color: '#27AE60', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16}/> Resposta de Contra-Nota Enviada:
                </strong>
                <p style={{ color: 'var(--texto-escuro)', fontSize: '0.9rem', paddingLeft: '22px' }}>{historicoRespostas[m.id]}</p>
              </div>
            )}

            {/* Formulário condicional por ID */}
            {!m.respondida ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <textarea
                  placeholder="Digite o parecer técnico ou resposta operacional para este chamado de salão..."
                  value={inputsRespostas[m.id] || ''}
                  onChange={(e) => lidarComMudancaInput(m.id, e.target.value)}
                  style={{ width: '100%', height: '90px', padding: '16px', borderRadius: '14px', border: '1px solid var(--borda)', background: 'var(--fundo-app)', color: 'var(--texto-escuro)', outline: 'none', resize: 'none', fontFamily: 'Poppins', fontSize: '0.9rem', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--primaria)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--borda)'}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-primario" style={{ padding: '12px 24px', fontSize: '0.85rem', borderRadius: '12px' }} onClick={() => processarEnvioResposta(m.id)}>
                    <CornerDownRight size={16} /> Processar Chamado #{m.id}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#27AE60', fontSize: '0.85rem', fontWeight: '700', marginTop: '12px' }}>
                <CheckCircle2 size={16}/> Chamado devidamente encerrado e arquivado no Bitebox SaaS.
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}