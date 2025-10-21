# 💎 Quartzo Clima

Um app web leve e intuitivo que mostra o clima atual e a previsão dos próximos 7 dias de qualquer cidade do mundo. Inspirado na identidade visual da Quartzo Sollutions, o projeto prioriza simplicidade, acessibilidade e desempenho — perfeito para um portfólio limpo e funcional.

---

## 🌤️ Funcionalidades

- 🔎 Buscar clima atual de qualquer cidade digitando o nome.  
- 🌡️ Exibir temperatura atual, descrição e um emoji representando a condição climática.  
- 📅 Mostrar previsão dos próximos 7 dias (temperaturas mínimas e máximas).  
- 🖥️ Interface moderna, responsiva e acessível para desktop e dispositivos móveis.  
- ⚠️ Tratamento de erros quando a cidade não é encontrada ou há problemas de conexão.

---

## ⚙️ Tecnologias utilizadas

- HTML5  
- CSS3  
- JavaScript puro (Vanilla JS)  
- API pública: Open-Meteo (Geocoding + Forecast)

---

## 🎨 Paleta de cores

| Cor | Hex | Uso |
|---|---:|---|
| Azul Principal | `#0F2C50` | Cabeçalho e menus |
| Azul Claro | `#A6C4DC` | Fundo de seções |
| Rosa Suave | `#ECA8B0` | Botões e destaques |
| Branco Neve | `#F9F9F9` | Fundo e cartões |
| Cinza Azulado | `#6D8BA0` | Detalhes neutros |

---

## 🧠 Como funciona

1. O usuário digita o nome da cidade no campo de busca.  
2. A aplicação usa a API de Geocoding da Open-Meteo para obter latitude e longitude.  
3. Com as coordenadas, a app consulta a API de Forecast da Open-Meteo.  
4. Os dados retornados são processados e exibidos: clima atual + previsão para 7 dias.  
5. Em caso de erro (cidade não encontrada ou falha na API), o usuário vê uma mensagem clara e sugestiva.

---

## 🚀 Como executar o projeto

1. Clone o repositório:
   ```
   git clone https://github.com/sthefanyom/QuartzoClima.git
   ```
2. Navegue até a pasta do projeto:
   ```
   cd QuartzoClima
   ```
3. Abra o arquivo `index.html` no navegador (não é necessário servidor):
   - Clique duas vezes em `index.html` ou arraste-o para o navegador.

Opcional: usar um servidor local (ex. Python) para testar:
```
python -m http.server 8000
# Em seguida acesse: http://localhost:8000
```

---

## 🧩 Estrutura de pastas

QuartzoClima/  
├── index.html  
├── style.css  
├── script.js  
└── README.md

---

## 💡 Próximos passos

- 🌍 Suporte a múltiplos idiomas.  
- ☁️ Ícones animados para condições climáticas.  
- ⭐ Favoritos e histórico de buscas.  
- 🌙 Modo escuro.  
- 📊 Gráficos interativos de temperatura.

---

## 👩‍💻 Autora

Sthefany Oliveira  
💎 Fundadora da Quartzo Sollutions  
🚀 Apaixonada por tecnologia, aprendizado e segurança da informação.

> 🪶 “Inspirado pela ideia de que o conhecimento é como o clima — muda o tempo todo, mas sempre traz algo novo.”

---

Se este projeto te ajudou ou inspirou, deixe uma estrela no repositório ⭐ — contribuições e sugestões são muito bem-vindas!
