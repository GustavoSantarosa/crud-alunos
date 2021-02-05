  ## Tópicos
1.  [Iniciando](#iniciando)
2.  [Rodar Api](#rodarapi)
3.  [Rodar React](#rodarjs)
4.  [Usuario Padrão](#usuariopadrao)
5.  [Autor](#autor)


<a name="iniciando"/></a>
## Iniciando
  - Clonar o repositório. (git clone https://github.com/alissoonluan/crud-alunos.git)
  - na pasta do backend: rodar composer install
  - Com o postgresql instalado, coloque o username padrão postgres e senha postgres
  - Renomeie o arquivo .env.example para .env e configure as variaveis de ambiente
  - DB_CONNECTION=pgsql
  - DB_DATABASE=postgres
  - DB_USERNAME=postgres
  - DB_PASSWORD=postgres
  
<a name="rodarapi"/></a>
## Rodar API	
   - na pasta do backend: digite php artisan migrate:fresh --seed
   - php artisan key:generate
   - rode o laravel: php artisan serve
<a name="rodarjs"/></a>  
## Rodar ReactJs
  - na pasta do frontend: npm i
  - npm start

<a name="usuariopadrao"/></a> 
## Usuario Padrão para teste
  - master
  - master123
  
     
<a name="autor"/></a>
## Autor
  - [Alisson Luan](https://br.linkedin.com/in/alissoonluan)
