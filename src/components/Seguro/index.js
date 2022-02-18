import React, { useState, useEffect } from 'react';
import { Input, Divider, Select } from "antd";

import { verSeguradora } from '../../functions';

import colors from "../../utils/colors";
import { maskDate } from '../../hooks/mask';

const Seguro = ({ dados }) => {
  const [seguradoras, setSeguradoras] = useState([]);

  const [finalVigencia, setFinalVigencia] = useState('');
  const [seguradora, setSeguradora] = useState(null);

  useEffect(() => {
    (async() => {
      setSeguradoras(await verSeguradora());
    })();
  }, []);

  return (
    <>
      <div>
        <h3>SEGURADO:</h3>
        <div>
          <label>NOME COMPLETO:</label>
          <Input type='text' style={{cursor: 'default', fontSize: 17, color: colors.text.secondary, fontWeight: 'bold'}} readOnly disabled value={dados.segurado.nome} />
        </div>
        <br/>
        <div>
          <label>CPF:</label>
          <Input type='text' style={{cursor: 'default', fontSize: 17, color: colors.text.secondary, fontWeight: 'bold'}} readOnly disabled value={dados.segurado.cpf} />
        </div>
      </div>
      <Divider />
      <div>
        <h3>INFORMAÇÕES DO SEGURO:</h3>
        <div>
          <label>SEGURADORA:</label>
          {(dados.seguroVinculado) ? (
            <Input type='text' style={{cursor: 'default', border: 'none', outline: 'none', background: 'white', fontSize: 17, color: colors.text.secondary, fontWeight: 'bold', padding: 0}} value={String(dados.seguradora.razao_social).toUpperCase()} disabled readOnly />
          ) : (
            <>
              <Input id='seguroVinculado-seguradora' type='hidden' value={seguradora} />
              <Select placeholder='SELECIONAR A SEGURADORA' style={{width: '100%', border: 'none', outlineStyle: 'none', fontSize: 17, color: colors.text.secondary, fontWeight: 'bold', padding: 0}}
                onChange={(e) => setSeguradora(e)}
              >
                {seguradoras.map((item, index) => (
                  <Select.Option key={index} value={JSON.stringify({
                    uid: item.uid,
                    razao_social: item.razao_social
                  })}>{item.razao_social}</Select.Option>
                ))}
              </Select>
            </>
          )}
        </div>
        <br/>
        <div>
          <label>FINAL DA VIGÊNCIA:</label>
          {(dados.seguroVinculado) ? (
            <Input type='tel' style={{cursor: 'default', fontSize: 17, color: colors.text.secondary, fontWeight: 'bold'}} readOnly value={dados.finalVigencia} disabled readOnly />
          ) : (
            <Input placeholder='00/00/0000' type='tel' maxLength={10} id='seguroVinculado-finalVigencia' value={finalVigencia} type='text' style={{fontSize: 17, color: colors.text.secondary, fontWeight: 'bold'}}
              onChange={(e) => setFinalVigencia(maskDate(e.target.value))}
            />
          )}
        </div>
        <br/>
        <div>
          <label>PLACA:</label>
          <Input type='text' style={{cursor: 'default', fontSize: 17, color: colors.text.secondary, fontWeight: 'bold'}} readOnly disabled value={dados.veiculo.placa} />
        </div>
      </div>
    </>
  )
}

export default Seguro;