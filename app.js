// Espera o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {
    // Verifica se há tarefas armazenadas no localStorage
    const storedTarefas = JSON.parse(localStorage.getItem('tarefas'))

    // Se houver, carrega essas tarefas e atualiza a lista e status
    if (storedTarefas) {
        storedTarefas.forEach((tarefa) => tarefas.push(tarefa))
        atualiazaLista();
        atualizaStatus();
    }
})

// Array que vai armazenar as tarefas
let tarefas = [];

// Função que salva as tarefas no localStorage
const salvaTarefas = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

// Função para adicionar uma nova tarefa
const addTarefa = () => {
    const tarefaInput = document.getElementById("tarefaInput");
    const texto = tarefaInput.value.trim(); // Remove espaços vazios

    // Se o campo de texto não estiver vazio, adiciona a tarefa
    if (texto) {
        tarefas.push({ text: texto, completed: false });
        tarefaInput.value = ""; // Limpa o campo de entrada
        atualiazaLista();
        atualizaStatus();
        salvaTarefas();
    }
};

// Função para alternar o estado de completado de uma tarefa
const tooggleTastComplete = (index) => {
    tarefas[index].completed = !tarefas[index].completed;
    atualiazaLista();
    atualizaStatus();
    salvaTarefas();
};

// Função para excluir uma tarefa
const excluiTarefa = (index) => {
    tarefas.splice(index, 1); // Remove a tarefa do array
    atualiazaLista();
    atualizaStatus();
    salvaTarefas();
};

// Atualiza o status (barra de progresso e contagem de tarefas)
const atualizaStatus = () => {
    const tarefasComple = tarefas.filter(tarefa => tarefa.completed).length; // Conta as tarefas completadas
    const totalTarefas = tarefas.length; // Conta o total de tarefas
    const progresso = (tarefasComple / totalTarefas) * 100; // Calcula o progresso em porcentagem

    const barraProgresso = document.getElementById('progresso');
    barraProgresso.style.width = `${progresso}%`; // Atualiza o estilo da barra de progresso

    document.getElementById("numeros").innerHTML = `${tarefasComple} / ${totalTarefas}`; // Atualiza o contador de tarefas

    // Se todas as tarefas foram concluídas, dispara o confete
    if (tarefas.length && tarefasComple === totalTarefas) {
        Confetes();
    }
};

// Atualiza a lista de tarefas no DOM
const atualiazaLista = () => {
    const tarefasLis = document.getElementById("liTarefas"); // Seleciona o elemento da lista no DOM
    tarefasLis.innerHTML = ""; // Limpa a lista de tarefas

    // Para cada tarefa, cria um item na lista
    const liTarefas = document.getElementById("liTarefas");
    tarefas.forEach((tarefa, index) => {
        const itemLista = document.createElement("li");

        itemLista.innerHTML = `
    <div class="itemLista">
        <div class="tarefa ${tarefa.completed ? "completed" : ""}">
            <input type="checkbox" name="" id="" class="checkbox" ${tarefa.completed ? "checked" : ""}/>
            <p>${tarefa.text}</p>
        </div>
        <div class="icone">
            <img src="assets/lixeira.png" onClick = "excluiTarefa(${index})"/>
        </div>
    </div>
    `;

        // Adiciona o evento de alternar o estado de completado
        itemLista.addEventListener('change', () => tooggleTastComplete(index));
        liTarefas.append(itemLista); // Adiciona o item à lista no DOM
    });
};

// Adiciona o evento de clique ao botão de adicionar tarefa
document.getElementById('btnAdicionar').addEventListener('click', function (e) {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    addTarefa(); // Adiciona a nova tarefa
});

// Função para lançar confetes quando todas as tarefas forem concluídas
const Confetes = () => {
    const count = 200,
        defaults = {
            origin: { y: 0.7 },
        };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(count * particleRatio),
            })
        );
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fire(0.2, {
        spread: 60,
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}