/**
 * PDFTemplate4 - Template Simples e Direto
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
  // Header
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 15,
  },
  // Contact Info
  contactSection: {
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  contactLabel: {
    fontWeight: 'bold',
    width: 70,
    fontSize: 10,
  },
  contactValue: {
    fontSize: 10,
    color: '#333333',
  },
  // Section
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
    color: '#333333',
  },
  // Paragraph
  paragraph: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#444444',
    marginBottom: 10,
  },
  // Items
  itemContainer: {
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
  },
  itemSubtitle: {
    fontSize: 10,
    color: '#666666',
  },
  itemDate: {
    fontSize: 9,
    color: '#888888',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 9,
    color: '#444444',
    lineHeight: 1.4,
  },
  // Skills
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillItem: {
    fontSize: 9,
    color: '#444444',
    marginBottom: 4,
  },
  // Marca d'água
  watermark: {
    position: 'absolute',
    bottom: 40,
    right: 20,
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

const PDFTemplate4 = ({ data }) => {
  if (!data) return null;

  const { personalInfo, experience, education, skills, languages } = data;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Marca d'água */}
        <Text style={styles.watermark}>JOHNTEC.ADS</Text>

        {/* Nome */}
        <Text style={styles.name}>
          {personalInfo?.name || 'Nome não informado'}
        </Text>

        {/* Informações de Contato */}
        <View style={styles.contactSection}>
          {personalInfo?.email && (
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactValue}>{personalInfo.email}</Text>
            </View>
          )}
          {personalInfo?.phone && (
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Telefone:</Text>
              <Text style={styles.contactValue}>{personalInfo.phone}</Text>
            </View>
          )}
          {personalInfo?.address && (
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>Endereço:</Text>
              <Text style={styles.contactValue}>{personalInfo.address}</Text>
            </View>
          )}
          {personalInfo?.linkedin && (
            <View style={styles.contactRow}>
              <Text style={styles.contactLabel}>LinkedIn:</Text>
              <Text style={styles.contactValue}>{personalInfo.linkedin}</Text>
            </View>
          )}
        </View>

        {/* Objetivo */}
        {personalInfo?.objective && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Objetivo</Text>
            <Text style={styles.paragraph}>{personalInfo.objective}</Text>
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
                  <Text style={styles.itemDescription}>{edu.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Experiência */}
        {experience && experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiência Profissional</Text>
            {experience.map((exp, index) => (
              <View key={index} style={styles.itemContainer} wrap={false}>
                <Text style={styles.itemTitle}>{exp.position}</Text>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
                <Text style={styles.itemDate}>
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </Text>
                {exp.description && (
                  <Text style={styles.itemDescription}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}

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
      </Page>
    </Document>
  );
};

export default PDFTemplate4;
