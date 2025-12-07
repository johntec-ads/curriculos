import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Registrar fonte (opcional - usa fonte padrão se não registrar)
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
  ],
});

// Estilos do PDF
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 10,
    backgroundColor: '#ffffff',
  },
  // Cabeçalho
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#1976d2',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  contactItem: {
    fontSize: 10,
    color: '#666666',
    marginRight: 15,
  },
  // Seções
  section: {
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 4,
  },
  // Objetivo
  objective: {
    fontSize: 10,
    color: '#444444',
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  // Experiência
  experienceItem: {
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
  },
  company: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 2,
  },
  period: {
    fontSize: 9,
    color: '#888888',
    marginBottom: 4,
  },
  description: {
    fontSize: 10,
    color: '#444444',
    lineHeight: 1.4,
    textAlign: 'justify',
  },
  // Educação
  educationItem: {
    marginBottom: 10,
  },
  course: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
  },
  institution: {
    fontSize: 10,
    color: '#666666',
  },
  // Habilidades e Idiomas
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  skillBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  skillText: {
    fontSize: 9,
    color: '#1976d2',
  },
  // Marca d'água
  watermark: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    fontSize: 60,
    color: 'rgba(0, 0, 0, 0.03)',
    transform: 'rotate(-45deg)',
  },
});

// Função para formatar data
const formatDate = (date) => {
  if (!date) return 'Presente';
  return new Date(date).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
  });
};

// Componente do Template PDF
const PDFTemplate1 = ({ data }) => {
  if (!data) return null;

  const {
    personalInfo,
    experience = [],
    education = [],
    skills = [],
    languages = [],
  } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Marca d'água */}
        <Text style={styles.watermark}>JOHNTEC.ADS</Text>

        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {personalInfo?.name || 'Nome não informado'}
          </Text>
          <View style={styles.contactInfo}>
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
              <Text style={styles.contactItem}>
                LinkedIn: {personalInfo.linkedin}
              </Text>
            )}
          </View>
        </View>

        {/* Objetivo Profissional */}
        {personalInfo?.objective && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivo Profissional</Text>
            <Text style={styles.objective}>{personalInfo.objective}</Text>
          </View>
        )}

        {/* Experiência Profissional */}
        {experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiência Profissional</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.experienceItem} wrap={false}>
                <Text style={styles.jobTitle}>{exp.position}</Text>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.period}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Text>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Educação */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Educação</Text>
            {education.map((edu, index) => (
              <View key={index} style={styles.educationItem} wrap={false}>
                <Text style={styles.course}>{edu.course}</Text>
                <Text style={styles.institution}>
                  {edu.institution} ({formatDate(edu.startDate)} -{' '}
                  {formatDate(edu.endDate)})
                </Text>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Habilidades */}
        {skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsContainer}>
              {skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Idiomas */}
        {languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Idiomas</Text>
            <View style={styles.skillsContainer}>
              {languages.map((language, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{language}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFTemplate1;
