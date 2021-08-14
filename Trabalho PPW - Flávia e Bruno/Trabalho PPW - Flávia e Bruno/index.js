const url = 'https://projeto-final-ppw.herokuapp.com/api/115580'

listarUsuarios()

function criarFuncionario() {

    alert('Servidor cadastrado')

    var inputName = document.querySelector('#name').value
    var inputIdade = document.querySelector('#idade').value
    var inputImg = document.querySelector('#imagem').value
    var inputCPF = document.querySelector('#CPF').value
    var inputRG = document.querySelector('#RG').value

    var novoNome = {
        name: inputName,
        idade: inputIdade,
        image: inputImg,
        CPF: inputCPF,
        RG: inputRG
    }

    let info = JSON.stringify(novoNome)

    const opções = {
        method: 'POST',
        body: info,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    fetch(url, opções).then(function (resposta) {
        return resposta.json()
    }).then(function (response) {
        console.log(response.statusText)
        listarUsuarios()
    })
}

function listarUsuarios() {
    var dados = fetch(url).then(function (response) {
        return response.json()
    })
        dados.then(function (response) {
        var Funcionario = document.querySelector('#Funcionario');
        Funcionario.textContent = " "
        for (i = 0; i < response.length; i++) {

            var new_div = document.createElement('div')
            new_div.id = 'novas_divs' + i
            document.querySelector("#Funcionario").appendChild(new_div)

            var name = document.createElement('p')
            var idade = document.createElement('p')
            var id = document.createElement('p')
            var admisão = document.createElement('p')
            var image = document.createElement('img')
            var CPF = document.createElement('p')
            var RG = document.createElement('p')

            var div_info = document.createElement('div')
            var div_botoes = document.createElement('div')

            var botao_excluir = document.createElement('button')

            document.querySelector('#novas_divs' + i).appendChild(div_info)
            document.querySelector('#novas_divs' + i).appendChild(div_botoes)

            name.textContent = "Nome: " + response[i].name
            idade.textContent = "Idade: " + response[i].idade
            id.textContent = "ID: " + response[i]._id
            image.src = response[i].image
            CPF.textContent = "CPF: " + response[i].CPF
            RG.textContent = "RG: " + response[i].RG
            admisão.textContent = "Admisão: " + response[i].createdAt

            botao_excluir.textContent = "Excluir"
            botao_excluir.classList.add("btn")
            botao_excluir.classList.add("btn-danger")
            botao_excluir.classList.add('form-control')

            botao_excluir.onclick = verificador

            botao_excluir.value = response[i]._id

            id.appendChild(botao_excluir)
            div_info.appendChild(image)
            div_info.appendChild(name)
            div_info.appendChild(idade)
            div_info.appendChild(CPF)
            div_info.appendChild(RG)
            div_info.appendChild(admisão)
            div_botoes.appendChild(botao_excluir)

            new_div.classList.add("div_principal")
            div_info.classList.add("informações")
            div_botoes.classList.add("opções")
        }
    })
}

function verificador(evento) {

    let id = evento.target.value
        let senha = prompt('informe a senha do administrador para deletar o cadastro do servidor')
        let resultado = senha
        if (resultado == 1542) {
            console.log(resultado)
            alert('Cadastro do servidor deletado com sucesso')
            excluir(id)
        } else {
            alert("senha incorreta")
        }
}

function excluir(id) {

    fetch(url + "/" + id, {
        method: 'DELETE',
    }).then(function (resposta) {
        return resposta.json()
    }).then(function (response) {
        console.log(response)
        listarUsuarios()
    })
}


