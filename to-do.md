# Requesitos Funcionais

### Autenticação
- [] Deve ser possivel fazer o logout 

### Rolagens de Dados
- [] Deve ser possivel fazer paginação durante a busca do historico de dados
- [] Deve ser possível filtrar histórico por contexto (advantage, disadvantage, standard)

### Inventory
- [] deve ser possivel buscar um inventario pelo id
- [] deve ser possivel adicionar um item ao inventario pelo id

###  Character Orderm Paranormal
- [] Deve ser possivel criar um persoangem de ordem paranormal
- [] Deve ser possivel buscar um persoangem de ordem paranormal pelo id
- [] deve ser possivel atualizar um personagens de ordem paranormal pelo id
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