💡 Sobre a API e o Design da ArquiteturaEste projeto representa o serviço de backend para uma plataforma de Saúde Mental e Bem-Estar. Fomos além do CRUD básico, implementando uma arquitetura robusta e focada em segurança, tipagem e manutenção.Nossa arquitetura segue o padrão de Camadas (Controller, Business e Data) e utiliza o TypeScript para garantir a integridade dos dados em todo o fluxo.

🔒 Pontos Chave de Segurança
Autenticação (JWT/Bcrypt): Todas as senhas são armazenadas como hashes irreversíveis, e o acesso às rotas é protegido por Tokens JWT.

Autorização por Role: Implementamos o AuthorizationMiddleware para gerenciar permissões, permitindo que usuários com a role admin ignorem as restrições de posse (authorizeOwner) para fins de manutenção e gestão de dados.

Controle de Dados: As requisições GET são seguras, pois a Camada Data foi configurada para omitir dados sensíveis, como o hash da senha, das respostas públicas.

🔗 Comece a Testar Agora!
Para explorar todos os endpoints, métodos CRUD e o fluxo de autenticação, utilize a documentação interativa completa:

https://cassianosocorro-234846.postman.co/workspace/Cassiano's-Workspace~5b1dec0b-bbcb-43dc-80d6-49bfd79a74d1/collection/50180668-bc62e01e-95d2-47b6-bbe4-e953cbbe4a8f?action=share&creator=50180668
