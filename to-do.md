# Requesitos Funcionais

### Autenticação
- [x] Deve ser possivel fazer o Login com senha
- [] Deve ser possivel fazer o logout 
- [x] Deve ser possivel fazer o Reset da senha
- [x] Deve ser possivel fazer o Recover da senha
- [x] Deve ser ṕossivel registrar um usuario

### User
- [x] Deve ser possivel buscar um usuario pelo id
- [x] Deve ser possivel atualizar um usuario pelo id

### Rolagens de Dados
- [x] Deve ser possivel rolar dados
- [x] Deve ser possivel ver historico de dados
- [] Deve ser possivel fazer paginação durante a busca do historico de dados
- [ ] Deve ser possível filtrar histórico por contexto (advantage, disadvantage, standard)

### Character
- [x] Deve ser possivel criar um personagem
- [x] Deve ser possivel buscar um personagem pelo id
- [x] Deve ser possivel atualizar um personagem
- [] Deve ser possivel buscar uma listar todos os personagens de um usuario
- [] Deve ser possivel fazer paginação durante a busca da listagem de personagens
- [] Deve ser possível filtrar personagens por sistema RPG
- [] Deve ser possível buscar personagem por slug

### Ficha de Ordem Paranormal
- [x] Deve ser possivel criar uma ficha 
- [] Deve ser possivel atualizar a ficha pelo id
- [X] Deve ser possivel buscar uma ficha pel id 
 
### Inventory
- [] Deve ser possivel criar um inventario
- [] deve ser possivel buscar um inventario pelo id
- [] deve ser possivel atualizar um inventario pelo id

###  Character Orderm Paranormal
- [] Deve ser possivel criar um persoangem de ordem paranormal
- [] Deve ser possivel buscar um persoangem de ordem paranormal pelo id
- [] deve ser possivel atualizar todos um personagens de ordem paranormal pelo id
- [] deve ser possivel listar todos os personagens de ordem paranormal pelo id
- [] deve ser possivel criar um personagem de ordem a partir de um personagem da whislist

### Whislist
- [] Deve ser possivel criar um personagem de whislist
- [] Deve ser possivel listar seus personagems da wishlist


# Requesitos Não Funcionais

### Performance
- [] O sistema deve ser capaz de retornar os resultados das rolagens em até 100 ms.

### Cache e Armazenamento
- [] O sistema deve ser capaz de retornar um personagem pelo cache
- [] O sistema deve armazenar o historico de rolagens atravês de cache

### Autorização
- [ ] Deve ser possível validar token JWT (quando implementado)
- [ ] Deve ser possível verificar permissões de acesso por recurso
- [ ] Deve ser possível implementar middleware de autenticação