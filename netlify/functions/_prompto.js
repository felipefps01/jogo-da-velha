// Prompt permanente padrão — somente leitura no servidor.
const EIXOS = {
  b1: `{
  "documento": "ORIENTAÇÕES CURRICULARES BNCC POR BIMESTRE",
  "secretaria": "Prefeitura de Campos - Secretaria Municipal de Educação, Ciência e Tecnologia",
  "etapa": "EDUCAÇÃO INFANTIL",
  "grupo": "GRUPO 3 / G3 - CRIANÇAS BEM PEQUENAS",
  "bimestre": "1º BIMESTRE",
  "campos_de_experiencia": [
    {
      "campo": "ESCUTA, FALA, PENSAMENTO E IMAGINAÇÃO",
      "eixo_tematico": [
        "Expressão oral: sentimentos, escolhas, opiniões",
        "Leitura de Histórias: manuseio, questionamentos, criação, recontagem",
        "Nome",
        "Patrimônio Histórico Cultural de Campos dos Goytacazes (lendas municipais, visitação...)"
      ],
      "codigos_bncc": [
        "EI02EF01",
        "EI02EF03",
        "EI02EF05",
        "EI02EF09"
      ],
      "objetivos_bncc": [
        "(EI02EF01) Dialogar com crianças e adultos, expressando seus desejos, necessidades, sentimentos e opiniões;",
        "(EI02EF03) Demonstrar interesse e atenção ao ouvir a leitura de histórias e outros textos, diferenciando escrita de ilustrações, e acompanhando, com orientação do adulto-leitor, a direção da leitura (de cima para baixo, da esquerda para a direita).",
        "(EI02EF05) Relatar experiências e fatos acontecidos, histórias ouvidas, filmes ou peças teatrais assistidas etc;",
        "(EI02EF09) Manusear diferentes instrumentos e suportes de escrita para desenhar, traçar letras e outros sinais gráficos;"
      ]
    },
    {
      "campo": "CORPO, GESTOS E MOVIMENTOS",
      "eixo_tematico": [
        "Psicomotricidade",
        "A Orientação Espacial e o corpo",
        "Expressão corporal",
        "Equilíbrio",
        "Coordenação motora fina"
      ],
      "codigos_bncc": [
        "EI02CG01",
        "EI02CG02",
        "EI02CG03",
        "EI02CG05"
      ],
      "objetivos_bncc": [
        "(EI02CG01) Apropriar-se de gestos e movimentos de sua cultura no cuidado de si e nos jogos e brincadeiras;",
        "(EI02CG02) Deslocar seu corpo no espaço, orientando-se por noções como em frente, atrás, no alto, embaixo, dentro, fora etc., ao se envolver em brincadeiras e atividades de diferentes naturezas;",
        "(EI02CG03) Explorar formas de deslocamento no espaço (pular, saltar, dançar), combinando movimentos e seguindo orientações.",
        "(EI02CG05) Desenvolver progressivamente as habilidades manuais, adquirindo controle para desenhar, pintar, rasgar, folhear, dentre outros."
      ]
    },
    {
      "campo": "O EU, O OUTRO E O NÓS",
      "eixo_tematico": [
        "Socialização / afetividade",
        "Identidade (EU)",
        "Cooperação / autonomia",
        "Interação social",
        "Expressão corporal e oral",
        "Regras de convívio social / valores",
        "Respeito à diversidade"
      ],
      "codigos_bncc": [
        "EI02EO01",
        "EI02EO02",
        "EI02EO03",
        "EI02EO04",
        "EI02EO05",
        "EI02EO06",
        "EI02EO07"
      ],
      "objetivos_bncc": [
        "(EI02EO01) Demonstrar atitudes de cuidado e solidariedade na interação com crianças e adultos;",
        "(EI02EO02) Demonstrar imagem positiva de si e confiança em sua capacidade para enfrentar dificuldades e desafios;",
        "(EI02EO03) Compartilhar os objetos e os espaços com crianças da mesma faixa etária e adultos;",
        "(EI02EO04) Comunicar-se com os colegas e os adultos, buscando compreendê-los e fazendo-se compreender;",
        "(EI02EO05) Perceber que as pessoas têm características físicas diferentes, respeitando essas diferenças;",
        "(EI02EO06) Respeitar regras básicas de convívio social nas interações e brincadeiras;",
        "(EI02EO07) Resolver conflitos nas interações e brincadeiras, com a orientação de um adulto."
      ]
    },
    {
      "campo": "TRAÇOS, SONS, CORES E FORMAS",
      "eixo_tematico": [
        "Sons: exploração, verbalização e criação"
      ],
      "codigos_bncc": [
        "EI02TS01"
      ],
      "objetivos_bncc": [
        "(EI02TS01) Criar sons com materiais, objetos e instrumentos musicais, para acompanhar diversos ritmos de música."
      ]
    },
    {
      "campo": "ESPAÇOS, TEMPOS, QUANTIDADES, RELAÇÕES E TRANSFORMAÇÕES",
      "eixo_tematico": [
        "Percepção tátil (forma, tamanho, espessura, textura, peso, consistência e temperatura)",
        "Relações espaciais",
        "Percepção visual (forma, cor, tamanho e espessura)"
      ],
      "codigos_bncc": [
        "EI02ET01",
        "EI02ET04",
        "EI02ET05"
      ],
      "objetivos_bncc": [
        "(EI02ET01) Explorar e descrever semelhanças e diferenças entre as características e propriedades dos objetos (textura, massa, tamanho);",
        "(EI02ET04) Identificar relações espaciais (dentro e fora, em cima, embaixo, acima, abaixo, entre e do lado) e temporais (antes, durante e depois);",
        "(EI02ET05) Classificar objetos, considerando determinado atributo (tamanho, peso, cor, forma etc.)."
      ]
    }
  ]
}`,
  b2: `{
  "documento": "ORIENTAÇÕES CURRICULARES BNCC POR BIMESTRE",
  "secretaria": "Prefeitura de Campos - Secretaria Municipal de Educação, Ciência e Tecnologia",
  "etapa": "EDUCAÇÃO INFANTIL",
  "grupo": "GRUPO 3 / G3 - CRIANÇAS BEM PEQUENAS",
  "bimestre": "2º BIMESTRE",
  "campos_de_experiencia": [
    {
      "campo": "ESCUTA, FALA, PENSAMENTO E IMAGINAÇÃO",
      "eixo_tematico": [
        "Expressão oral: sentimentos, escolhas, opiniões",
        "Leitura de Histórias: manuseio, questionamentos, criação, recontagem",
        "Nome",
        "Escrita: desenho do nome e traços das letras do alfabeto"
      ],
      "codigos_bncc": [
        "EI02EF01",
        "EI02EF03",
        "EI02EF04",
        "EI02EF07",
        "EI02EF09"
      ],
      "objetivos_bncc": [
        "(EI02EF01) Dialogar com crianças e adultos, expressando seus desejos, necessidades, sentimentos e opiniões;",
        "(EI02EF03) Demonstrar interesse e atenção ao ouvir a leitura de histórias e outros textos, diferenciando escrita de ilustrações, e acompanhando, com orientação do adulto-leitor, a direção da leitura (de cima para baixo, da esquerda para a direita);",
        "(EI02EF04) Formular e responder perguntas sobre fatos da história narrada, identificando cenários, personagens e principais acontecimentos;",
        "(EI02EF07) Manusear diferentes portadores textuais, demonstrando reconhecer seus usos sociais;",
        "(EI02EF09) Manusear diferentes instrumentos e suportes de escrita para desenhar, traçar letras e outros sinais gráficos."
      ]
    },
    {
      "campo": "CORPO, GESTOS E MOVIMENTOS",
      "eixo_tematico": [
        "Psicomotricidade",
        "A Orientação Espacial e o corpo",
        "Expressão corporal",
        "Equilíbrio",
        "Coordenação motora grossa",
        "Higiene pessoal",
        "Coordenação motora fina"
      ],
      "codigos_bncc": [
        "EI02CG01",
        "EI02CG02",
        "EI02CG03",
        "EI02CG04",
        "EI02CG05"
      ],
      "objetivos_bncc": [
        "(EI02CG01) Apropriar-se de gestos e movimentos de sua cultura no cuidado de si e nos jogos e brincadeiras;",
        "(EI02CG02) Deslocar seu corpo no espaço, orientando-se por noções como em frente, atrás, no alto, embaixo, dentro, fora etc., ao se envolver em brincadeiras e atividades de diferentes naturezas;",
        "(EI02CG03) Explorar formas de deslocamento no espaço (pular, saltar, dançar), combinando movimentos e seguindo orientações;",
        "(EI02CG04) Demonstrar progressiva independência no cuidado do seu corpo.",
        "(EI02CG05) Desenvolver progressivamente as habilidades manuais, adquirindo controle para desenhar, pintar, rasgar, folhear, dentre outros."
      ]
    },
    {
      "campo": "O EU, O OUTRO E O NÓS",
      "eixo_tematico": [
        "Socialização / afetividade",
        "Identidade (EU)",
        "Cooperação / autonomia",
        "Interação social",
        "Expressão corporal e oral",
        "Regras de convívio social / valores",
        "Respeito à diversidade"
      ],
      "codigos_bncc": [
        "EI02EO01",
        "EI02EO02",
        "EI02EO03",
        "EI02EO04",
        "EI02EO05",
        "EI02EO06",
        "EI02EO07"
      ],
      "objetivos_bncc": [
        "(EI02EO01) Demonstrar atitudes de cuidado e solidariedade na interação com crianças e adultos;",
        "(EI02EO02) Demonstrar imagem positiva de si e confiança em sua capacidade para enfrentar dificuldades e desafios;",
        "(EI02EO03) Compartilhar os objetos e os espaços com crianças da mesma faixa etária e adultos;",
        "(EI02EO04) Comunicar-se com os colegas e os adultos, buscando compreendê-los e fazendo-se compreender;",
        "(EI02EO05) Perceber que as pessoas têm características físicas diferentes, respeitando essas diferenças;",
        "(EI02EO06) Respeitar regras básicas de convívio social nas interações e brincadeiras;",
        "(EI02EO07) Resolver conflitos nas interações e brincadeiras, com a orientação de um adulto."
      ]
    },
    {
      "campo": "TRAÇOS, SONS, CORES E FORMAS",
      "eixo_tematico": [
        "Sons: exploração, verbalização e criação",
        "Cores (primárias e secundárias)",
        "Artes: exploração e <MANIP_SUB>"
      ],
      "codigos_bncc": [
        "EI02TS01",
        "EI02TS02",
        "EI02TS03"
      ],
      "objetivos_bncc": [
        "(EI02TS01) Criar sons com materiais, objetos e instrumentos musicais, para acompanhar diversos ritmos de música;",
        "(EI02TS02) Utilizar materiais variados com possibilidades de <MANIP_SUB> (argila, massa de modelar), explorando cores, texturas, superfícies, planos, formas e volumes ao criar objetos tridimensionais;",
        "(EI02TS03) Utilizar diferentes fontes sonoras disponíveis no ambiente em brincadeiras cantadas, canções, músicas e melodias."
      ]
    },
    {
      "campo": "ESPAÇOS, TEMPOS, QUANTIDADES, RELAÇÕES E TRANSFORMAÇÕES",
      "eixo_tematico": [
        "Percepção tátil (forma, tamanho, espessura, textura, peso, consistência e temperatura)",
        "Relações espaciais",
        "Percepção visual (forma, cor, tamanho e espessura)",
        "Relações temporais",
        "Números"
      ],
      "codigos_bncc": [
        "EI02ET01",
        "EI02ET04",
        "EI02ET05",
        "EI02ET06",
        "EI02ET07",
        "EI02ET08"
      ],
      "objetivos_bncc": [
        "(EI02ET01) Explorar e descrever semelhanças e diferenças entre as características e propriedades dos objetos (textura, massa, tamanho);",
        "(EI02ET04) Identificar relações espaciais (dentro e fora, em cima, embaixo, acima, abaixo, entre e do lado) e temporais (antes, durante e depois);",
        "(EI02ET05) Classificar objetos, considerando determinado atributo (tamanho, peso, cor, forma etc.);",
        "(EI02ET06) Utilizar conceitos básicos de tempo (agora, antes, durante, depois, ontem, hoje, amanhã, lento, rápido, depressa, devagar);",
        "(EI02ET07) Contar oralmente, objetos, pessoas, livros, etc, em contextos diversos;",
        "(EI02ET08) Registrar com números a quantidade de crianças (meninas e meninos, presentes e ausentes) e a quantidade de objetos da mesma natureza boneca, bolas, livros, etc."
      ]
    }
  ]
}`,
  b3: `{
  "documento": "ORIENTAÇÕES CURRICULARES BNCC POR BIMESTRE",
  "secretaria": "Prefeitura de Campos - Secretaria Municipal de Educação, Ciência e Tecnologia",
  "etapa": "EDUCAÇÃO INFANTIL",
  "grupo": "GRUPO 3 / G3 - CRIANÇAS BEM PEQUENAS",
  "bimestre": "3º BIMESTRE",
  "campos_de_experiencia": [
    {
      "campo": "ESCUTA, FALA, PENSAMENTO E IMAGINAÇÃO",
      "eixo_tematico": [
        "Expressão oral: sentimentos, escolhas, opiniões",
        "Leitura de Histórias: manuseio, questionamentos, criação, recontagem",
        "Nome",
        "Escrita: desenho do nome e traços das letras do alfabeto",
        "Criação e reprodução oral: rimas e aliterações em músicas",
        "Patrimônio Histórico Cultural de Campos dos Goytacazes (lendas municipais, visitação...)"
      ],
      "codigos_bncc": [
        "EI02EF01",
        "EI02EF02",
        "EI02EF03",
        "EI02EF04",
        "EI02EF05",
        "EI02EF06",
        "EI02EF07",
        "EI02EF08",
        "EI02EF09"
      ],
      "objetivos_bncc": [
        "(EI02EF01) Dialogar com crianças e adultos, expressando seus desejos, necessidades, sentimentos e opiniões;",
        "(EI02EF02) Identificar e criar diferentes sons e reconhecer rimas e aliterações em cantigas de roda e textos poéticos;",
        "(EI02EF03) Demonstrar interesse e atenção ao ouvir a leitura de histórias e outros textos, diferenciando escrita de ilustrações, e acompanhando, com orientação do adulto-leitor, a direção da leitura (de cima para baixo, da esquerda para a direita);",
        "(EI02EF04) Formular e responder perguntas sobre fatos da história narrada, identificando cenários, personagens e principais acontecimentos;",
        "(EI02EF05) Relatar experiências e fatos acontecidos, histórias ouvidas, filmes ou peças teatrais assistidas etc;",
        "(EI02EF06) Criar e contar histórias oralmente, com base em imagens ou temas sugeridos;",
        "(EI02EF07) Manusear diferentes portadores textuais, demonstrando reconhecer seus usos sociais;",
        "(EI02EF08) Trabalhar textos e participar de situações de escuta para ampliar seu contato com diferentes gêneros textuais (parlendas, histórias de aventura, tirinhas, cartazes de sala, cardápios, notícias etc.).",
        "(EI02EF09) Manusear diferentes instrumentos e suportes de escrita para desenhar, traçar letras e outros sinais gráficos;"
      ]
    },
    {
      "campo": "CORPO, GESTOS E MOVIMENTOS",
      "eixo_tematico": [
        "Psicomotricidade",
        "A Orientação Espacial e o corpo",
        "Expressão corporal",
        "Equilíbrio",
        "Coordenação motora grossa",
        "Higiene pessoal",
        "Coordenação motora fina"
      ],
      "codigos_bncc": [
        "EI02CG01",
        "EI02CG02",
        "EI02CG03",
        "EI02CG04",
        "EI02CG05"
      ],
      "objetivos_bncc": [
        "(EI02CG01) Apropriar-se de gestos e movimentos de sua cultura no cuidado de si e nos jogos e brincadeiras;",
        "(EI02CG02) Deslocar seu corpo no espaço, orientando-se por noções como em frente, atrás, no alto, embaixo, dentro, fora etc., ao se envolver em brincadeiras e atividades de diferentes naturezas;",
        "(EI02CG03) Explorar formas de deslocamento no espaço (pular, saltar, dançar), combinando movimentos e seguindo orientações;",
        "(EI02CG04) Demonstrar progressiva independência no cuidado do seu corpo;",
        "(EI02CG05) Desenvolver progressivamente as habilidades manuais, adquirindo controle para desenhar, pintar, rasgar, folhear, dentre outros."
      ]
    },
    {
      "campo": "O EU, O OUTRO E O NÓS",
      "eixo_tematico": [
        "Socialização / afetividade",
        "Identidade (EU)",
        "Cooperação / autonomia",
        "Interação social",
        "Expressão corporal e oral",
        "Regras de convívio social / valores",
        "Respeito à diversidade"
      ],
      "codigos_bncc": [
        "EI02EO01",
        "EI02EO02",
        "EI02EO03",
        "EI02EO04",
        "EI02EO05",
        "EI02EO06",
        "EI02EO07"
      ],
      "objetivos_bncc": [
        "(EI02EO01) Demonstrar atitudes de cuidado e solidariedade na interação com crianças e adultos;",
        "(EI02EO02) Demonstrar imagem positiva de si e confiança em sua capacidade para enfrentar dificuldades e desafios;",
        "(EI02EO03) Compartilhar os objetos e os espaços com crianças da mesma faixa etária e adultos;",
        "(EI02EO04) Comunicar-se com os colegas e os adultos, buscando compreendê-los e fazendo-se compreender;",
        "(EI02EO05) Perceber que as pessoas têm características físicas diferentes, respeitando essas diferenças;",
        "(EI02EO06) Respeitar regras básicas de convívio social nas interações e brincadeiras;",
        "(EI02EO07) Resolver conflitos nas interações e brincadeiras, com a orientação de um adulto."
      ]
    },
    {
      "campo": "TRAÇOS, SONS, CORES E FORMAS",
      "eixo_tematico": [
        "Sons: exploração, verbalização e criação",
        "Cores (primárias e secundárias)",
        "Artes: exploração e transformação"
      ],
      "codigos_bncc": [
        "EI02TS01",
        "EI02TS02",
        "EI02TS03"
      ],
      "objetivos_bncc": [
        "(EI02TS01) Criar sons com materiais, objetos e instrumentos musicais, para acompanhar diversos ritmos de música;",
        "(EI02TS02) Utilizar materiais variados com possibilidades de criação (argila, massa de modelar), explorando cores, texturas, superfícies, planos, formas e volumes ao criar objetos tridimensionais;",
        "(EI02TS03) Utilizar diferentes fontes sonoras disponíveis no ambiente em brincadeiras cantadas, canções, músicas e melodias."
      ]
    },
    {
      "campo": "ESPAÇOS, TEMPOS, QUANTIDADES, RELAÇÕES E TRANSFORMAÇÕES",
      "eixo_tematico": [
        "Percepção tátil (forma, tamanho, espessura, textura, peso, consistência e temperatura)",
        "Relações espaciais",
        "Percepção visual (forma, cor, tamanho e espessura)",
        "Relações temporais",
        "Números",
        "Fenômenos da natureza: sol, vento, chuva",
        "Cuidado: plantas, animais e ambientes"
      ],
      "codigos_bncc": [
        "EI02ET01",
        "EI02ET02",
        "EI02ET03",
        "EI02ET04",
        "EI02ET05"
      ],
      "objetivos_bncc": [
        "(EI02ET01) Explorar e descrever semelhanças e diferenças entre as características e propriedades dos objetos (textura, massa, tamanho);",
        "(EI02ET02) Observar, relatar e descrever incidentes do cotidiano e fenômenos naturais (luz solar, vento, chuva etc.);",
        "(EI02ET03) Compartilhar, com outras crianças, situações de cuidado de plantas e animais nos espaços da instituição e fora dela;",
        "(EI02ET04) Identificar relações espaciais (dentro e fora, em cima, embaixo, acima, abaixo, entre e do lado) e temporais (antes, durante e depois);",
        "(EI02ET05) Classificar objetos, considerando determinado atributo (tamanho, peso, cor, forma etc.)."
      ]
    }
  ]
}`,
  b4: `{
  "documento": "ORIENTAÇÕES CURRICULARES BNCC POR BIMESTRE",
  "secretaria": "Prefeitura de Campos - Secretaria Municipal de Educação, Ciência e Tecnologia",
  "etapa": "EDUCAÇÃO INFANTIL",
  "grupo": "GRUPO 3 / G3 - CRIANÇAS BEM PEQUENAS",
  "bimestre": "4º BIMESTRE",
  "campos_de_experiencia": [
    {
      "campo": "ESCUTA, FALA, PENSAMENTO E IMAGINAÇÃO",
      "eixo_tematico": [
        "Expressão oral: sentimentos, escolhas, opiniões",
        "Leitura de Histórias: manuseio, questionamentos, criação, recontagem",
        "Nome",
        "Escrita: desenho do nome e traços das letras do alfabeto",
        "Criação e reprodução oral: rimas e aliterações em músicas"
      ],
      "codigos_bncc": [
        "EI02EF01",
        "EI02EF02",
        "EI02EF03",
        "EI02EF04",
        "EI02EF05",
        "EI02EF06",
        "EI02EF07",
        "EI02EF08",
        "EI02EF09"
      ],
      "objetivos_bncc": [
        "(EI02EF01) Dialogar com crianças e adultos, expressando seus desejos, necessidades, sentimentos e opiniões;",
        "(EI02EF02) Identificar e criar diferentes sons e reconhecer rimas e aliterações em cantigas de roda e textos poéticos;",
        "(EI02EF03) Demonstrar interesse e atenção ao ouvir a leitura de histórias e outros textos, diferenciando escrita de ilustrações, e acompanhando, com orientação do adulto-leitor, a direção da leitura (de cima para baixo, da esquerda para a direita);",
        "(EI02EF04) Formular e responder perguntas sobre fatos da história narrada, identificando cenários, personagens e principais acontecimentos;",
        "(EI02EF05) Relatar experiências e fatos acontecidos, histórias ouvidas, filmes ou peças teatrais assistidas etc;",
        "(EI02EF06) Criar e contar histórias oralmente, com base em imagens ou temas sugeridos;",
        "(EI02EF07) Manusear diferentes portadores textuais, demonstrando reconhecer seus usos sociais;",
        "(EI02EF08) Trabalhar textos e participar de situações de escuta para ampliar seu contato com diferentes gêneros textuais (parlendas, histórias de aventura, tirinhas, cartazes de sala, cardápios, notícias etc.).",
        "(EI02EF09) Manusear diferentes instrumentos e suportes de escrita para desenhar, traçar letras e outros sinais gráficos;"
      ]
    },
    {
      "campo": "CORPO, GESTOS E MOVIMENTOS",
      "eixo_tematico": [
        "Psicomotricidade;",
        "A Orientação Espacial e o corpo;",
        "Expressão corporal;",
        "Equilíbrio;",
        "Coordenação motora; grossa;",
        "Higiene pessoal;",
        "Coordenação motora fina."
      ],
      "codigos_bncc": [
        "EI02CG01",
        "EI02CG02",
        "EI02CG03",
        "EI02CG04",
        "EI02CG05"
      ],
      "objetivos_bncc": [
        "(EI02CG01) Apropriar-se de gestos e movimentos de sua cultura no cuidado de si e nos jogos e brincadeiras;",
        "(EI02CG02) Deslocar seu corpo no espaço, orientando-se por noções como em frente, atrás, no alto, embaixo, dentro, fora etc., ao se envolver em brincadeiras e atividades de diferentes naturezas;",
        "(EI02CG03) Explorar formas de deslocamento no espaço (pular, saltar, dançar), combinando movimentos e seguindo orientações;",
        "(EI02CG04) Demonstrar progressiva independência no cuidado do seu corpo;",
        "(EI02CG05) Desenvolver progressivamente as habilidades manuais, adquirindo controle para desenhar, pintar, rasgar, folhear, dentre outros."
      ]
    },
    {
      "campo": "O EU, O OUTRO E O NÓS",
      "eixo_tematico": [
        "Socialização / afetividade;",
        "Identidade (EU);",
        "Cooperação / autonomia;",
        "Interação social;",
        "Expressão corporal e oral;",
        "Regras de convívio social / valores;",
        "Respeito à diversidade."
      ],
      "codigos_bncc": [
        "EI02EO01",
        "EI02EO02",
        "EI02EO03",
        "EI02EO04",
        "EI02EO05",
        "EI02EO06",
        "EI02EO07"
      ],
      "objetivos_bncc": [
        "(EI02EO01) Demonstrar atitudes de cuidado e solidariedade na interação com crianças e adultos;",
        "(EI02EO02) Demonstrar imagem positiva de si e confiança em sua capacidade para enfrentar dificuldades e desafios;",
        "(EI02EO03) Compartilhar os objetos e os espaços com crianças da mesma faixa etária e adultos;",
        "(EI02EO04) Comunicar-se com os colegas e os adultos, buscando compreendê-los e fazendo-se compreender;",
        "(EI02EO05) Perceber que as pessoas têm características físicas diferentes, respeitando essas diferenças;",
        "(EI02EO06) Respeitar regras básicas de convívio social nas interações e brincadeiras;",
        "(EI02EO07) Resolver conflitos nas interações e brincadeiras, com a orientação de um adulto."
      ]
    },
    {
      "campo": "TRAÇOS, SONS, CORES E FORMAS",
      "eixo_tematico": [
        "Sons: exploração, verbalização e criação;",
        "Cores (primárias e secundárias);",
        "Artes: exploração e <MANIP_SUB>."
      ],
      "codigos_bncc": [
        "EI02TS01",
        "EI02TS02",
        "EI02TS03"
      ],
      "objetivos_bncc": [
        "(EI02TS01) Criar sons com materiais, objetos e instrumentos musicais, para acompanhar diversos ritmos de música;",
        "(EI02TS02) Utilizar materiais variados com possibilidades de criação (argila, massa de modelar), explorando cores, texturas, superfícies, planos, formas e volumes ao criar objetos tridimensionais;",
        "(EI02TS03) Utilizar diferentes fontes sonoras disponíveis no ambiente em brincadeiras cantadas, canções, músicas e melodias."
      ]
    },
    {
      "campo": "ESPAÇOS, TEMPOS, QUANTIDADES, RELAÇÕES E TRANSFORMAÇÕES",
      "eixo_tematico": [
        "Percepção tátil (forma, tamanho, espessura, textura, peso, consistência e temperatura);",
        "Relações espaciais;",
        "Percepção visual (forma, cor, tamanho e espessura);",
        "Relações temporais;",
        "Números;",
        "Fenômenos da natureza: sol, vento, chuva;",
        "Cuidado: plantas, animais e ambientes."
      ],
      "codigos_bncc": [
        "EI02ET01",
        "EI02ET02",
        "EI02ET03",
        "EI02ET04",
        "EI02ET05",
        "EI02ET06",
        "EI02ET07",
        "EI02ET08"
      ],
      "objetivos_bncc": [
        "(EI02ET01) Explorar e descrever semelhanças e diferenças entre as características e propriedades dos objetos (textura, massa, tamanho);",
        "(EI02ET02) Observar, relatar e descrever incidentes do cotidiano e fenômenos naturais (luz solar, vento, chuva etc.);",
        "(EI02ET03) Compartilhar, com outras crianças, situações de cuidado de plantas e animais nos espaços da instituição e fora dela;",
        "(EI02ET04) Identificar relações espaciais (dentro e fora, em cima, embaixo, acima, abaixo, entre e do lado) e temporais (antes, durante e depois);",
        "(EI02ET05) Classificar objetos, considerando determinado atributo (tamanho, peso, cor, forma etc.);",
        "(EI02ET06) Utilizar conceitos básicos de tempo (agora, antes, durante, depois, ontem, hoje, amanhã, lento, rápido, depressa, devagar);",
        "(EI02ET07) Contar oralmente, objetos, pessoas, livros, etc, em contextos diversos;",
        "(EI02ET08) Registrar com números a quantidade de crianças (meninas e meninos, presentes e ausentes) e a quantidade de objetos da mesma natureza, boneca, bolas, livros, etc;"
      ]
    }
  ]
}`
};

const CABECALHO = `Com base no PLANEJAMENTO MENSAL – EDUCAÇÃO INFANTIL (GRUPO 1 / GRUPO 2 / GRUPO 3), gere um semelhante ao do modelo exemplo fornecida para um novo mês e forneça em bloco de código com formatação markdown.
Somente usar eixo temático que consta na lista do system prompt.

REGRA CRÍTICA DE FORMATO:
Retorne EXCLUSIVAMENTE a tabela Markdown do planejamento. NÃO inclua nenhum tipo de texto de introdução, saudações, observações, notas de rodapé ou parágrafos explicativos fora da tabela. A resposta deve conter APENAS e TÃO SOMENTE a tabela markdown iniciando na primeira linha com '| DATA | EIXO TEMÁTICO | ...'.

Modelo: 
| DATA | EIXO TEMÁTICO | CÓDIGOS | DETALHAMENTO DAS ATIVIDADES DE ACORDO COM OS CÓDIGOS E CAMPOS DE EXPERIÊNCIAS TRABALHADOS |
| :--- | :--- | :--- | :--- |
| **01/06** | *Relações temporais<br>*Números | *EI02ET06<br>*EI02ET07 | *Trabalhar conceitos básicos de tempo (antes, depois, hoje, amanhã) em roda.<br>*Contar oralmente os colegas e objetos cotidianos da sala. |

REGRA:
Obs: para a aba "DATA" varie na utilização dos códigos quantidades por data de 1 a 4 em ordem aleatória com a seguinte proporção 1 (2%), 2 (20%), 3 (78%), 4 (10%).  

#System prompt referentes os bimestres correlacionados os meses:

#Atenção: substitua a palavra "manipular" e suas "variações" por outra que não carregue o sentido negativo da mesma.`;

const DEFAULT_PROMPT =
  CABECALHO +
  '\n\n#1B\nEsses são os eixos temáticos e os códigos a serem utilizados com atividades sendo geradas com base nas referências de objetivos toda vez que um mês referente ao primeiro bimestre for solicitado (você deve identificar o mês e saber a qual bimestre ele corresponde):\n\n' + EIXOS.b1 +
  '\n\n#2B\nEsses são os eixos temáticos e os códigos a serem utilizados com atividades sendo geradas com base nas referências de objetivos toda vez que um mês referente ao segundo bimestre for solicitado (você deve identificar o mês e saber a qual bimestre ele corresponde):\n\n' + EIXOS.b2 +
  '\n\n#3B\nEsses são os eixos temáticos e os códigos a serem utilizados com atividades sendo geradas com base nas referências de objetivos toda vez que um mês referente ao terceiro bimestre for solicitado (você deve identificar o mês e saber a qual bimestre ele corresponde):\n\n' + EIXOS.b3 +
  '\n\n#4B\nEsses são os eixos temáticos e os códigos a serem utilizados com atividades sendo geradas com base nas referências de objetivos toda vez que um mês referente ao quarto bimestre for solicitado (você deve identificar o mês e saber a qual bimestre ele corresponde):\n\n' + EIXOS.b4;

module.exports = { DEFAULT_PROMPT: DEFAULT_PROMPT.split('<MANIP_SUB>').join('modelagem') };
