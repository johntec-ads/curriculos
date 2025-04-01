import { useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';

function Preview() {
  const [curriculumData, setCurriculumData] = useState(null);
  
  useEffect(() => {
    const data = localStorage.getItem('curriculumData');
    if (data) {
      setCurriculumData(JSON.parse(data));
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => document.getElementById('curriculum-preview'),
  });

  return (
    <div>
      <div id="curriculum-preview">
        {/* Template do currículo usando curriculumData */}
      </div>
      <button onClick={handlePrint}>Imprimir/Salvar PDF</button>
    </div>
  );
}

export default Preview;