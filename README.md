# Trabalho Prático Disciplina Modelagem e Implementação de Software - ClimaBR

##### Guilherme Henrique de Melo
##### Guilherme Barbosa Ochikubo


# Como usar ? 

Clone este repositório.

Entre na pasta do projeto e execute o comando abaixo para instalar as dependências:

npm install

Acesse o site https://openweathermap.org/api, faça seu cadastro e crie uma chave de API.

Crie um arquivo chamado api-config.ts no diretório src/environment do projeto, contendo o conteúdo abaixo (não se esqueça de alterar a propriedade api_key para a sua chave de API):

export const OPEN_WEATHER_CONFIG = {
  api_key: '<your-api-key>',
  api_url: 'https://api.openweathermap.org/data/2.5/onecall',
  api_icon_url: 'http://openweathermap.org/img/wn',
};
  
Para iniciar a aplicação, execute o comando:

npm start
