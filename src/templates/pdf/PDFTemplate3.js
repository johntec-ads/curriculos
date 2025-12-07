/**
 * PDFTemplate3 - Template Centralizado com Grid
 * Usando @react-pdf/renderer para geração de PDF com texto real
 */
import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Registrar fonte Roboto
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
      fontWeight: 'normal',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontWeight: 'bold',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-italic-webfont.ttf',
      fontStyle: 'italic',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  // Header centralizado
  header: {
    textAlign: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 15,
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    color: '#333333',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
    color: '#666666',
  },
  contactItem: {
    fontSize: 9,
    color: '#666666',
  },
  // Objetivo centralizado e itálico
  objective: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
    color: '#444444',
    fontSize: 10,
    paddingHorizontal: 20,
  },
  // Grid de 2 colunas
  gridContainer: {
    flexDirection: 'row',
    gap: 25,
  },
  column: {
    flex: 1,
  },
  // Seções
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    textTransform: 'uppercase',
  },
  // Items
  itemContainer: {
    marginBottom: 10,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemSubtitle: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 3,
  },
  itemDate: {
    fontSize: 8,
    color: '#888888',
    marginBottom: 3,
  },
  itemDescription: {
    fontSize: 9,
    color: '#444444',
    lineHeight: 1.4,
  },
  // Skills e Languages
  skillItem: {
    fontSize: 9,
    color: '#444444',
    marginBottom: 4,
    paddingLeft: 8,
  },
  skillBullet: {
    position: 'absolute',
    left: 0,
  },
  // Marca d'água
  watermark: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    fontSize: 50,
    color: 'rgba(0, 0, 0, 0.03)',
    transform: 'rotate(-45deg)',
  },
});

const formatDate = (date) => {
  if (!date) return 'Presente';
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
  });
};

const sortByDate = (items) => {
  if (!Array.isArray(items)) return [];
  return [...items].sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );
};

const PDFTemplate3 = ({ data }) => {
  if (!data) return null;

  const { personalInfo, experience, education, skills, languages } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Marca d'água */}
        <Text style={styles.watermark}>JOHNTEC.ADS</Text>

        {/* Header Centralizado */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo?.name || 'Nome não informado'}
          </Text>
          <View style={styles.contactRow}>
            {personalInfo?.email && (
              <Text style={styles.contactItem}>{personalInfo.email}</Text>
            )}
            {personalInfo?.phone && (
              <Text style={styles.contactItem}>{personalInfo.phone}</Text>
            )}
            {personalInfo?.address && (
              <Text style={styles.contactItem}>{personalInfo.address}</Text>
            )}
            {personalInfo?.linkedin && (
              <Text style={styles.contactItem}>{personalInfo.linkedin}</Text>
            )}
          </View>
        </View>

        {/* Objetivo */}
        {personalInfo?.objective && (
          <Text style={styles.objective}>{personalInfo.objective}</Text>
        )}

        {/* Grid de 2 Colunas */}
        <View style={styles.gridContainer}>
          {/* Coluna Esquerda - Experiência e Educação */}
          <View style={styles.column}>
            {/* Experiência */}
            {experience && experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Experiência Profissional
                </Text>
                {sortByDate(experience).map((exp, index) => (
                  <View key={index} style={styles.itemContainer} wrap={false}>
                    <Text style={styles.itemTitle}>{exp.position}</Text>
                    <Text style={styles.itemSubtitle}>{exp.company}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                    </Text>
                    {exp.description && (
                      <Text style={styles.itemDescription}>
                        {exp.description}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Educação */}
            {education && education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Educação</Text>
                {education.map((edu, index) => (
                  <View key={index} style={styles.itemContainer} wrap={false}>
                    <Text style={styles.itemTitle}>{edu.course}</Text>
                    <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                    {edu.description && (
                      <Text style={styles.itemDescription}>
                        {edu.description}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Coluna Direita - Habilidades e Idiomas */}
          <View style={styles.column}>
            {/* Habilidades */}
            {skills && skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Habilidades</Text>
                {skills.map((skill, index) => (
                  <Text key={index} style={styles.skillItem}>
                    • {skill}
                  </Text>
                ))}
              </View>
            )}

            {/* Idiomas */}
            {languages && languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Idiomas</Text>
                {languages.map((lang, index) => (
                  <Text key={index} style={styles.skillItem}>
                    • {lang}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFTemplate3;
