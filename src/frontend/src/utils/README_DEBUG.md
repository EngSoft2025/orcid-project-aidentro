# Sistema de Debug - ORCID Project

## Visão Geral

O sistema de debug permite ativar/desativar facilmente um modo de desenvolvimento que usa um ORCID ID hardcoded para simular um usuário autenticado. Isso é útil para desenvolvimento, testes e demonstrações.

## Configuração

### 1. Arquivo de Configuração

O sistema de debug é controlado pelo arquivo `src/frontend/src/utils/debugConfig.ts`:

```typescript
// Debug mode flag - set to true to enable debug mode
export const DEBUG_MODE = true;

// Hardcoded ORCID ID for debug mode
export const DEBUG_ORCID_ID = "0000-0003-1574-0784";
```

### 2. Como Ativar/Desativar

**Para ativar o modo debug:**
1. Abra o arquivo `src/frontend/src/utils/debugConfig.ts`
2. Altere `DEBUG_MODE = true`
3. Salve o arquivo
4. Recarregue a aplicação

**Para desativar o modo debug:**
1. Abra o arquivo `src/frontend/src/utils/debugConfig.ts`
2. Altere `DEBUG_MODE = false`
3. Salve o arquivo
4. Recarregue a aplicação

## Funcionalidades

### Quando Ativo (DEBUG_MODE = true):

1. **ORCID ID Hardcoded**: O sistema usa automaticamente o ORCID ID `0000-0003-1574-0784`
2. **Autenticação Simulada**: O usuário é tratado como autenticado
3. **Banner de Debug**: Um banner roxo é exibido no topo da página indicando que o modo debug está ativo
4. **Indicador Visual**: Um badge "🔧 DEBUG MODE" é exibido no perfil do usuário
5. **Dados Reais**: Todas as funcionalidades (citações, publicações, redes sociais) funcionam normalmente usando o ORCID ID hardcoded

### Quando Inativo (DEBUG_MODE = false):

1. **Comportamento Normal**: O sistema volta ao comportamento padrão de autenticação OAuth
2. **Sem Banner**: O banner de debug não é exibido
3. **Autenticação Real**: Requer autenticação real via ORCID OAuth

## Componentes do Sistema

### 1. debugConfig.ts
- Configurações centralizadas do modo debug
- Funções utilitárias para verificar o estado do debug
- Informações do usuário debug

### 2. useDebugMode.ts (Hook)
- Hook personalizado que gerencia o estado de debug
- Fornece informações sobre o usuário atual
- Gerencia a lógica de autenticação

### 3. DebugBanner.tsx (Componente)
- Banner visual que indica quando o modo debug está ativo
- Exibido no topo da página quando DEBUG_MODE = true

## Uso no Dashboard

O Dashboard foi atualizado para usar o sistema de debug:

```typescript
import { useDebugMode } from '@/hooks/useDebugMode';

const Dashboard = () => {
  const {
    isDebugActive,
    debugOrcidId,
    effectiveOrcidId,
    isAuthenticated,
    userIdentity,
    loading,
    error,
    refreshUserIdentity
  } = useDebugMode();

  // ... resto do código
};
```

## Vantagens

1. **Desenvolvimento Rápido**: Não precisa fazer login real para testar funcionalidades
2. **Demonstrações**: Pode demonstrar a aplicação sem depender de autenticação
3. **Testes**: Facilita testes de funcionalidades que requerem usuário autenticado
4. **Debugging**: Ajuda a identificar problemas relacionados à autenticação

## Logs no Console

Quando o modo debug está ativo, você verá logs no console com prefixo "🔧 DEBUG":

```
🔧 DEBUG MODE - Fetching user identity for: 0000-0003-1574-0784
✅ User identity loaded: {orcid_id: "0000-0003-1574-0784", name: "Debug User", ...}
🔄 DEBUG - Fetching citation metrics for: 0000-0003-1574-0784
```

## Segurança

- O modo debug só deve ser usado em ambiente de desenvolvimento
- Nunca deixe DEBUG_MODE = true em produção
- O ORCID ID hardcoded é público e pode ser usado para testes

## Troubleshooting

### Problema: Modo debug não está funcionando
**Solução**: Verifique se o arquivo `debugConfig.ts` foi salvo e a aplicação foi recarregada

### Problema: Banner não aparece
**Solução**: Verifique se DEBUG_MODE = true e se o componente DebugBanner está sendo importado

### Problema: Dados não carregam
**Solução**: Verifique se o ORCID ID hardcoded é válido e se as APIs estão funcionando 