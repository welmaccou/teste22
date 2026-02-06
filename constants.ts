
import type { Situation } from './types';

export const SITUATION_OPTIONS: { value: Situation; label: string }[] = [
  { value: 'assalariado', label: 'Assalariado' },
  { value: 'autonomo', label: 'Autônomo/Profissional Liberal/Trabalhador Informal' },
  { value: 'aposentado', label: 'Aposentado ou Pensionista' },
  { value: 'mei', label: 'Microempreendedor Individual (MEI)' },
  { value: 'desempregado', label: 'Desempregado' },
  { value: 'nuncaTrabalhou', label: 'Nunca Trabalhou' },
  { value: 'beneficiario', label: 'Beneficiário de Programas Sociais (Bolsa Família, BPC, etc.)' },
  { value: 'estagiario', label: 'Estagiário' },
  { value: 'produtor', label: 'Produtor Rural/Lavrador' },
  { value: 'socio', label: 'Sócio ou Dirigente de Empresas (Microempresário)' },
];

export const DOCUMENTS_BY_SITUATION: Record<Situation, string[]> = {
    assalariado: [
        '(  ) Documentos de identificação e CPF.',
        '(  ) Se for o caso, certidão de casamento, Certidão de Averbação de Divórcio ou declaração de separação.',
        '(  ) Se maior de 18 anos, Carteira de Trabalho e Previdência Social. Caso seja física digitalizada, apresentar as páginas de identificação e do(s) contrato(s) de trabalho, mesmo que não haja registro, bem como a página subsequente ao último registro de trabalho. No caso de Carteira de Trabalho Digital, apresentar COMPLETA, em PDF, emitida pelo aplicativo ou site da Carteira de Trabalho Digital.',
        '(  ) Contracheque dos meses de Outubro, Novembro e Dezembro de 2025.',
        '(  ) Se for o caso, Declaração de Imposto de Renda Pessoa Física, exercício 2025, ano base 2024, acompanhada do recibo de entrega à Receita Federal do Brasil – <strong>se a pessoa não declarou, não é necessário apresentar.</strong>',
        '(  ) Extrato atualizado da conta vinculada do(a) trabalhador(a) no FGTS. Documento dispensável para servidores públicos.',
        '(  ) Relatório de Contas e Relacionamentos em Bancos (CSS) emitido por meio do sistema Registrato do Banco Central do Brasil (BACEN), disponível em: https://www.bcb.gov.br/meubc/registrato.', 
        '(  ) Extratos de todas as contas bancária, física e/ou digital, corrente e/ou poupança, dos meses de Outubro, Novembro e Dezembro de 2025. Se não possuir conta, emitir nada consta por meio do link: https://www3.bcb.gov.br/nadaconsta/emitirCertidaoCCS.'
    ],
    autonomo: [
        '(  ) Documentos de identificação e CPF.',
        '(  ) Se for o caso, certidão de casamento, Certidão de Averbação de Divórcio ou declaração de separação.',
        '(  ) Se maior de 18 anos, Carteira de Trabalho e Previdência Social. Caso seja física digitalizada, apresentar as páginas de identificação e do(s) contrato(s) de trabalho, mesmo que não haja registro, bem como a página subsequente ao último registro de trabalho. No caso de Carteira de Trabalho Digital, apresentar COMPLETA, em PDF, emitida pelo aplicativo ou site da Carteira de Trabalho Digital.',
        '(  ) Declaração de trabalhador autônomo, liberal ou informal, modelo disponível em https://sisu.ufg.br/sistema/arquivos/arquivos/Anexos/DECLARA%C3%87%C3%95ES_RENDA.pdf .',
        '(  ) Se for motorista ou entregador de aplicativo, emitir relatório de rendimento do período de outubro a dezembro de 2025.',
        '(  ) Se for o caso, Declaração de Imposto de Renda Pessoa Física, exercício 2025, ano base 2024, acompanhada do recibo de entrega à Receita Federal do Brasil – <strong>se a pessoa não declarou, não é necessário apresentar.</strong>',
        '(  ) Relatório de Contas e Relacionamentos em Bancos (CSS) emitido por meio do sistema Registrato do Banco Central do Brasil (BACEN), disponível em: https://www.bcb.gov.br/meubc/registrato.',
        '(  ) Extratos de todas as contas bancária, física e/ou digital, corrente e/ou poupança, dos meses de Outubro, Novembro e Dezembro de 2025. Se não possuir conta, emitir nada consta por meio do link: https://www3.bcb.gov.br/nadaconsta/emitirCertidaoCCS.'
    ],
    aposentado: [
        '(  ) Documentos de identificação e CPF (criança ou adolescente pode ser certidão de nascimento).',
        '(  ) Se for o caso, certidão de casamento, Certidão de Averbação de Divórcio ou declaração de separação.',
        '(  ) Se maior de 18 anos, Carteira de Trabalho e Previdência Social. Caso seja física digitalizada, apresentar as páginas de identificação e do(s) contrato(s) de trabalho, mesmo que não haja registro, bem como a página subsequente ao último registro de trabalho. No caso de Carteira de Trabalho Digital, apresentar COMPLETA, em PDF, emitida pelo aplicativo ou site da Carteira de Trabalho Digital.',
        '(  ) Extrato da aposentadoria e/ou da pensão de um desses meses: de outubro, novembro e dezembro de 2025 para comprovação de pagamento de benefício (Aposentadoria, Pensão por Morte), emitido pelo site do INSS, por regime jurídico próprio e/ou previdência complementar, ou por órgão competente.',
        '(  ) Se pensão alimentícia: CASO seja Formal: dicisão judicial, ou outro documento. CASO seja informal: apresentar declaração de pensão alimentícia do responsável que conste o valor recebido, com cópia do RG do declarante, modelo disponível em https://sisu.ufg.br/sistema/arquivos/arquivos/Anexos/DECLARA%C3%87%C3%95ES_RENDA.pdf .',
        '(  ) Se for o caso, Declaração de Imposto de Renda Pessoa Física, exercício 2025, ano base 2024, acompanhada do recibo de entrega à Receita Federal do Brasil – <strong>se a pessoa não declarou, não é necessário apresentar.</strong>',
        '(  ) Relatório de Contas e Relacionamentos em Bancos (CSS) emitido por meio do sistema Registrato do Banco Central do Brasil (BACEN), disponível em: https://www.bcb.gov.br/meubc/registrato.',
        '(  ) Extratos de todas as contas bancária, física e/ou digital, corrente e/ou poupança, dos meses de Outubro, Novembro e Dezembro de 2025. Se não possuir conta, emitir nada consta por meio do link: https://www3.bcb.gov.br/nadaconsta/emitirCertidaoCCS.'
    ],
    mei: [
        '(  ) Documentos de identificação e CPF.',
        '(  ) Se for o caso, certidão de casamento, Certidão de Averbação de Divórcio ou declaração de separação.',
        '(  ) Carteira de Trabalho e Previdência Social. Caso seja física digitalizada, apresentar as páginas de identificação e do(s) contrato(s) de trabalho, mesmo que não haja registro, bem como a página subsequente ao último registro de trabalho. No caso de Carteira de Trabalho Digital, apresentar COMPLETA, em PDF, emitida pelo aplicativo ou site da Carteira de Trabalho Digital.',
        '(  ) Declaração Anual do Simples Nacional (DASN).',
        '(  ) Declaração de MEI, modelo disponível em: https://sisu.ufg.br/sistema/arquivos/arquivos/Anexos/DECLARA%C3%87%C3%95ES_RENDA.pdf.',
        '(  ) Se for o caso, Declaração de Imposto de Renda Pessoa Física, exercício 2025, ano base 2024, acompanhada do recibo de entrega à Receita Federal do Brasil – <strong>se a pessoa não declarou, não é necessário apresentar.</strong>',
        '(  ) Relatório de Contas e Relacionamentos em Bancos (CSS) emitido por meio do sistema Registrato do Banco Central do Brasil (BACEN), disponível em: https://www.bcb.gov.br/meubc/registrato.',
        '(  ) Extratos de todas as contas bancária, física e/ou digital, corrente e/ou poupança, dos meses de Outubro, Novembro e Dezembro de 2025. Se não possuir conta, emitir nada consta por meio do link: https://www3.bcb.gov.br/nadaconsta/emitirCertidaoCCS.'
    ],
    desempregado: [
        '(  ) Documentos de identificação e CPF (criança ou adolescente pode ser certidão de nascimento).',
        '(  ) Se for o caso, certidão de casamento, Certidão de Averbação de Divórcio ou declaração de separação.',
        '(  ) Se maior de 18 anos, Carteira de Trabalho e Previdência Social. Caso seja física digitalizada, apresentar as páginas de identificação e do(s) contrato(s) de trabalho, mesmo que não haja registro, bem como a página subsequente ao último registro de trabalho. No caso de Carteira de Trabalho Digital, apresentar COMPLETA, em PDF, emitida pelo aplicativo ou site da Carteira de Trabalho Digital.',
        '(  ) Comprovante de seguro-desemprego – se estiver recebendo.',
        '(  ) Termo de rescisão de contrato – para demissões que ocorreram nos últimos 12 meses.',
        '(  ) Declaração de desempregado. Modelo disponível em: https://sisu.ufg.br/sistema/arquivos/arquivos/Anexos/DECLARA%C3%87%C3%95ES_RENDA.pdf.',
        '(  ) Se for o caso, Declaração de Imposto de Renda Pessoa Física, exercício 2025, ano base 2024, acompanhada do recibo de entrega à Receita Federal do Brasil – <strong>se a pessoa não declarou, não é necessário apresentar.</strong>',
        '(  ) Relatório de Contas e Relacionamentos em Bancos (CSS) emitido por meio do sistema Registrato do Banco Central do Brasil (BACEN), disponível em: https://www.bcb.gov.br/meubc/registrato.',
        '(  ) Extratos de todas as contas bancária, física e/ou digital, corrente e/ou poupança, dos meses de Outubro, Novembro e Dezembro de 2025. Se não possuir conta, emitir nada consta por meio do link: https://www3.bcb.gov.br/nadaconsta/emitirCertidaoCCS.'
    ],
    nuncaTrabalhou: [
        '(  ) Documentos de identificação e CPF (criança ou adolescente pode ser certidão de nascimento).',
        '(  ) Se for o caso, certidão de casamento, Certidão de Averbação de Divórcio ou declaração de separação.',
        '(  ) Se maior de 18 anos, Carteira de Trabalho e Previdência Social. Caso seja física digitalizada, apresentar as páginas de identificação e do(s) contrato(s) de trabalho, mesmo que não haja registro, bem como a página subsequente ao último registro de trabalho. No caso de Carteira de Trabalho Digital, apresentar COMPLETA, em PDF, emitida pelo aplicativo ou site da Carteira de Trabalho Digital.',
        '(  ) Se maior de 18 anos, Declaração de desempregado. Modelo disponível em: https://sisu.ufg.br/sistema/arquivos/arquivos/Anexos/DECLARA%C3%87%C3%95ES_RENDA.pdf.',
        '(  ) Se for o caso, Declaração de Imposto de Renda Pessoa Física, exercício 2025, ano base 2024, acompanhada do recibo de entrega à Receita Federal do Brasil – <strong>se a pessoa não declarou, não é necessário apresentar.</strong>',
        '(  ) Se maior de 18 anos, Relatório de Contas e Relacionamentos em Bancos (CSS) emitido por meio do sistema Registrato do Banco Central do Brasil (BACEN), disponível em: https://www.bcb.gov.br/meubc/registrato.',
        '(  ) Extratos de todas as contas bancária, física e/ou digital, corrente e/ou poupança, dos meses de Outubro, Novembro e Dezembro de 2025. Se não possuir conta, emitir nada consta por meio do link: https://www3.bcb.gov.br/nadaconsta/emitirCertidaoCCS.'
    ],
    beneficiario: [
        '(  ) Comprovante atual de recebimento do benefício constando o nome e valor.',
        '(  ) Se maior de 18 anos, Carteira de Trabalho e Previdência Social. Caso seja física digitalizada, apresentar as páginas de identificação e do(s) contrato(s) de trabalho, mesmo que não haja registro, bem como a página subsequente ao último registro de trabalho. No caso de Carteira de Trabalho Digital, apresentar COMPLETA, em PDF, emitida pelo aplicativo ou site da Carteira de Trabalho Digital.',
        '(  ) Extrato do Benefício de Prestação Continuada (BPC) DE UM desses meses: de outubro, novembro e dezembro de 2025, emitido pelo site do INSS, por regime jurídico próprio e/ou previdência complementar, ou por órgão competente.',
        '(  ) Relatório de Contas e Relacionamentos em Bancos (CSS) emitido por meio do sistema Registrato do Banco Central do Brasil (BACEN), disponível em: https://www.bcb.gov.br/meubc/registrato.',
        '(  ) Extratos de todas as contas bancária, física e/ou digital, corrente e/ou poupança, dos meses de Outubro, Novembro e Dezembro de 2025. Se não possuir conta, emitir nada consta por meio do link: https://www3.bcb.gov.br/nadaconsta/emitirCertidaoCCS.'
    ],
    estagiario: [
        '(  ) Contrato de estágio ou termo de compromisso de bolsa, com período de vigência.',
        '(  ) Se maior de 18 anos, Carteira de Trabalho e Previdência Social. Caso seja física digitalizada, apresentar as páginas de identificação e do(s) contrato(s) de trabalho, mesmo que não haja registro, bem como a página subsequente ao último registro de trabalho. No caso de Carteira de Trabalho Digital, apresentar COMPLETA, em PDF, emitida pelo aplicativo ou site da Carteira de Trabalho Digital.',
        '(  ) Relatório de Contas e Relacionamentos em Bancos (CSS) emitido por meio do sistema Registrato do Banco Central do Brasil (BACEN), disponível em: https://www.bcb.gov.br/meubc/registrato.',
        '(  ) Extratos de todas as contas bancária, física e/ou digital, corrente e/ou poupança, dos meses de Outubro, Novembro e Dezembro de 2025. Se não possuir conta, emitir nada consta por meio do link: https://www3.bcb.gov.br/nadaconsta/emitirCertidaoCCS.'
    ],
    produtor: [
        '(  ) Declaração de Produtor Rural. Modelo disponível em: https://sisu.ufg.br/sistema/arquivos/arquivos/Anexos/DECLARA%C3%87%C3%95ES_RENDA.pdf.',
        '(  ) Carteira de Trabalho e Previdência Social. Caso seja física digitalizada, apresentar as páginas de identificação e do(s) contrato(s) de trabalho, mesmo que não haja registro, bem como a página subsequente ao último registro de trabalho. No caso de Carteira de Trabalho Digital, apresentar COMPLETA, em PDF, emitida pelo aplicativo ou site da Carteira de Trabalho Digital.',
        '(  ) Se for o caso, Declaração de Imposto de Renda Pessoa Física e/ou de Pessoa Jurídica, exercício 2025, ano base 2024, acompanhada do recibo de entrega à Receita Federal do Brasil – <strong>se a pessoa não declarou, não é necessário apresentar.</strong>',
        '(  ) Notas fiscais de vendas, relativas à produção rural, de outubro, novembro e dezembro de 2025. Se não emitir notas fiscais, não é necessário apresentar.',
        '(  ) Escritura da terra ou termo de uso emitido pelo INCRA.',
        '(  ) Declaração do Imposto sobre a Propriedade Territorial Rural - DITR (exercício 2025 ano base 2024), acompanhada do recibo de entrega à Receita Federal do Brasil. Se a pessoa não declarou, não é necessário apresentar.',
        '(  ) Relatório de Contas e Relacionamentos em Bancos (CSS) emitido por meio do sistema Registrato do Banco Central do Brasil (BACEN), disponível em: https://www.bcb.gov.br/meubc/registrato.',
        '(  ) Extratos de todas as contas bancária, física e/ou digital, corrente e/ou poupança, dos meses de Outubro, Novembro e Dezembro de 2025. Se não possuir conta, emitir nada consta por meio do link: https://www3.bcb.gov.br/nadaconsta/emitirCertidaoCCS.'
    ],
    socio: [
        '(  ) Contracheques ou todas as retiradas de Pró-Labore dos meses de outubro, novembro e dezembro de 2025.',
        '(  ) Declaração Anual do Simples Nacional de 2025.',
        '(  ) Declaração Comprobatória de Percepção de Rendimentos (DECORE).',
        '(  ) Declaração de Imposto de Renda Pessoa Jurídica, exercício 2025, ano base 2024, acompanhada do recibo de entrega à Receita Federal do Brasil.',
        '(  ) Se for o caso, Declaração de Imposto de Renda Pessoa Física, exercício 2025, ano base 2024, acompanhada do recibo de entrega à Receita Federal do Brasil – <strong>se a pessoa não declarou, não é necessário apresentar.</strong>',
        '(  ) Relatório de Contas e Relacionamentos em Bancos (CSS) emitido por meio do sistema Registrato do Banco Central do Brasil (BACEN), disponível em: https://www.bcb.gov.br/meubc/registrato.',
        '(  ) Extratos de todas as contas bancária, física e/ou digital, corrente e/ou poupança, dos meses de Outubro, Novembro e Dezembro de 2025. Se não possuir conta, emitir nada consta por meio do link: https://www3.bcb.gov.br/nadaconsta/emitirCertidaoCCS.'
    ]
};
