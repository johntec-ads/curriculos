# Regras de Segurança (exemplo) para Firestore e Storage

Este arquivo traz exemplos de regras que você pode publicar no Console do Firebase para garantir que apenas o dono dos dados acesse seus próprios currículos e arquivos.

## Firestore (exemplo para `users/{uid}/curriculums/{id}`)

Cole e publique em Firestore Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Currículos do usuário dentro de users/{uid}/curriculums/{curriculumId}
    match /users/{userId}/curriculums/{curriculumId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Opcional: coleção pública para compartilhamento via token
    match /publicCurriculums/{token} {
      allow read: if true; // apenas documentos públicos
      allow write: if request.auth != null && request.auth.uid != null; // restringir criação a usuários autenticados
    }
  }
}
```

## Storage (exemplo para uploads em `userUploads/{uid}/...`)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Apenas o dono pode ler/gravar em sua pasta
    match /userUploads/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Notas
- Sempre valide no cliente que o `owner` de um documento seja `request.auth.uid` ao criar em `allow create`.
- Para operações sensíveis (ex.: geração de link público), considere usar Cloud Functions para emitir tokens temporários.
- Teste suas regras com o Rules Simulator antes de publicar.
