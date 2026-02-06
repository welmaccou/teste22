
import React, { useState, useRef, useCallback } from 'react';
import type { CandidateData, PersonData } from './types';
import { SITUATION_OPTIONS, DOCUMENTS_BY_SITUATION } from './constants';
import { PersonInfoForm } from './components/PersonInfoForm';
import { Checklist } from './components/Checklist';
import { PdfIcon } from './components/Icons';

// Declare jspdf for TypeScript since it's loaded from a CDN
declare const jspdf: any;

const App: React.FC = () => {
  const [step, setStep] = useState<'initial' | 'form' | 'checklist'>('initial');
  const [familySize, setFamilySize] = useState<number>(0);
  const [candidate, setCandidate] = useState<CandidateData>({
    id: 'candidate',
    name: '',
    situations: [],
    housing: '',
    isSingleOrphan: '',
    hasRentalIncome: '',
    hasFarm: '',
  });
  const [members, setMembers] = useState<PersonData[]>([]);
  const [checklistHtml, setChecklistHtml] = useState<string>('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);

  const checklistRef = useRef<HTMLDivElement>(null);

  const handleConfirmFamilySize = () => {
    if (familySize >= 0) {
      setMembers(Array.from({ length: familySize }, (_, i) => ({
        id: `member-${i}`,
        name: '',
        situations: [],
      })));
      setStep('form');
    }
  };

  const validateForm = useCallback(() => {
    if (!candidate.name.trim()) {
      alert("O nome do candidato é obrigatório.");
      return false;
    }
    if (candidate.situations.length === 0) {
      alert("A situação do candidato é obrigatória.");
      return false;
    }
    for (const member of members) {
      if (!member.name.trim()) {
        alert(`O nome do membro da família é obrigatório.`);
        return false;
      }
      if (member.situations.length === 0) {
        alert(`A situação do membro da família é obrigatória.`);
        return false;
      }
    }
    return true;
  }, [candidate, members]);

  const generateChecklist = useCallback(() => {
    if (!validateForm()) return;
    
    let html = '';
    
    // Candidate documents
    const candidateSituations = candidate.situations;
    let candidateDocs = new Set<string>();
    candidateSituations.forEach(sit => {
        DOCUMENTS_BY_SITUATION[sit]?.forEach(doc => candidateDocs.add(doc));
    });

    if (candidate.housing === 'alugada') candidateDocs.add('(  ) Contrato de locação, recibo de pagamento do aluguel ou declaração do locador com informações do imóvel e valor do aluguel.');
    if (candidate.housing === 'financiada') candidateDocs.add('(  ) Comprovante da prestação do financiamento da casa própria atualizado.');
    if (candidate.housing === 'cedida') candidateDocs.add('(  ) Declaração de imóvel cedido.');
    if (candidate.isSingleOrphan === 'sim') candidateDocs.add('(  ) Certidão de óbito do pai/mãe.');

    html += `<div class="member-section"><h3 class="section-title">Documentos de ${candidate.name}</h3><ul>`;
    html += `<li>(  ) Declaração de composição do núcleo familiar, disponível em: https://sisu.ufg.br/sistema/arquivos/arquivos/Anexos/DECLARA%C3%87%C3%95ES_RENDA.pdf</li>`;
    html += `<li>(  ) Comprovantes de despesas: Comprovantes de água e condomínio (necessários apenas para quem possui essas contas), luz e telefone/internet, de um desses meses: outubro, novembro e dezembro de 2025. Não é necessário estarem pagos.</li>`;
    candidateDocs.forEach(doc => { html += `<li>${doc}</li>`; });
    html += `</ul></div>`;

    // Family members documents
    members.forEach(member => {
        let memberDocs = new Set<string>();
        member.situations.forEach(sit => {
            DOCUMENTS_BY_SITUATION[sit]?.forEach(doc => memberDocs.add(doc));
        });
        html += `<div class="member-section"><h3 class="section-title">Documentos de ${member.name}</h3><ul>`;
        memberDocs.forEach(doc => { html += `<li>${doc}</li>`; });
        html += `</ul></div>`;
    });

    // Other documents
    let otherDocs: string[] = [];
    if (candidate.hasRentalIncome === 'sim') otherDocs.push('(  ) Cópia do(s) contrato(s) de locação e/ou do(s) recibo(s) dos imóveis alugados de membro(os) da família.');
    if (candidate.hasFarm === 'sim') otherDocs.push('(  ) Escritura ou termo de uso emitido pelo INCRA das chácara(s), sítio(s) ou fazenda(s) de membro(os) da família.');

    if(otherDocs.length > 0) {
        html += `<div class="member-section"><h3 class="section-title">Outros Documentos</h3><ul>`;
        otherDocs.forEach(doc => { html += `<li>${doc}</li>`; });
        html += `</ul></div>`;
    }

    setChecklistHtml(html);
    setStep('checklist');
  }, [candidate, members, validateForm]);
  
  const downloadPdf = useCallback(async () => {
    if (!checklistRef.current) return;
    setIsGeneratingPdf(true);
    try {
      const canvas = await (window as any).html2canvas(checklistRef.current, {
        scale: 2, // Improve quality
        useCORS: true,
      });
      const imgData = canvas.toDataURL('image/png');

      const { jsPDF } = jspdf;
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
      });

      const margin = 15; // 1.5 cm
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const contentWidth = pdfWidth - margin * 2;
      const contentHeight = pdfHeight - margin * 2;

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate the height of the image in the PDF's units, maintaining aspect ratio
      const ratio = contentWidth / imgWidth;
      const totalPdfHeight = imgHeight * ratio;

      let yPosition = 0;
      let heightLeft = totalPdfHeight;

      // Add the first page
      pdf.addImage(imgData, 'PNG', margin, margin, contentWidth, totalPdfHeight);
      heightLeft -= contentHeight;

      while (heightLeft > 0) {
        yPosition -= contentHeight;
        pdf.addPage();
        // The y-coordinate for addImage specifies where the top of the image is placed.
        // To show the next part of the image, we need to shift the image "up" by the height
        // of the content area of the previous page.
        pdf.addImage(imgData, 'PNG', margin, yPosition + margin, contentWidth, totalPdfHeight);
        heightLeft -= contentHeight;
      }
      
      pdf.save(`checklist-sisu-ufg-${candidate.name.replace(/\s/g, '_')}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Ocorreu um erro ao gerar o PDF. Tente novamente.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }, [candidate.name]);

  const reset = () => {
    setStep('initial');
    setFamilySize(0);
    setCandidate({
        id: 'candidate', name: '', situations: [], housing: '', 
        isSingleOrphan: '', hasRentalIncome: '', hasFarm: ''
    });
    setMembers([]);
    setChecklistHtml('');
  };

  const renderStep = () => {
    switch (step) {
      case 'initial':
        return (
          <div className="w-full">
            <label htmlFor="family-size" className="block text-sm font-medium text-gray-700 mb-1">
              Quantidade de pessoas no grupo familiar (além do candidato):
            </label>
            <input
              type="number"
              id="family-size"
              value={familySize}
              onChange={(e) => setFamilySize(Math.max(0, parseInt(e.target.value) || 0))}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Digite 0 se mora sozinho"
            />
            <button
              onClick={handleConfirmFamilySize}
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Confirmar
            </button>
          </div>
        );
      case 'form':
        return (
          <div className="w-full space-y-8">
            <PersonInfoForm
              person={candidate}
              onUpdate={setCandidate}
              isCandidate
              title="Informações do Candidato"
            />
            {members.map((member, index) => (
              <PersonInfoForm
                key={member.id}
                person={member}
                onUpdate={(updatedMember) => {
                  const newMembers = [...members];
                  newMembers[index] = updatedMember as PersonData;
                  setMembers(newMembers);
                }}
                isCandidate={false}
                title={`Membro ${index + 1}`}
              />
            ))}
            <button
              onClick={generateChecklist}
              className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 text-lg"
            >
              Gerar Checklist
            </button>
          </div>
        );
      case 'checklist':
        return (
          <div className="w-full">
            <Checklist checklistHtml={checklistHtml} ref={checklistRef} />
             <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={downloadPdf}
                disabled={isGeneratingPdf}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
              >
                <PdfIcon />
                {isGeneratingPdf ? 'Gerando PDF...' : 'Baixar Checklist em PDF'}
              </button>
              <button
                onClick={reset}
                className="flex-1 bg-gray-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Gerar Novo Checklist
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-700 tracking-tight">
                Checklist de Documentos
            </h1>
            <p className="mt-2 text-lg text-gray-600">Matrícula SISU UFG</p>
        </header>

        <main className="bg-white rounded-xl shadow-2xl p-6 sm:p-8">
          {step !== 'checklist' && (
            <>
              <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-800 p-4 rounded-md mb-6" role="alert">
                <h2 className="font-bold">Atenção</h2>
                <p className="mt-1 text-sm">Este gerador de checklist visa facilitar a identificação dos documentos necessários para a banca de análise socioeconômica para a matrículas do SISU, considerando a realidade socioeconômica de cada candidato; entretanto, <strong>não substitui a leitura cuidadosa da <a href="https://sisu.ufg.br/sistema/arquivos/arquivos/Anexos/ANEXO_IV_INSTRUCOES_PARA_MATRICULA_DOS_CANDIDATOS_APROVADOS.pdf" className="font-bold underline hover:text-blue-600" target="_blank" rel="noopener noreferrer">Relação de Documentos do Anexo IV</a> do edital.</strong></p>
              </div>
              <div className="text-sm text-gray-700 space-y-2 mb-6">
                <p><strong>Definição de Grupo Familiar:</strong> é considerado grupo familiar todas as pessoas que moram com você, que dividem ou não a mesma renda, eventualmente ampliada por outras pessoas que contribuam para o rendimento ou tenham suas despesas atendidas por aquela unidade familiar, todas moradoras em um mesmo domicílio.</p>
                <p><strong>Importante:</strong> o/a candidato que se define como único membro do grupo familiar e não possua rendimento próprio suficiente para a sua subsistência deverá informar o grupo familiar de origem, ainda que residente em local diverso do seu domicílio.</p>
              </div>
            </>
          )}

          <div className="flex justify-center">
            {renderStep()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;