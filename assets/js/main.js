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
        }
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