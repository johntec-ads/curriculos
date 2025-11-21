// Serviço simples para consultar CEP usando ViaCEP
export async function lookupCep(cep) {
  const sanitized = (cep || '').toString().replace(/\D/g, '');
  if (sanitized.length !== 8) {
    throw new Error('CEP inválido');
  }

  const res = await fetch(`https://viacep.com.br/ws/${sanitized}/json/`);
  if (!res.ok) {
    throw new Error('Falha na requisição de CEP');
  }

  const data = await res.json();
  if (data.erro) {
    throw new Error('CEP não encontrado');
  }

  return data; // { cep, logradouro, complemento, bairro, localidade, uf, ... }
}

export default lookupCep;
