const url = 'https://projeto-final-ppw.herokuapp.com/api/115580'

listarUsuarios()

function criarFuncionario() {

    alert('Servidor cadastrado')

    let inputName = document.querySelector('#name').value
    let inputIdade = document.querySelector('#idade').value
    let inputImg = document.querySelector('#imagem').value
    let inputCPF = document.querySelector('#CPF').value
    let inputRG = document.querySelector('#RG').value

    let novoNome = {
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
    let dados = fetch(url).then(function (response) {
        return response.json()
    })
    dados.then(function (response) {
        let Funcionario = document.querySelector('#Funcionario');
        Funcionario.textContent = ""
        for (i = 0; i < response.length; i++) {

            let new_div = document.createElement('div')
            new_div.id = 'novas_divs' + i
            document.querySelector("#Funcionario").appendChild(new_div)

            let name = document.createElement('p')
            let idade = document.createElement('p')
            let id = document.createElement('p')
            let admisão = document.createElement('p')
            let image = document.createElement('img')
            let CPF = document.createElement('p')
            let RG = document.createElement('p')

            let div_info = document.createElement('div')
            let div_botoes = document.createElement('div')

            let botao_excluir = document.createElement('button')
            let botao_editar = document.createElement('button')

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
            botao_editar.value = response[i]._id

            id.appendChild(botao_excluir)

            div_info.appendChild(image)
            div_info.appendChild(name)
            div_info.appendChild(idade)
            div_info.appendChild(CPF)
            div_info.appendChild(RG)
            div_info.appendChild(id)
            div_info.appendChild(admisão)
            div_botoes.appendChild(botao_excluir)

            new_div.classList.add("div_principal")
            div_info.classList.add("infromacaos")
            div_botoes.classList.add("opções")
        }
    })
}

function verificador(evento) {

    let id = evento.target.value
    let senha = prompt('informe a senha do administrador para deletar o cadastro do servidor')
    let resultado = parseInt(senha)
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


