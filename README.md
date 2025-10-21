# Quartzo Clima

Quartzo Clima é um site simples de previsão do tempo que permite aos usuários buscar informações meteorológicas para qualquer cidade. O projeto utiliza HTML, CSS e JavaScript puro, sem a necessidade de servidores ou frameworks.

## Estrutura do Projeto

O projeto contém os seguintes arquivos:

- **index.html**: A estrutura principal do site, incluindo o menu, campo de entrada para o nome da cidade e botão de busca. Também exibe os dados do clima.
  
- **style.css**: Contém o estilo do site, com cores suaves inspiradas na paleta do Quartzo Solutions, fontes modernas, bordas arredondadas e transições suaves. O design é responsivo, garantindo uma boa experiência em dispositivos móveis e tablets.

- **script.js**: A lógica JavaScript do site, que busca dados da API do OpenWeatherMap usando `fetch`. Manipula a exibição dos dados do clima, como nome da cidade, temperatura atual, descrição do clima e ícone. Inclui tratamento de erros para quando a cidade não é encontrada. Um espaço é reservado para adicionar sua própria chave da API.

## Como Usar

1. **Clone o repositório** ou faça o download dos arquivos.
2. **Abra o arquivo `index.html`** em um navegador da web.
3. **Insira o nome de uma cidade** no campo de entrada.
4. **Clique no botão "Buscar"** para obter as informações meteorológicas.
5. **Adicione sua chave da API** no arquivo `script.js` para que a funcionalidade de busca funcione corretamente.

## Adicionando sua Chave da API

Para que o site funcione corretamente, você precisará de uma chave da API do OpenWeatherMap. Siga os passos abaixo:

1. Acesse [OpenWeatherMap](https://openweathermap.org/) e crie uma conta.
2. Após o registro, obtenha sua chave da API na seção de API.
3. Abra o arquivo `script.js` e localize a linha onde a chave da API deve ser inserida. Substitua o espaço reservado pela sua chave.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para enviar pull requests ou abrir issues para melhorias e correções.

## Licença

Este projeto é de código aberto e pode ser utilizado e modificado livremente.