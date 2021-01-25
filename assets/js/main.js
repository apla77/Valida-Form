class ValidaForm{
    constructor(){
        this.formulario = document.querySelector('.formulario');

        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const camposvalidos = this.validaCampos();
        const senhasValidas = this.validarSenha();

        if(camposvalidos && senhasValidas){
            alert('Formulário enviado.');
            this.formulario.submit();
        }
    }

    validarSenha() {
        let valida = true;

        const senha = this.formulario.querySelector('.senha');
        const confirmarSenha = this.formulario.querySelector('.confirmar-senha');

        if(senha.value !== confirmarSenha.value){
            valida = false;
            this.exibeErro(senha, 'Senhas não são iguais!');
            this.exibeErro(confirmarSenha, 'Senhas não são iguais!');
        }

        if(senha.value.length < 6 || senha.value.length > 20){
            valida = false;
            this.exibeErro(senha, 'Senha precisa estar entre 6 e 20');
        }

        return valida;
    }

    validaCampos(){
        let valida = true;

        for(let erroText of this.formulario.querySelectorAll('.erro-text')){
            erroText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.validar')){
            if(!campo.value){
                const label = campo.previousElementSibling.innerText;
                this.exibeErro(campo, `O campo "${label}" não pode estar em branco!.`);
                valida = false;
            }

            if(campo.classList.contains('cpf')){
                if(!this.validaCpf(campo)) valida = false;
            }

            if(campo.classList.contains('usuario')){
                if(!this.validaUsuario(campo)) valida = false;
            }
        }
        return valida;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valida = true;

        if(usuario.length < 4 || usuario.length > 20){
            this.exibeErro(campo, 'Usuário precisa ter entre 4 e 20 caracteres.');
            valida = false;
        }
        if(!usuario.match(/^[a-zA-Z0-9]+$/g)){
            this.exibeErro(campo, 'O nome do usuário deve conter somente letras e números.');
            valida = false;
        }
        return true;
    }

    validaCpf(campo){
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()){
            this.exibeErro(campo, 'CPF inválido.');
            return false;
        }
        return true;
    }

    exibeErro(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('erro-text');
        campo.insertAdjacentElement('afterend', div);
    }
}

const valida = new ValidaForm();