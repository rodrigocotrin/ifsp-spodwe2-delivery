import { useState } from 'react';
import { Edit2, Trash2, PlusCircle, Save, ArrowUpDown, SortAsc } from 'lucide-react';

export default function Pratos({ onAviso, pratosCompartilhados, setPratosCompartilhados }) {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [editandoId, setEditandoId] = useState(null);

  const ordenar = (tipo) => {
    let aux = [...pratosCompartilhados];
    if (tipo === 'nome') aux.sort((a, b) => a.nome.localeCompare(b.nome));
    if (tipo === 'preco-cres') aux.sort((a, b) => a.preco - b.preco);
    if (tipo === 'preco-decres') aux.sort((a, b) => b.preco - a.preco);
    setPratosCompartilhados(aux);
    onAviso("Ordenação de matriz aplicada!");
  };

  const iniciarEdicao = (prato) => {
    setEditandoId(prato.id);
    setNome(prato.nome);
    setPreco(prato.preco.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const salvarPrato = (e) => {
    e.preventDefault();
    if (!nome || !preco) return;

    if (editandoId) {
      setPratosCompartilhados(pratosCompartilhados.map(p => p.id === editandoId ? { ...p, nome, preco: parseFloat(preco) } : p));
      setEditandoId(null);
      onAviso("Registro modificado no banco de dados.");
    } else {
      const novo = { 
        id: Date.now(), 
        categoriaId: 1, 
        nome, 
        preco: parseFloat(preco), 
        avaliacao: 5.0, 
        tag: "Novo Cadastro", 
        imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80", 
        descricao: "Insumo técnico parametrizado pelo painel administrativo." 
      };
      setPratosCompartilhados([novo, ...pratosCompartilhados]);
      onAviso("Novo ativo provisionado com sucesso.");
    }
    setNome(''); setPreco('');
  };

  return (
    <div className="animar-entrada conteudo-principal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--texto-escuro)', fontWeight: '800' }}>Engenharia de Catálogo</h1>
          <p style={{ color: 'var(--texto-mutado)', fontSize: '0.95rem' }}>Controle estrito de CRUD para listagens e preços de insumos.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', background: 'var(--fundo-card)', padding: '8px', borderRadius: '16px', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)' }}>
          <button className="btn" style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '0.85rem', background: 'transparent', color: 'var(--texto-escuro)', gap: '8px' }} onClick={() => ordenar('nome')}>
            <SortAsc size={16} color="var(--texto-mutado)" /> Alfabética
          </button>
          <button className="btn" style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '0.85rem', background: 'transparent', color: 'var(--texto-escuro)', gap: '8px' }} onClick={() => ordenar('preco-cres')}>
            <ArrowUpDown size={16} color="var(--texto-mutado)" /> Base Alta
          </button>
          <button className="btn" style={{ padding: '10px 16px', borderRadius: '10px', fontSize: '0.85rem', background: 'transparent', color: 'var(--texto-escuro)', gap: '8px' }} onClick={() => ordenar('preco-decres')}>
            <ArrowUpDown size={16} color="var(--texto-mutado)" /> Base Baixa
          </button>
        </div>
      </div>
      
      <div className="painel-crud" style={{ marginBottom: '40px', position: 'relative', overflow: 'hidden' }}>
        {editandoId && <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: 'var(--primaria)' }}></div>}
        <h3 style={{ marginBottom: '24px', color: 'var(--texto-escuro)', fontSize: '1.1rem', fontWeight: '800' }}>
          {editandoId ? 'Atualização de Instância de Produto' : 'Provisionamento de Novo Registro'}
        </h3>
        <form onSubmit={salvarPrato} className="form-linha">
          <input type="text" placeholder="Nomeclatura técnica" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="number" step="0.01" placeholder="Valor Unitário (R$)" value={preco} onChange={(e) => setPreco(e.target.value)} />
          <button type="submit" className="btn btn-primario" style={{ minWidth: '200px' }}>
            {editandoId ? <Save size={18} /> : <PlusCircle size={18} />}
            {editandoId ? 'Confirmar Mutação' : 'Injetar no Banco'}
          </button>
        </form>
      </div>

      <div className="tabela-container">
        <table className="tabela-crud">
          <thead>
            <tr>
              <th>Identificação do Ativo</th>
              <th>Status Lógico</th>
              <th>Valor Base</th>
              <th style={{ textAlign: 'right' }}>Ações de Controle</th>
            </tr>
          </thead>
          <tbody>
            {pratosCompartilhados.map(prato => (
              <tr key={prato.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img src={prato.imagem} alt={prato.nome} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: '700', color: 'var(--texto-escuro)', fontSize: '1.05rem' }}>{prato.nome}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--texto-mutado)' }}>UUID: {prato.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ background: 'rgba(39, 174, 96, 0.1)', color: '#27AE60', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '700' }}>
                    Ativo
                  </span>
                </td>
                <td>
                  <span style={{ fontWeight: '800', color: 'var(--texto-escuro)' }}>R$ {prato.preco.toFixed(2)}</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <button onClick={() => iniciarEdicao(prato)} style={{ background: 'var(--fundo-app)', border: '1px solid var(--borda)', padding: '10px', borderRadius: '10px', cursor: 'pointer', color: 'var(--texto-escuro)', transition: 'var(--transicao-suave)' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--primaria)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--borda)'}>
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => { setPratosCompartilhados(pratosCompartilhados.filter(p => p.id !== prato.id)); onAviso("Instância purgada da memória."); }} style={{ background: 'rgba(231, 76, 60, 0.1)', border: 'none', padding: '10px', borderRadius: '10px', cursor: 'pointer', color: '#E74C3C', transition: 'var(--transicao-suave)' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(231, 76, 60, 0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(231, 76, 60, 0.1)'}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}