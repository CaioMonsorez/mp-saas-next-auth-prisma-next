==============================================================================================================================================
---------------------------------- PAGINA DE LOGIN---------------------------------------------------------------------------------
==============================================================================================================================================

Stacks:
Postgres, ORM Prisma, Typescript, Nextjs, React.js Auth.js (beta)


Módulo de Autenticação e Segurança

RF010 - Login e Registro de Usuário

Descrição: O sistema deve permitir o login e registro de usuários com autenticação via Auth.js.
Prioridade: Alta

Critério de Aceitação: 
Após o login, o usuário deve ser redirecionado para o dashboard e ter acesso às funcionalidades de acordo com sua permissão.

Funções Página de Login [registerAction]
Formulario [registerForm]

        [x] Campos para e-mail e senha 
        [ ] Opção de "Esqueci minha senha"
        [x] Botão para entrar
        [x] Verifica se o e-mail já está cadastrado
        [x] Hash da senha bcrypt antes de salvar no banco
        [x] Cadastro apenas se todos os campos forem preenchidos obrigatóramente.
        [x] A senha deve ter pelo menos 12 caracteres.
        [x] O nome deve ter pelo menos 3 caracteres.
        [x] Verifica se o e-mail já está cadastrado
        [x] Cadastra usuário no banco de dados
        [x] Utilizar NextAuth0 para autenticaçao
        [ ] MFA
        [ ] Rate limiting de 5 falhas e bloqueio temporário de conta, 
        [ ] Bloqueio de logins suspeitos 
        [ ] Geolocalização
        [ ] Sessões expiradas 
        [ ] Possibilidade de login com autenticação no Auth0
        [ ] Possibilidade de login com autenticação com google 