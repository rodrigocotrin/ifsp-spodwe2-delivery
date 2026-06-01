import { useState } from 'react';
import { Edit2, Trash2, PlusCircle, Save, ArrowUpDown, SortAsc } from 'lucide-react';
import dados from '../dados/bancoDeDados.json';

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
    onAviso("Ordenação de catálogo aplicada com sucesso!");
  };

  const salvarPrato = (e) => {
    e.preventDefault();
    if (!nome || !preco) return;

    if (editandoId) {
      // UPDATE GLOBAL
      setPratosCompartilhados(pratosCompartilhados.map(p => p.id === editandoId ? { ...p, nome, preco: parseFloat(preco) } : p));
      setEditandoId(null);
      onAviso("Item de cardápio alterado com sucesso!");
    } else {
      // CREATE GLOBAL
      const novo = { 
        id: Date.now(), 
        categoriaId: 1, 
        nome, 
        preco: parseFloat(preco), 
        avaliacao: 5.0, 
        tag: "Injetado", 
        imagem: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80", 
        descricao: "Insumo e registro técnico cadastrado via painel administrativo SaaS." 
      };
      setPratosCompartilhados([novo, ...pratosCompartilhados]);
      onAviso("Item adicionado ao catálogo global!");
    }
    setNome(''); setPreco('');
  };

  return (
    <div className="animar-entrada conteudo-principal">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', color: 'var(--texto-escuro)', fontWeight: '700' }}>Controle de Patrimônio de Cardápio</h1>
          <p style={{ color: 'var(--texto-mutado)', fontSize: '0.9rem' }}>Gerencie preços, insumos e listagens do ecossistema.</p>
        </div>
        
        {/* Submenu de Ordenação com Ícones Estáveis */}
        <div style={{ display: 'flex', gap: '8px', background: 'var(--fundo-card)', padding: '6px', borderRadius: '14px', border: '1px solid var(--borda)', boxShadow: 'var(--sombra-leve)' }}>
          <button className="btn" style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', background: 'transparent', color: 'var(--texto-mutado)', gap: '6px' }} onClick={() => ordenar('nome')}>
            <SortAsc size={16} /> Nome A-Z
          </button>
          <button className="btn" style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', background: 'transparent', color: 'var(--texto-mutado)', gap: '6px' }} onClick={() => ordenar('preco-cres')}>
            <ArrowUpDown size={16} /> Menor Preço
          </button>
          <button className="btn" style={{ padding: '10px 14px', borderRadius: '10px', fontSize: '0.85rem', background: 'transparent', color: 'var(--texto-mutado)', gap: '6px' }} onClick={() => ordenar('preco-decres')}>
            <ArrowUpDown size={16} /> Maior Preço
          </button>
        </div>
      </div>
      
      <div className="painel-crud" style={{ background: editandoId ? 'rgba(255, 107, 0, 0.03)' : 'var(--fundo-card)', marginBottom: '32px' }}>
        <h3 style={{ marginBottom: '20px', color: editandoId ? 'var(--primaria)' : 'var(--texto-mutado)', fontSize: '1rem' }}>
          {editandoId ? 'Alterar Especificações do Produto' : 'Provisionar Novo Item de Venda'}
        </h3>
        <form onSubmit={salvarPrato} className="form-linha">
          <input type="text" placeholder="Nome técnico do produto" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="number" step="0.01" placeholder="Preço Base (R$)" value={preco} onChange={(e) => setPreco(e.target.value)} />
          <button type="submit" className="btn btn-primario" style={{ minWidth: '180px' }}>
            {editandoId ? <Save size={18} /> : <PlusCircle size={18} />}
            {editandoId ? 'Salvar Item' : 'Provisionar'}
          </button>
        </form>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {pratosCompartilhados.map(prato => (
          <div key={prato.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--fundo-card)', padding: '16px 24px', border: '1px solid var(--borda)', borderRadius: '16px', boxShadow: 'var(--sombra-leve)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <img src={prato.imagem} alt={prato.nome} style={{ width: '60px', height: '60px', borderRadius: '12px', objectFit: 'cover' }} />
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--texto-escuro)' }}>{prato.nome}</h3>
                <span style={{ color: 'var(--primaria)', fontWeight: '700' }}>R$ {prato.preco.toFixed(2)}</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => iniciarEdicao(prato)} style={{ background: 'transparent', border: '1px solid var(--borda)', padding: '10px', borderRadius: '8px', cursor: 'pointer', color: 'var(--texto-escuro)' }}><Edit2 size={18} /></button>
              <button onClick={() => { setPratosCompartilhados(pratosCompartilhados.filter(p => p.id !== prato.id)); onAviso("Item removido do ecossistema!"); }} style={{ background: '#FFF0F0', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', color: '#E53E3E' }}><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}