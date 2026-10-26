const perfis = [
    {
        id: 1,
        nome: "Bruno",
        sobrenome: "Luiz",
        idade: 33,
        profissao: "Engenheiro de sistemas",
        cidade: "Porto Alegre",
        hobby: "Programar",
        comida: "Maçã",
        imagem: "imagenm/o homem com 37 anos.jpg"
    },
    {
        id: 2,
        nome: "João",
        sobrenome: "Luiz",
        idade: 40,
        profissao: "Médico",
        cidade: "Porto Seguro",
        hobby: "Andar de bicicleta",
        comida: "Kiwi",
        imagem: "imagenm/austronauta.jpg"
    },
    {
        id: 3,
        nome: "Maria",
        sobrenome: "Das Dores",
        idade: 37,
        profissao: "Astronauta",
        cidade: "Santos",
        hobby: "Pescar",
        comida: "Banana",
        imagem: "imagenm/a mulher.jpg"
    },
    {
        id: 4,
        nome: "Arthur",
        sobrenome: "Avila",
        idade: 16,
        profissao: "Engenheiro civil",
        cidade: "Cuiabá",
        hobby: "Plantar",
        comida: "Uva",
        imagem: "imagenm/com 16 anos.jpg"
    }
];

function encontrarTodosOsPerfisProximos(respostas) {
    let maiorPontuacao = -1;
    let perfisEmpatados = [];

    for (const perfil of perfis) {
        let pontos = 0;

        if (perfil.cidade === respostas.cidade) pontos++;
        if (perfil.profissao === respostas.profissao) pontos++;
        if (perfil.hobby === respostas.hobby) pontos++;
        if (perfil.comida === respostas.comida) pontos++;

        if (pontos > maiorPontuacao) {
            maiorPontuacao = pontos;
            perfisEmpatados = [perfil]; 
        } else if (pontos === maiorPontuacao) {
            perfisEmpatados.push(perfil); 
        }
    }

    return {
        perfis: perfisEmpatados,
        pontuacao: maiorPontuacao
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const cardResultado = document.getElementById("card_resultado");

    if (!formulario || !cardResultado) return;

    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = formulario.elements["name"].value.trim();
        const sobrenome = formulario.elements["lname"].value.trim();
        const idadeTexto = formulario.elements["idade"].value;
        const idade = Number(idadeTexto);

        if (!nome || !sobrenome || !idadeTexto.trim()) {
            alert("Preencha seu nome, sobrenome e idade.");
            return;
        }

        if (!Number.isInteger(idade) || idade < 5 || idade > 99) {
            alert("Informe uma idade inteira entre 5 e 99 anos.");
            return;
        }

        const respostas = {};

        for (const campo of ["cidade", "profissao", "hobby", "comida"]) {
            const selecionado = formulario.querySelector(
                `input[name="${campo}"]:checked`
            );

            if (!selecionado) {
                alert("Responda a todas as perguntas antes de continuar.");
                return;
            }

            respostas[campo] = selecionado.value;
        }

        // Chama a função correta
        const resultado = encontrarTodosOsPerfisProximos(respostas);

        // Esconde o formulário
        document.getElementById("caixa_perguntas").classList.add("escondido");

        // Limpa o container e monta a estrutura para exibir todos os perfis encontrados
        cardResultado.innerHTML = `<h2>Perfis Encontrados (${resultado.pontuacao}/4 pontos):</h2>`;

        resultado.perfis.forEach((perfil) => {
            const divPerfil = document.createElement("div");
            divPerfil.className = "item_perfil";

            divPerfil.innerHTML = `
                ${perfil.imagem ? `<img src="${perfil.imagem}" id="resultado_imagem" alt="Foto de ${perfil.nome}">` : ''}
                <h3>${perfil.nome} ${perfil.sobrenome}</h3>
                <p><strong>Idade:</strong> ${perfil.idade} anos</p>
                <p><strong>Profissão:</strong> ${perfil.profissao}</p>
                <p><strong>Cidade:</strong> ${perfil.cidade}</p>
                <p><strong>Hobby:</strong> ${perfil.hobby}</p>
                <p><strong>Comida:</strong> ${perfil.comida}</p>
                <hr>
            `;

            cardResultado.appendChild(divPerfil);
        });

        // Adiciona o botão de refazer no final
        const btnRefazer = document.createElement("button");
        btnRefazer.innerText = "Refazer Teste";
        btnRefazer.addEventListener("click", () => window.location.reload());
        cardResultado.appendChild(btnRefazer);

        // Exibe o resultado
        cardResultado.classList.remove("escondido");
    });
});